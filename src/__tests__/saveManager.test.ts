import { describe, it, expect, beforeEach } from 'vitest';
import { SaveManager } from '../data/saveManager';
import { SimulationEngine } from '../engine/simulationEngine';
import { case01_shinjukuTail } from '../data/scenarios/case01_shinjukuTail';

// In-memory mock for localStorage in test environment
const mockStorage: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = String(value);
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const key of Object.keys(mockStorage)) {
      delete mockStorage[key];
    }
  },
  key: (index: number) => Object.keys(mockStorage)[index] ?? null,
  length: 0,
};

describe('Save and Archive Manager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and resumes an active investigation session', () => {
    const initialState = SimulationEngine.initializeScenario(case01_shinjukuTail);
    SaveManager.saveActiveState(initialState);

    const loadedState = SaveManager.loadActiveState();
    expect(loadedState).not.toBeNull();
    expect(loadedState?.scenarioId).toBe(initialState.scenarioId);
    expect(loadedState?.turnNumber).toBe(initialState.turnNumber);
  });

  it('archives completed investigations without overwriting previous runs', () => {
    let state = SimulationEngine.initializeScenario(case01_shinjukuTail);
    state.isCompleted = true;
    state.debrief = {
      scenarioId: state.scenarioId,
      verdict: 'flawless_concealment',
      verdictTitle: 'FLAWLESS CONCEALMENT',
      summary: 'Dossier successfully closed without suspicion.',
      turnsElapsed: 5,
      finalSuspicionScore: 18,
      groundTruthNarrative: 'Test narrative',
      whatOpponentKnew: [],
      whatOpponentSuspected: [],
      clueAudit: [],
      stepByStepTimeline: [],
      alternativePaths: [],
    };

    SaveManager.archiveCase(state);
    const archive = SaveManager.loadArchive();

    expect(archive.length).toBe(1);
    expect(archive[0].verdictTitle).toBe('FLAWLESS CONCEALMENT');
    expect(archive[0].scenarioTitle).toBe(state.scenarioTitle);
  });

  it('exports and imports backup JSON correctly', () => {
    const initialState = SimulationEngine.initializeScenario(case01_shinjukuTail);
    SaveManager.saveActiveState(initialState);

    const exportedJson = SaveManager.exportFullData();
    expect(typeof exportedJson).toBe('string');
    expect(exportedJson).toContain('case_01_shinjuku_tail');

    localStorage.clear();
    expect(SaveManager.loadActiveState()).toBeNull();

    const success = SaveManager.importFullData(exportedJson);
    expect(success).toBe(true);

    const restoredState = SaveManager.loadActiveState();
    expect(restoredState?.scenarioId).toBe('case_01_shinjuku_tail');
  });
});
