import React from 'react';
import { SavedInvestigation, GameState } from '../../types/game';

interface Props {
  archive: SavedInvestigation[];
  onLoadArchivedRun: (state: GameState) => void;
  onClose: () => void;
}

export const CaseArchiveModal: React.FC<Props> = ({ archive, onLoadArchivedRun, onClose }) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-title-lockup">
            <span className="modal-label">HISTORICAL RECORDS DIVISION</span>
            <h2 className="modal-title">CLASSIFIED CASE ARCHIVE</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            [ESC / CLOSE]
          </button>
        </div>

        <div className="modal-body">
          {archive.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <div className="font-technical" style={{ fontSize: '13px', letterSpacing: '0.15em' }}>
                NO ARCHIVED INVESTIGATIONS ON RECORD
              </div>
              <p style={{ marginTop: '8px', fontSize: '12px' }}>
                Completed operations and finalized debriefs will be permanently cataloged here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="panel-section-title">
                <span>CATALOGED INVESTIGATIONS</span>
                <span>({archive.length} ENTRIES)</span>
              </div>
              {archive.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-muted)',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-technical)', fontSize: '10px', color: 'var(--accent-red)' }}>
                        {entry.scenarioId.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        // {new Date(entry.savedAt).toLocaleDateString()} {new Date(entry.savedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {entry.scenarioTitle}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      OUTCOME: <span style={{ color: 'var(--accent-red)' }}>{entry.verdictTitle || 'RESOLVED'}</span> // PHASES: {entry.turnNumber}
                    </div>
                  </div>

                  <button
                    onClick={() => onLoadArchivedRun(entry.gameState)}
                    style={{ fontSize: '11px' }}
                  >
                    [REVIEW DOSSIER]
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="primary-action" onClick={onClose}>
            [RETURN]
          </button>
        </div>
      </div>
    </div>
  );
};
