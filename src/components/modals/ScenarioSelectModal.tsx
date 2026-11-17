import React, { useState } from 'react';
import { ALL_SCENARIOS } from '../../data/scenarios';
import { ScenarioDefinition } from '../../types/scenario';

interface Props {
  onSelectScenario: (scenario: ScenarioDefinition) => void;
  onClose: () => void;
}

export const ScenarioSelectModal: React.FC<Props> = ({ onSelectScenario, onClose }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(ALL_SCENARIOS[0].id);

  const currentCase = ALL_SCENARIOS.find(s => s.id === selectedCaseId) || ALL_SCENARIOS[0];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog" style={{ maxWidth: '920px' }}>
        <div className="modal-header">
          <div className="modal-title-lockup">
            <span className="modal-label">ACTIVE OPERATIONS THEATER</span>
            <h2 className="modal-title">SELECT INVESTIGATION DOSSIER</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            [ESC / CLOSE]
          </button>
        </div>

        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
          {/* Left: Case List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="panel-section-title">
              <span>AVAILABLE DOSSIERS</span>
              <span>({ALL_SCENARIOS.length})</span>
            </div>
            {ALL_SCENARIOS.map(sc => {
              const isSelected = sc.id === selectedCaseId;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedCaseId(sc.id)}
                  style={{
                    background: isSelected ? 'var(--surface-highlight)' : 'var(--surface-elevated)',
                    border: `1px solid ${isSelected ? 'var(--accent-red)' : 'var(--border-muted)'}`,
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-technical)', fontSize: '10px', color: 'var(--accent-red)' }}>
                      {sc.code}
                    </span>
                    <span style={{ fontFamily: 'var(--font-technical)', fontSize: '9px', color: 'var(--text-muted)' }}>
                      [{sc.difficulty}]
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sc.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {sc.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Briefing & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--surface-elevated)', border: '1px solid var(--border-muted)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <span className="modal-label">{currentCase.code} // DOSSIER BRIEFING</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {currentCase.title}
                </h3>
              </div>
              <span style={{ fontFamily: 'var(--font-technical)', fontSize: '11px', color: 'var(--accent-red)', border: '1px solid var(--accent-red-muted)', padding: '2px 8px' }}>
                SECURITY: {currentCase.difficulty}
              </span>
            </div>

            <div className="debrief-card">
              <div className="debrief-card-title">SITUATIONAL BACKGROUND</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {currentCase.briefing.background}
              </p>
            </div>

            <div className="debrief-card">
              <div className="debrief-card-title">OPERATIONAL OBJECTIVE</div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                {currentCase.briefing.playerObjective}
              </p>
            </div>

            <div className="debrief-card" style={{ borderColor: 'var(--accent-red-muted)' }}>
              <div className="debrief-card-title" style={{ color: 'var(--accent-red)' }}>
                CRITICAL RESTRAINT WARNING
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {currentCase.briefing.criticalWarning}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
              <div>
                <div className="context-label">LOCATION</div>
                <div className="context-value" style={{ fontSize: '12px' }}>{currentCase.initialPlayerContext.location}</div>
              </div>
              <div>
                <div className="context-label">TARGET TIME</div>
                <div className="context-value font-technical" style={{ fontSize: '12px' }}>{currentCase.initialPlayerContext.time}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>
            [CANCEL]
          </button>
          <button
            className="primary-action"
            onClick={() => onSelectScenario(currentCase)}
          >
            [COMMENCE INVESTIGATION // {currentCase.code}]
          </button>
        </div>
      </div>
    </div>
  );
};
