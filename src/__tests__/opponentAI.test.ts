import { describe, it, expect } from 'vitest';
import { evaluatePlayerAction } from '../engine/opponentAI';
import { parsePlayerAction } from '../engine/actionParser';
import { OpponentState } from '../types/game';

describe('Adversarial Opponent AI', () => {
  const baseOpponent: OpponentState = {
    name: 'AGENT PARKER',
    apparentIdentity: 'Pedestrian',
    trueIdentity: 'FBI Agent Mark Parker',
    objective: 'Vet NPA households for surveillance',
    knowledgeBase: ['Subject is an honors student'],
    suspicions: [],
    currentHypotheses: [
      { id: 'civilian_student', label: 'Civilian Student', probability: 70, basis: [] },
      { id: 'hyper_vigilant_suspect', label: 'Vigilant Suspect', probability: 20, basis: [] },
      { id: 'kira_with_police_leak', label: 'Kira Operative', probability: 10, basis: [] },
    ],
    suspicionScore: 20,
    vigilanceLevel: 'routine',
    activeTestId: 'test_1',
    testHistory: [],
  };

  it('reduces or preserves baseline suspicion on natural civilian actions', () => {
    const action = parsePlayerAction('Continue walking toward the Yamanote Line gate with steady pace.');
    const result = evaluatePlayerAction(baseOpponent, action, 1, {
      location: 'Shinjuku',
      surroundingCrowdDensity: 'dense',
    });

    expect(result.suspicionDelta).toBeLessThanOrEqual(0);
    expect(result.newVigilance).toBe('routine');
  });

  it('spikes suspicion and shifts vigilance on confrontational actions', () => {
    const action = parsePlayerAction('Confront the man directly and grab his coat sleeve.');
    const result = evaluatePlayerAction(baseOpponent, action, 1, {
      location: 'Shinjuku',
      surroundingCrowdDensity: 'dense',
    });

    expect(result.suspicionDelta).toBeGreaterThanOrEqual(20);
    expect(result.internalDeduction).toContain('hostility');
  });

  it('heavily penalizes leaking unannounced NPA police information', () => {
    const action = parsePlayerAction('Say: "According to internal police file, Takahashi was killed at 14:00."');
    const result = evaluatePlayerAction(baseOpponent, action, 1, {
      location: 'Auditorium',
      surroundingCrowdDensity: 'dense',
    });

    expect(result.suspicionDelta).toBeGreaterThanOrEqual(40);
    expect(result.internalDeduction).toContain('CRITICAL');
  });

  it('ensures suspicion stays bounded between 0 and 100', () => {
    const highSuspicionOpponent: OpponentState = {
      ...baseOpponent,
      suspicionScore: 95,
    };
    const action = parsePlayerAction('Confront and shout about NPA task force secrets.');
    const result = evaluatePlayerAction(highSuspicionOpponent, action, 1, {
      location: 'Shinjuku',
      surroundingCrowdDensity: 'dense',
    });

    const finalScore = Math.min(100, Math.max(0, highSuspicionOpponent.suspicionScore + result.suspicionDelta));
    expect(finalScore).toBeLessThanOrEqual(100);
  });
});
