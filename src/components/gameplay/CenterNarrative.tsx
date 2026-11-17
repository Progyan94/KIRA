import React, { useEffect, useRef } from 'react';
import { NarrativeEntry } from '../../types/game';

interface Props {
  entries: NarrativeEntry[];
}

export const CenterNarrative: React.FC<Props> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <main className="live-narrative-panel" ref={scrollRef} aria-label="Live Narrative Log">
      <div className="narrative-stream">
        {entries.map(entry => {
          const isPlayerAction = entry.type === 'action_echo';

          return (
            <article
              key={entry.id}
              className={`narrative-entry entry-${entry.type}`}
            >
              <div
                className={`entry-header ${
                  entry.speaker ? (isPlayerAction ? 'speaker-you' : 'speaker-header') : ''
                }`}
              >
                <span>{entry.timestamp}</span>
                <span>//</span>
                <span>
                  {entry.speaker
                    ? `${entry.speaker.toUpperCase()} ${entry.speakerRole ? `[${entry.speakerRole.toUpperCase()}]` : ''}`
                    : entry.type.toUpperCase()}
                </span>
              </div>

              <div className="entry-body">
                {entry.content}
              </div>

              {entry.contextNote && (
                <div className="entry-header" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>NOTE:</span>
                  <span>{entry.contextNote}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
};
