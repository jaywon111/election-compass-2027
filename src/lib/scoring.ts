import type { Candidate, Axis, Question } from './types';
export function scoreCandidates(answers: Record<string, number>, ranking: string[], questions: Question[], axes: Axis[], candidates: Candidate[]) {
 const answered = new Set(Object.keys(answers));
 const axisAnswer: Record<string, number[]> = {};
 for (const q of questions) if (answered.has(q.id)) (axisAnswer[q.axis] ??= []).push(answers[q.id]);
 const user: Record<string, number> = {};
 for (const axis of axes) { const values = axisAnswer[axis.id] ?? []; user[axis.id] = values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0; }
 const weights: Record<string, number> = {}; const n = Math.max(1, ranking.length); ranking.forEach((axis,i)=>weights[axis] = (n-i)/((n*(n+1))/2));
 return candidates.map(candidate => {
  const complete = axes.every(axis => { const p=candidate.positions[axis.id]; return !!p && p.status !== 'pending' && typeof p.score === 'number'; });
  if (!complete) return { candidate, complete: false as const, compatibility: null, breakdown: [] as Array<{axis:Axis;score:number;user:number;weight:number}> };
  let distance=0; const breakdown=axes.map(axis=>{ const score=candidate.positions[axis.id]!.score!; const weight=weights[axis.id] ?? 0; distance += weight * Math.abs(user[axis.id]-score); return {axis,score,user:user[axis.id],weight}; });
  const compatibility=Math.round((1-distance/4)*100); return {candidate,complete:true as const,compatibility,breakdown};
 }).sort((a,b)=> (b.compatibility ?? -1) - (a.compatibility ?? -1));
}
