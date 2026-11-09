import type { Candidate, Axis, Question } from './types';

const MIN_SCORE = -2;
const MAX_SCORE = 2;

export function scoreCandidates(
  answers: Record<string, number>,
  ranking: string[],
  questions: Question[],
  axes: Axis[],
  candidates: Candidate[],
) {
  const validAxisIds = new Set(axes.map((axis) => axis.id));
  const questionById = new Map(questions.map((question) => [question.id, question]));
  const rankIsValid = ranking.length === axes.length
    && new Set(ranking).size === axes.length
    && ranking.every((axisId) => validAxisIds.has(axisId));
  const safeRanking = rankIsValid ? ranking : axes.map((axis) => axis.id);
  const axisAnswers: Record<string, number[]> = {};

  for (const [questionId, value] of Object.entries(answers)) {
    const question = questionById.get(questionId);
    if (!question || !validAxisIds.has(question.axis) || !Number.isFinite(value) || value < MIN_SCORE || value > MAX_SCORE) continue;
    (axisAnswers[question.axis] ??= []).push(value);
  }

  const user: Record<string, number> = {};
  for (const axis of axes) {
    const values = axisAnswers[axis.id] ?? [];
    user[axis.id] = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }

  const weights: Record<string, number> = {};
  const count = safeRanking.length;
  safeRanking.forEach((axisId, index) => {
    weights[axisId] = (count - index) / ((count * (count + 1)) / 2);
  });

  return candidates.map((candidate) => {
    const complete = axes.every((axis) => {
      const position = candidate.positions[axis.id];
      return !!position
        && position.status === 'verified'
        && typeof position.score === 'number'
        && Number.isFinite(position.score)
        && position.score >= MIN_SCORE
        && position.score <= MAX_SCORE;
    });

    if (!complete) {
      return { candidate, complete: false as const, compatibility: null, breakdown: [] as Array<{ axis: Axis; score: number; user: number; weight: number }> };
    }

    let distance = 0;
    const breakdown = axes.map((axis) => {
      const score = candidate.positions[axis.id]!.score!;
      const weight = weights[axis.id] ?? 0;
      distance += weight * Math.abs(user[axis.id] - score);
      return { axis, score, user: user[axis.id], weight };
    });
    const compatibility = Math.round((1 - distance / (MAX_SCORE - MIN_SCORE)) * 100);
    return { candidate, complete: true as const, compatibility, breakdown };
  }).sort((a, b) => (b.compatibility ?? -1) - (a.compatibility ?? -1));
}
