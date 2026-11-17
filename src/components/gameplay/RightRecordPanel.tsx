import React, { useState } from 'react';
import { EvidenceItem, TimelineEntry } from '../../types/game';

interface Props {
  evidenceList: EvidenceItem[];
  timeline: TimelineEntry[];
  playerScratchpad: string;
  onUpdateScratchpad: (notes: string) => void;
}

export const RightRecordPanel: React.FC<Props> = ({
  evidenceList,
  timeline,
  playerScratchpad,
  onUpdateScratchpad,
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'timeline' | 'notes'>('evidence');

  return (
    <aside className="investigation-record-panel" aria-label="Investigation Record Panel">
      <div className="record-panel-tabs">
        <button
          className={`record-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('evidence')}
        >
          [EVIDENCE ({evidenceList.length})]
        </button>
        <button
          className={`record-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          [CHRONO ({timeline.length})]
        </button>
        <button
          className={`record-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          [SCRATCHPAD]
        </button>
      </div>

      <div className="record-tab-content">
        {activeTab === 'evidence' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="panel-section-title">
              <span>CATALOGED EXHIBITS</span>
              <span>VERIFIED / UNVERIFIED</span>
            </div>
            {evidenceList.map(item => (
              <div key={item.id} className="evidence-card">
                <div className="evidence-header">
                  <span>{item.code}</span>
                  <span>[{item.isConfirmed ? 'CONFIRMED' : 'HYPOTHESIS'}]</span>
                </div>
                <div className="evidence-title">{item.title}</div>
                <div className="evidence-desc">{item.description}</div>
                <div className="evidence-meta">
                  <span>SRC: {item.source}</span>
                  <span>PHASE: 0{item.discoveredTurn}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="panel-section-title">
              <span>TEMPORAL TRAJECTORY</span>
              <span>CHRONOLOGICAL</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {timeline.map(t => (
                <div
                  key={t.id}
                  className={`timeline-card ${t.significance === 'critical' ? 'critical' : ''}`}
                >
                  <span className="timeline-time">{t.timestamp}</span>
                  <span className="timeline-label">{t.label}</span>
                  <span className="timeline-summary">{t.summary}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="scratchpad-container">
            <div className="panel-section-title">
              <span>KIRA CIPHER JOURNAL</span>
              <span>ENCRYPTED LOCAL</span>
            </div>
            <p className="scratchpad-intro">
              Personal deduction scratchpad. Record private observations, suspect aliases, behavioral tells, and counter-strategies. The opponent cannot access this data.
            </p>
            <textarea
              className="scratchpad-textarea"
              placeholder="Record observations, timing discrepancies, and hypotheses..."
              value={playerScratchpad}
              onChange={e => onUpdateScratchpad(e.target.value)}
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
