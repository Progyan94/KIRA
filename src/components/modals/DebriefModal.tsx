import React, { useState } from 'react';
import { DebriefData } from '../../types/game';

interface Props {
  debrief: DebriefData;
  onClose: () => void;
  onReturnToMain: () => void;
}

export const DebriefModal: React.FC<Props> = ({ debrief, onClose, onReturnToMain }) => {
  const [activeTab, setActiveTab] = useState<'verdict' | 'timeline' | 'clues' | 'alternatives'>('verdict');

  const getVerdictClass = () => {
    if (debrief.verdict === 'flawless_concealment') return 'flawless';
    if (debrief.verdict === 'critical_exposure' || debrief.verdict === 'decoy_trap_triggered') return 'critical';
    return '';
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-title-lockup">
            <span className="modal-label">POST-INVESTIGATION INTELLIGENCE REPORT</span>
            <h2 className="modal-title">DOSSIER RECONCILIATION & DEBRIEF</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            [ESC / CLOSE]
          </button>
        </div>

        <div className="record-panel-tabs" style={{ background: 'var(--surface-muted)' }}>
          <button
            className={`record-tab-btn ${activeTab === 'verdict' ? 'active' : ''}`}
            onClick={() => setActiveTab('verdict')}
          >
            [01. VERDICT & TRUTH]
          </button>
          <button
            className={`record-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            [02. PARALLEL TIMELINE]
          </button>
          <button
            className={`record-tab-btn ${activeTab === 'clues' ? 'active' : ''}`}
            onClick={() => setActiveTab('clues')}
          >
            [03. DECOY & CLUE AUDIT]
          </button>
          <button
            className={`record-tab-btn ${activeTab === 'alternatives' ? 'active' : ''}`}
            onClick={() => setActiveTab('alternatives')}
          >
            [04. COUNTERFACTUAL PATHS]
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'verdict' && (
            <>
              <div className={`debrief-verdict-banner ${getVerdictClass()}`}>
                <span className="verdict-tag">[FINAL STATUS CLASSIFICATION]</span>
                <div className="verdict-heading">{debrief.verdictTitle}</div>
                <p className="verdict-summary">{debrief.summary}</p>
                <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  FINAL ASSESSED SUSPICION: <span className="text-primary">{debrief.finalSuspicionScore}%</span> // PHASES ELAPSED: <span className="text-primary">{debrief.turnsElapsed}</span>
                </div>
              </div>

              <div className="debrief-card">
                <div className="debrief-card-title">UNDERLYING GROUND TRUTH // UNSEEN REALITY</div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.65' }}>
                  {debrief.groundTruthNarrative}
                </p>
              </div>

              <div className="debrief-columns">
                <div className="debrief-card">
                  <div className="debrief-card-title">WHAT THE OPPONENT CONFIRMED</div>
                  <ul className="debrief-list">
                    {debrief.whatOpponentKnew.map((item, idx) => (
                      <li key={idx} className="debrief-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="debrief-card">
                  <div className="debrief-card-title">WHAT THE OPPONENT MERELY SUSPECTED</div>
                  <ul className="debrief-list">
                    {debrief.whatOpponentSuspected.map((item, idx) => (
                      <li key={idx} className="debrief-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'timeline' && (
            <div>
              <div className="panel-section-title" style={{ marginBottom: '12px' }}>
                <span>STEP-BY-STEP COGNITIVE DUALITY MATRIX</span>
                <span>PLAYER VS INVESTIGATOR</span>
              </div>
              <table className="timeline-reconstruction-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px' }}>TURN</th>
                    <th style={{ width: '30%' }}>YOUR ACTION</th>
                    <th style={{ width: '35%' }}>OPPONENT INTERNAL DEDUCTION</th>
                    <th>GROUND CRITERIA</th>
                    <th style={{ width: '60px' }}>DELTA</th>
                  </tr>
                </thead>
                <tbody>
                  {debrief.stepByStepTimeline.map(step => (
                    <tr key={step.turn}>
                      <td style={{ fontFamily: 'var(--font-technical)', color: 'var(--accent-red)' }}>
                        0{step.turn}
                      </td>
                      <td>{step.playerAction}</td>
                      <td>{step.opponentDeduction}</td>
                      <td style={{ fontStyle: 'italic' }}>{step.underlyingTruth}</td>
                      <td
                        style={{
                          fontFamily: 'var(--font-technical)',
                          color: step.suspicionShift > 0 ? 'var(--accent-red)' : '#70A288',
                        }}
                      >
                        {step.suspicionShift > 0 ? `+${step.suspicionShift}%` : `${step.suspicionShift}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'clues' && (
            <div>
              <div className="panel-section-title" style={{ marginBottom: '12px' }}>
                <span>DECOY, TRAP & COINCIDENCE AUDIT</span>
                <span>DE-CLASSIFIED</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {debrief.clueAudit.map(clue => (
                  <div key={clue.code} className="evidence-card">
                    <div className="evidence-header">
                      <span>{clue.code}: {clue.title}</span>
                      <span className={`clue-badge ${clue.nature}`}>
                        [{clue.nature.replace('_', ' ').toUpperCase()}]
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                      <div>
                        <div className="context-label">PLAYER APPARENT PERCEPTION</div>
                        <div className="evidence-desc">{clue.playerAssumed}</div>
                      </div>
                      <div>
                        <div className="context-label">ACTUAL UNDERLYING REALITY</div>
                        <div className="evidence-desc" style={{ color: 'var(--text-primary)' }}>
                          {clue.actualReality}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alternatives' && (
            <div>
              <div className="panel-section-title" style={{ marginBottom: '12px' }}>
                <span>COUNTERFACTUAL ANALYSIS // DIVERGENT STRATEGIES</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {debrief.alternativePaths.map((alt, idx) => (
                  <div key={idx} className="debrief-card">
                    <div className="debrief-card-title">{alt.title}</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{alt.description}</p>
                    <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-primary)' }}>
                      <span style={{ color: 'var(--accent-red)' }}>CONSEQUENCE: </span>
                      {alt.potentialOutcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onReturnToMain}>
            [RETURN TO MAIN CONSOLE]
          </button>
          <button className="primary-action" onClick={onClose}>
            [CLOSE DOSSIER]
          </button>
        </div>
      </div>
    </div>
  );
};
