import React from 'react';
import { soundManager } from '../../engine/audioAmbience';

interface Props {
  hasActiveSession: boolean;
  onNewInvestigation: () => void;
  onContinueInvestigation: () => void;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
}

export const MainScreen: React.FC<Props> = ({
  hasActiveSession,
  onNewInvestigation,
  onContinueInvestigation,
  onOpenArchive,
  onOpenSettings,
}) => {
  const handleButtonClick = (action: () => void) => {
    soundManager.playKeyClick();
    action();
  };

  return (
    <div className="main-screen-container">
      <div className="main-screen-inner">
        <div className="main-system-status">
          <span className="red-indicator" />
          <span>DOSSIER // CLASSIFIED [ICPO-NPA / SECTOR-4]</span>
          <span>::</span>
          <span>TERMINAL LATENCY: 14MS</span>
        </div>

        <div className="main-title-lockup">
          <div className="main-title-subheading">PROJECT // ASYMMETRIC INTELLIGENCE</div>
          <h1 className="main-title">KIRA</h1>
          <div className="main-subtitle">THE PSYCHOLOGICAL WARFARE SIMULATOR</div>
        </div>

        <p className="main-supporting-quote">
          Every action creates information. Every silence leaves a possibility.
        </p>

        <div className="main-menu-actions">
          <button
            className="main-menu-btn primary-btn"
            onClick={() => handleButtonClick(onNewInvestigation)}
          >
            [NEW INVESTIGATION]
          </button>

          <button
            className="main-menu-btn"
            disabled={!hasActiveSession}
            onClick={() => handleButtonClick(onContinueInvestigation)}
          >
            {hasActiveSession ? '[CONTINUE INVESTIGATION]' : '[CONTINUE — NO ACTIVE CASE]'}
          </button>

          <button
            className="main-menu-btn"
            onClick={() => handleButtonClick(onOpenArchive)}
          >
            [CASE ARCHIVE]
          </button>

          <button
            className="main-menu-btn"
            onClick={() => handleButtonClick(onOpenSettings)}
          >
            [SYSTEM CONFIGURATION]
          </button>
        </div>

        <div className="main-screen-footer">
          <span>OPERATIONAL CLEARANCE: LEVEL 5</span>
          <span>•</span>
          <span>SECURE REPOSITORY BUILD 1.0.4</span>
        </div>
      </div>
    </div>
  );
};
