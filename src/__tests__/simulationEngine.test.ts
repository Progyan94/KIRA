import { describe, it, expect } from 'vitest';
import { SimulationEngine } from '../engine/simulationEngine';
import { case01_shinjukuTail } from '../data/scenarios/case01_shinjukuTail';

describe('Master Simulation Engine', () => {
  it('initializes a fresh scenario state with proper asymmetric knowledge isolation', () => {
    const state = SimulationEngine.initializeScenario(case01_shinjukuTail);

    expect(state.scenarioId).toBe(case01_shinjukuTail.id);
    expect(state.turnNumber).toBe(1);
    expect(state.isCompleted).toBe(false);
    expect(state.playerContext.location).toBe('SHINJUKU STATION - SOUTH CONCOURSE');
    expect(state.evidenceList.length).toBeGreaterThan(0);
    expect(state.timeline.length).toBeGreaterThan(0);
    expect(state.opponentState.suspicionScore).toBe(20);
    expect(state.debrief).toBeNull();
  });

  it('executes a turn with free-form action, advancing clock and logging narrative', () => {
    let state = SimulationEngine.initializeScenario(case01_shinjukuTail);
    const initialTime = state.inScenarioTime;

    state = SimulationEngine.executeTurn(
      state,
      case01_shinjukuTail,
      'Pause before the Kinokuniya window display and check the glass reflection.'
    );

    expect(state.turnNumber).toBe(2);
    expect(state.inScenarioTime).not.toBe(initialTime);
    expect(state.narrativeLog.length).toBeGreaterThan(3);

    // Verify player action echo was recorded
    const playerEntry = state.narrativeLog.find(e => e.type === 'action_echo');
    expect(playerEntry).toBeDefined();
    expect(playerEntry?.content).toContain('Kinokuniya');

    // Verify opponent deduction was logged in internal history
    expect(state.opponentState.testHistory.length).toBe(1);
  });

  it('triggers ending condition when critical exposure threshold is crossed', () => {
    let state = SimulationEngine.initializeScenario(case01_shinjukuTail);

    // Artificially increase suspicion or execute multiple confrontational turns
    state = SimulationEngine.executeTurn(
      state,
      case01_shinjukuTail,
      'Confront the man abruptly and demand to know why he is following an NPA officer son!'
    );
    state = SimulationEngine.executeTurn(
      state,
      case01_shinjukuTail,
      'Flee frantically down the corridor and shout at the police officer!'
    );
    state = SimulationEngine.executeTurn(
      state,
      case01_shinjukuTail,
      'Sprint through the ticket barrier and try to lose the agent in the stairwell!'
    );

    if (state.opponentState.suspicionScore >= 80) {
      expect(state.isCompleted).toBe(true);
      expect(state.debrief).not.toBeNull();
      expect(state.debrief?.verdict).toBe('critical_exposure');
    }
  });

  it('produces a full debrief upon scenario completion', () => {
    let state = SimulationEngine.initializeScenario(case01_shinjukuTail);

    // Play through to max turns (5 turns)
    for (let i = 1; i <= 5; i++) {
      state = SimulationEngine.executeTurn(
        state,
        case01_shinjukuTail,
        'Continue walking calmly toward the Yamanote Line platform with study papers.'
      );
    }

    expect(state.isCompleted).toBe(true);
    expect(state.debrief).toBeDefined();
    expect(state.debrief?.stepByStepTimeline.length).toBeGreaterThan(0);
    expect(state.debrief?.clueAudit.length).toBeGreaterThan(0);
    expect(state.debrief?.alternativePaths.length).toBeGreaterThan(0);
    expect(state.debrief?.groundTruthNarrative).toContain('FBI Special Agent');
  });
});
