import { describe, expect, it } from 'vitest';
import { scoreCandidates } from './scoring';
import type { Axis, Candidate, Question } from './types';

const axes: Axis[] = [
  { id: 'economy', label: 'Economy', description: '' },
  { id: 'security', label: 'Security', description: '' },
];
const questions: Question[] = [
  { id: 'q1', axis: 'economy', prompt: '', options: [] },
  { id: 'q2', axis: 'security', prompt: '', options: [] },
];
function candidate(status: string, score = 2): Candidate {
  return {
    id: status, name: status, party: '', partyFull: '', tier: 1, dataCompleteness: '', age: null,
    runningMate: { name: '', age: null }, corePosition: null,
    positions: Object.fromEntries(axes.map((axis) => [axis.id, { status, score, summary: '', sources: [] }])),
  };
}

describe('scoreCandidates', () => {
  it('returns exact match score and normalized ranking weights', () => {
    const result = scoreCandidates({ q1: 2, q2: -2 }, ['economy', 'security'], questions, axes, [candidate('verified')])[0];
    expect(result.complete).toBe(true);
    expect(result.compatibility).toBe(67);
    expect(result.breakdown.map((entry) => entry.weight)).toEqual([2 / 3, 1 / 3]);
  });

  it('does not score curated, pending, or unverified candidate positions', () => {
    for (const status of ['curated', 'pending', 'unverified']) {
      const result = scoreCandidates({}, ['economy', 'security'], questions, axes, [candidate(status)])[0];
      expect(result.complete).toBe(false);
      expect(result.compatibility).toBeNull();
    }
  });

  it('rejects invalid candidate scores', () => {
    expect(scoreCandidates({}, ['economy', 'security'], questions, axes, [candidate('verified', 3)])[0].complete).toBe(false);
  });

  it('ignores malformed answers and falls back to safe ranking', () => {
    const result = scoreCandidates({ q1: 99, missing: 2 }, ['economy', 'economy'], questions, axes, [candidate('verified', 0)])[0];
    expect(result.complete).toBe(true);
    expect(result.compatibility).toBe(100);
    expect(result.breakdown.map((entry) => entry.weight)).toEqual([2 / 3, 1 / 3]);
  });

  it('returns incomplete data without inventing a score', () => {
    const item = candidate('verified');
    delete item.positions.security;
    const result = scoreCandidates({}, ['economy', 'security'], questions, axes, [item])[0];
    expect(result.complete).toBe(false);
    expect(result.compatibility).toBeNull();
  });
});
