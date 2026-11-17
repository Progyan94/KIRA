import React, { useState, useRef, useEffect } from 'react';
import { SuggestedAction } from '../../types/scenario';
import { soundManager } from '../../engine/audioAmbience';
import { GameSettings } from '../../types/settings';

interface Props {
  suggestedActions: SuggestedAction[];
  isCompleted: boolean;
  settings: GameSettings;
  onSubmitAction: (text: string) => void;
}

export const BottomActionInput: React.FC<Props> = ({
  suggestedActions,
  isCompleted,
  settings,
  onSubmitAction,
}) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isCompleted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCompleted]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (settings.keyClickSoundEnabled && e.key.length === 1) {
      soundManager.playKeyClick();
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isCompleted) return;

    soundManager.playActionSubmitted();
    onSubmitAction(trimmed);
    setInputText('');
  };

  const handleApplyChip = (actionText: string) => {
    soundManager.playKeyClick();
    setInputText(actionText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="player-action-region">
      {suggestedActions && suggestedActions.length > 0 && !isCompleted && (
        <div className="tactical-chips-bar">
          <span className="tactical-chip-label">TACTICAL VECTORS:</span>
          {suggestedActions.map(sug => (
            <button
              key={sug.id}
              type="button"
              className="tactical-chip"
              onClick={() => handleApplyChip(sug.actionText)}
              title={sug.actionText}
            >
              [{sug.label}]
            </button>
          ))}
        </div>
      )}

      <div className="action-input-row">
        <div className="action-textarea-wrapper">
          <textarea
            ref={textareaRef}
            className="action-textarea"
            placeholder={
              isCompleted
                ? "Investigation concluded. Open debrief via top navigation bar."
                : "Enter your response or describe your next action..."
            }
            value={inputText}
            disabled={isCompleted}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="action-submit-btn"
          disabled={!inputText.trim() || isCompleted}
          onClick={handleSubmit}
        >
          <span>[EXECUTE ACTION]</span>
          <span className="action-submit-subtext">ENTER: EXECUTE // SHIFT+ENTER: NEWLINE</span>
        </button>
      </div>
    </div>
  );
};
