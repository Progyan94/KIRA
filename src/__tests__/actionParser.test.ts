import { describe, it, expect } from 'vitest';
import { parsePlayerAction } from '../engine/actionParser';

describe('ActionParser Engine', () => {
  it('correctly categorizes silence / calculated restraint', () => {
    const action1 = parsePlayerAction('Maintain silence and say nothing.');
    expect(action1.category).toBe('silence');
    expect(action1.subIntent).toBe('calculated_restraint');

    const action2 = parsePlayerAction('...');
    expect(action2.category).toBe('silence');
  });

  it('extracts spoken words and dialogue intents', () => {
    const action = parsePlayerAction('Say to Ryuga: "I intend to uphold the law, just as my father does."');
    expect(action.category).toBe('dialogue');
    expect(action.spokenWords).toContain('I intend to uphold the law');
  });

  it('detects indirect surveillance via reflection', () => {
    const action = parsePlayerAction('Pause before the bookstore window and check the reflection in the glass.');
    expect(action.category).toBe('observation');
    expect(action.subIntent).toBe('indirect_surveillance');
    expect(action.detectedEntities).toContain('reflection');
  });

  it('detects high-risk confrontation and increases vigilance', () => {
    const action = parsePlayerAction('Turn around abruptly and demand: "Why are you following me?"');
    expect(action.isConfrontational).toBe(true);
    expect(action.vigilanceIndex).toBeGreaterThanOrEqual(75);
  });

  it('flags confidential NPA police intelligence leaks', () => {
    const slipAction = parsePlayerAction('Mention that Takahashi died of a heart attack at 14:00 according to NPA server logs.');
    expect(slipAction.hasNpaSlip).toBe(true);

    const normalAction = parsePlayerAction('Mention that the newspapers reported the death on yesterday evening news.');
    expect(normalAction.hasNpaSlip).toBe(false);
  });
});
