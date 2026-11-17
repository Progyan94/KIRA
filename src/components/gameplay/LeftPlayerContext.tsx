import React from 'react';
import { PlayerContext } from '../../types/game';

interface Props {
  context: PlayerContext;
}

export const LeftPlayerContext: React.FC<Props> = ({ context }) => {
  return (
    <aside className="player-context-panel" aria-label="Player Context Panel">
      <div>
        <div className="panel-section-title">
          <span>COORDINATES & CHRONO</span>
          <span>[SEC-1]</span>
        </div>
        <div className="context-card">
          <div className="context-label">TEMPORAL STAMP</div>
          <div className="context-value font-technical">{context.time} // {context.date}</div>
          <div className="context-label" style={{ marginTop: '6px' }}>CURRENT THEATER</div>
          <div className="context-value">{context.location}</div>
          <div className="context-label" style={{ marginTop: '6px' }}>OPERATIONAL IDENTITY</div>
          <div className="context-value" style={{ color: 'var(--accent-red)' }}>{context.role}</div>
        </div>
      </div>

      <div>
        <div className="panel-section-title">
          <span>KNOWN INTELLIGENCE</span>
          <span>({context.knownFacts.length})</span>
        </div>
        <ul className="context-facts-list">
          {context.knownFacts.map((fact, idx) => (
            <li key={idx} className="fact-item">
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="panel-section-title">
          <span>TACTICAL INVENTORY</span>
          <span>({context.resources.length})</span>
        </div>
        <div className="context-resources-list">
          {context.resources.map((item, idx) => (
            <div key={idx} className="resource-pill">
              <span className="resource-code">[0{idx + 1}]</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="panel-section-title">
          <span>CONTACTS & OBSERVERS</span>
          <span>({context.relationships.length})</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {context.relationships.map((rel, idx) => (
            <div key={idx} className="relation-item">
              <div className="relation-name">
                <span>{rel.name}</span>
                <span className="relation-status">[{rel.credibility.toUpperCase()}]</span>
              </div>
              <div className="context-label">{rel.role} // {rel.status}</div>
              <div className="relation-desc">{rel.knownToPlayer}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
