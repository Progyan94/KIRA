export interface GameSettings {
  audioAmbienceEnabled: boolean;
  audioMasterVolume: number; // 0.0 to 1.0
  keyClickSoundEnabled: boolean;
  textSpeed: 'instant' | 'fast' | 'normal';
  fontScale: 'compact' | 'normal' | 'large';
  scanlinesEnabled: boolean;
  filmGrainEnabled: boolean;
  vignetteIntensity: 'subtle' | 'standard' | 'off';
  autoSaveIntervalTurns: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  audioAmbienceEnabled: false,
  audioMasterVolume: 0.35,
  keyClickSoundEnabled: true,
  textSpeed: 'normal',
  fontScale: 'normal',
  scanlinesEnabled: true,
  filmGrainEnabled: true,
  vignetteIntensity: 'standard',
  autoSaveIntervalTurns: 1,
};
