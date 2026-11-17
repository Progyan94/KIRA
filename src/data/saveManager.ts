// Save and Archive System
// Manages local persistence for active sessions, case archives, decision logs, and export/import functionality.

import { GameState, SavedInvestigation } from '../types/game';
import { GameSettings, DEFAULT_SETTINGS } from '../types/settings';

const ACTIVE_SAVE_KEY = 'kira_active_investigation_v1';
const ARCHIVE_KEY = 'kira_case_archive_v1';
const SETTINGS_KEY = 'kira_user_settings_v1';

export class SaveManager {
  /**
   * Saves the current active game state.
   */
  public static saveActiveState(state: GameState): void {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(ACTIVE_SAVE_KEY, serialized);
    } catch {
      // Storage quota or privacy restriction
    }
  }

  /**
   * Retrieves the saved active game state if one exists.
   */
  public static loadActiveState(): GameState | null {
    try {
      const raw = localStorage.getItem(ACTIVE_SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Clears active investigation session.
   */
  public static clearActiveState(): void {
    try {
      localStorage.removeItem(ACTIVE_SAVE_KEY);
    } catch {
      // Ignored
    }
  }

  /**
   * Stores a completed case into the Case Archive.
   */
  public static archiveCase(state: GameState): void {
    try {
      const archive = this.loadArchive();
      const newEntry: SavedInvestigation = {
        id: `archive_${Date.now()}_${state.scenarioId}`,
        savedAt: new Date().toISOString(),
        scenarioId: state.scenarioId,
        scenarioTitle: state.scenarioTitle,
        turnNumber: state.turnNumber,
        isCompleted: state.isCompleted,
        verdict: state.debrief?.verdict,
        verdictTitle: state.debrief?.verdictTitle,
        gameState: state,
      };

      archive.unshift(newEntry);
      // Keep up to 50 historical investigations
      const trimmed = archive.slice(0, 50);
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(trimmed));
    } catch {
      // Ignored
    }
  }

  /**
   * Loads all archived investigations.
   */
  public static loadArchive(): SavedInvestigation[] {
    try {
      const raw = localStorage.getItem(ARCHIVE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  /**
   * Saves user settings.
   */
  public static saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignored
    }
  }

  /**
   * Loads user settings.
   */
  public static loadSettings(): GameSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Exports full save file as a JSON data string.
   */
  public static exportFullData(): string {
    const active = this.loadActiveState();
    const archive = this.loadArchive();
    const settings = this.loadSettings();

    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      active,
      archive,
      settings,
    };

    return JSON.stringify(backup, null, 2);
  }

  /**
   * Imports save file from JSON string.
   */
  public static importFullData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.active) {
        localStorage.setItem(ACTIVE_SAVE_KEY, JSON.stringify(data.active));
      }
      if (data.archive && Array.isArray(data.archive)) {
        localStorage.setItem(ARCHIVE_KEY, JSON.stringify(data.archive));
      }
      if (data.settings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clears all stored data (factory reset).
   */
  public static wipeAllData(): void {
    try {
      localStorage.removeItem(ACTIVE_SAVE_KEY);
      localStorage.removeItem(ARCHIVE_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch {
      // Ignored
    }
  }
}
