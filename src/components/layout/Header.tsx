import React from 'react';
import { GameState } from '../../types/game';
import { GameSettings } from '../../types/settings';
import { soundManager } from '../../engine/audioAmbience';

interface Props {
  gameState: GameState | null;
  settings: GameSettings;
  onUpdateSettings: (s: GameSettings) => void;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
  onReturnToMenu: () => void;
  onOpenDebrief?: () => void;
}

export const Header: React.FC<Props> = ({
  gameState,
  settings,
  onUpdateSettings,
  onOpenArchive,
  onOpenSettings,
  onReturnToMenu,
  onOpenDebrief,
}) => {
  const toggleAudio = () => {
    const nextState = !settings.audioAmbienceEnabled;
    onUpdateSettings({ ...settings, audioAmbienceEnabled: nextState });
    if (nextState) {
      soundManager.startAmbience();
    } else {
      soundManager.stopAmbience();
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="header-btn"
          onClick={onReturnToMenu}
          title="Return to Main Console"
        >
          [TERMINAL]
        </button>
        <div className="header-case-seal">
          <span className="red-indicator" />
          <span>KIRA // CLASSIFIED</span>
        </div>
        {gameState && (
          <span className="header-case-title">
            — {gameState.scenarioTitle}
          </span>
        )}
      </div>

      <div className="header-center">
        {gameState ? (
          <>
            <div className="header-metric-pill">
              <span className="text-muted">TIME:</span>
              <span className="text-primary">{gameState.inScenarioTime}</span>
            </div>
            <div className="header-metric-pill">
              <span className="text-muted">PHASE:</span>
              <span className="text-primary">
                {gameState.turnNumber} / {gameState.maxTurns}
              </span>
            </div>
            <div className="header-metric-pill">
              <span className="text-muted">STATUS:</span>
              <span className={gameState.isCompleted ? 'text-accent-red' : 'text-primary'}>
                {gameState.isCompleted ? 'CONCLUDED' : 'SURVEILLANCE ACTIVE'}
              </span>
            </div>
          </>
        ) : (
          <div className="header-metric-pill">
            <span className="text-muted">SYSTEM:</span>
            <span className="text-primary">STANDBY // READY</span>
          </div>
        )}
      </div>

      <div className="header-right">
        {gameState && gameState.isCompleted && gameState.debrief && (
          <button
            className="header-btn primary-action"
            onClick={onOpenDebrief}
          >
            [VIEW DEBRIEF]
          </button>
        )}
        <button
          className="header-btn"
          onClick={toggleAudio}
          title="Toggle Subterranean Ambience"
        >
          {settings.audioAmbienceEnabled ? '[AUDIO: ON]' : '[AUDIO: OFF]'}
        </button>
        <button className="header-btn" onClick={onOpenArchive} title="Case Archive">
          [ARCHIVE]
        </button>
        <button className="header-btn" onClick={onOpenSettings} title="Settings">
          [CONFIG]
        </button>
      </div>
    </header>
  );
};
