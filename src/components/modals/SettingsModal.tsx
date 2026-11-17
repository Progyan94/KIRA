import React, { useState } from 'react';
import { GameSettings } from '../../types/settings';
import { SaveManager } from '../../data/saveManager';
import { soundManager } from '../../engine/audioAmbience';

interface Props {
  settings: GameSettings;
  onUpdateSettings: (s: GameSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ settings, onUpdateSettings, onClose }) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleToggleAudio = () => {
    const nextVal = !settings.audioAmbienceEnabled;
    onUpdateSettings({ ...settings, audioAmbienceEnabled: nextVal });
    if (nextVal) {
      soundManager.startAmbience();
    } else {
      soundManager.stopAmbience();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    onUpdateSettings({ ...settings, audioMasterVolume: vol });
    soundManager.setVolume(vol);
  };

  const handleExport = () => {
    const jsonStr = SaveManager.exportFullData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kira_investigation_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const success = SaveManager.importFullData(content);
      if (success) {
        setImportStatus('BACKUP RESTORED SUCCESSFULLY. REFRESHING...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus('ERROR: INVALID FILE FORMAT');
      }
    };
    reader.readAsText(file);
  };

  const handleWipeData = () => {
    if (window.confirm('CONFIRM FACTORY RESET: All active investigations, archive records, and local journals will be erased permanently.')) {
      SaveManager.wipeAllData();
      window.location.reload();
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div className="modal-title-lockup">
            <span className="modal-label">SYSTEM CONFIGURATION</span>
            <h2 className="modal-title">TERMINAL PREFERENCES</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            [ESC / CLOSE]
          </button>
        </div>

        <div className="modal-body">
          {/* Audio Section */}
          <div className="debrief-card">
            <div className="debrief-card-title">ATMOSPHERIC SOUNDSCAPE // WEB AUDIO API</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>SUBTERRANEAN DRONE & TAPE HISS</span>
                <button onClick={handleToggleAudio} style={{ fontSize: '11px' }}>
                  {settings.audioAmbienceEnabled ? '[ACTIVE / ON]' : '[MUTED / OFF]'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>MASTER AUDIO GAIN</span>
                  <span>{Math.round(settings.audioMasterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.audioMasterVolume}
                  onChange={handleVolumeChange}
                  style={{ width: '100%', accentColor: 'var(--accent-red)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>MECHANICAL KEYSTROKE ACOUSTICS</span>
                <button
                  onClick={() => onUpdateSettings({ ...settings, keyClickSoundEnabled: !settings.keyClickSoundEnabled })}
                  style={{ fontSize: '11px' }}
                >
                  {settings.keyClickSoundEnabled ? '[ENABLED]' : '[DISABLED]'}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Atmosphere Section */}
          <div className="debrief-card">
            <div className="debrief-card-title">VISUAL ENVIRONMENT & CRT SHADERS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>TERMINAL SCANLINES OVERLAY</span>
                <button
                  onClick={() => onUpdateSettings({ ...settings, scanlinesEnabled: !settings.scanlinesEnabled })}
                  style={{ fontSize: '11px' }}
                >
                  {settings.scanlinesEnabled ? '[ACTIVE]' : '[DISABLED]'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>35MM FILM GRAIN EMULATION</span>
                <button
                  onClick={() => onUpdateSettings({ ...settings, filmGrainEnabled: !settings.filmGrainEnabled })}
                  style={{ fontSize: '11px' }}
                >
                  {settings.filmGrainEnabled ? '[ACTIVE]' : '[DISABLED]'}
                </button>
              </div>
            </div>
          </div>

          {/* Data Backup Section */}
          <div className="debrief-card">
            <div className="debrief-card-title">CRYPTOGRAPHIC DATA ARCHIVE // LOCALSTORAGE</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              All progress, decisions, case files, and scratchpad notes are retained locally on your browser.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button onClick={handleExport} style={{ flex: 1, fontSize: '11px' }}>
                [EXPORT BACKUP JSON]
              </button>
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  fontFamily: 'var(--font-technical)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '8px',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.12em',
                }}
              >
                <span>[IMPORT BACKUP JSON]</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            {importStatus && (
              <div style={{ marginTop: '6px', fontFamily: 'var(--font-technical)', fontSize: '10px', color: 'var(--accent-red)' }}>
                {importStatus}
              </div>
            )}
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-muted)', paddingTop: '10px' }}>
              <button
                onClick={handleWipeData}
                style={{ width: '100%', borderColor: 'var(--accent-red-muted)', color: 'var(--accent-red)', fontSize: '11px' }}
              >
                [WIPE ALL LOCAL DATA & RESET TERMINAL]
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="primary-action" onClick={onClose}>
            [SAVE & CLOSE]
          </button>
        </div>
      </div>
    </div>
  );
};
