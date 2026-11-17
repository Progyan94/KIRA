import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { ScenarioDefinition } from '../../types/scenario';
import { GameSettings } from '../../types/settings';
import { LeftPlayerContext } from './LeftPlayerContext';
import { CenterNarrative } from './CenterNarrative';
import { RightRecordPanel } from './RightRecordPanel';
import { BottomActionInput } from './BottomActionInput';

interface Props {
  gameState: GameState;
  scenario: ScenarioDefinition;
  settings: GameSettings;
  onSubmitAction: (actionText: string) => void;
  onUpdateScratchpad: (notes: string) => void;
}

export const GameplayScreen: React.FC<Props> = ({
  gameState,
  scenario,
  settings,
  onSubmitAction,
  onUpdateScratchpad,
}) => {
  const [mobileTab, setMobileTab] = useState<'narrative' | 'context' | 'record'>('narrative');

  return (
    <div className="gameplay-layout">
      {/* Mobile switcher tab if screen is narrow */}
      <div className="gameplay-mobile-nav" style={{ display: 'none' }}>
        <button onClick={() => setMobileTab('context')}>[CONTEXT]</button>
        <button onClick={() => setMobileTab('narrative')}>[NARRATIVE]</button>
        <button onClick={() => setMobileTab('record')}>[DOSSIER]</button>
      </div>

      <LeftPlayerContext context={gameState.playerContext} />

      <CenterNarrative entries={gameState.narrativeLog} />

      <RightRecordPanel
        evidenceList={gameState.evidenceList}
        timeline={gameState.timeline}
        playerScratchpad={gameState.playerScratchpad}
        onUpdateScratchpad={onUpdateScratchpad}
      />

      <BottomActionInput
        suggestedActions={scenario.suggestedActions}
        isCompleted={gameState.isCompleted}
        settings={settings}
        onSubmitAction={onSubmitAction}
      />
    </div>
  );
};
