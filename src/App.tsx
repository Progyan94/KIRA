import React, { useState, useEffect, useCallback } from 'react';
import { GameState, SavedInvestigation } from './types/game';
import { ScenarioDefinition } from './types/scenario';
import { GameSettings, DEFAULT_SETTINGS } from './types/settings';
import { SimulationEngine } from './engine/simulationEngine';
import { ALL_SCENARIOS, getScenarioById, getDefaultScenario } from './data/scenarios';
import { SaveManager } from './data/saveManager';
import { soundManager } from './engine/audioAmbience';

import { BackgroundAtmosphere } from './components/layout/BackgroundAtmosphere';
import { Header } from './components/layout/Header';
import { MainScreen } from './components/layout/MainScreen';
import { GameplayScreen } from './components/gameplay/GameplayScreen';
import { DebriefModal } from './components/modals/DebriefModal';
import { ScenarioSelectModal } from './components/modals/ScenarioSelectModal';
import { CaseArchiveModal } from './components/modals/CaseArchiveModal';
import { SettingsModal } from './components/modals/SettingsModal';

import './styles/global.css';
import './styles/components.css';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'main_screen' | 'gameplay'>('main_screen');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentScenario, setCurrentScenario] = useState<ScenarioDefinition | null>(null);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [archive, setArchive] = useState<SavedInvestigation[]>([]);

  // Modals
  const [showScenarioSelect, setShowScenarioSelect] = useState<boolean>(false);
  const [showDebrief, setShowDebrief] = useState<boolean>(false);
  const [showArchive, setShowArchive] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Initialize from storage
  useEffect(() => {
    const loadedSettings = SaveManager.loadSettings();
    setSettings(loadedSettings);
    soundManager.setVolume(loadedSettings.audioMasterVolume);

    const loadedActive = SaveManager.loadActiveState();
    if (loadedActive) {
      setGameState(loadedActive);
      const matchedScenario = getScenarioById(loadedActive.scenarioId) || getDefaultScenario();
      setCurrentScenario(matchedScenario);
    }

    const loadedArchive = SaveManager.loadArchive();
    setArchive(loadedArchive);
  }, []);

  // Update and persist settings
  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    SaveManager.saveSettings(newSettings);
  };

  // Launch a new scenario
  const handleStartScenario = (scenario: ScenarioDefinition) => {
    const freshState = SimulationEngine.initializeScenario(scenario);
    setGameState(freshState);
    setCurrentScenario(scenario);
    SaveManager.saveActiveState(freshState);
    setShowScenarioSelect(false);
    setViewMode('gameplay');
  };

  // Continue existing active investigation
  const handleContinueInvestigation = () => {
    if (gameState && currentScenario) {
      setViewMode('gameplay');
    }
  };

  // Execute turn
  const handleSubmitAction = useCallback(
    (actionText: string) => {
      if (!gameState || !currentScenario || gameState.isCompleted) return;

      const nextState = SimulationEngine.executeTurn(gameState, currentScenario, actionText);
      setGameState(nextState);
      SaveManager.saveActiveState(nextState);

      if (nextState.isCompleted && nextState.debrief) {
        SaveManager.archiveCase(nextState);
        setArchive(SaveManager.loadArchive());
        // Auto open debrief after brief cinematic pause
        setTimeout(() => {
          setShowDebrief(true);
        }, 600);
      }
    },
    [gameState, currentScenario]
  );

  // Update player's scratchpad notes
  const handleUpdateScratchpad = (notes: string) => {
    if (!gameState) return;
    const updated: GameState = {
      ...gameState,
      playerScratchpad: notes,
    };
    setGameState(updated);
    SaveManager.saveActiveState(updated);
  };

  // Load an archived run to inspect
  const handleLoadArchivedRun = (archivedState: GameState) => {
    setGameState(archivedState);
    const matched = getScenarioById(archivedState.scenarioId) || getDefaultScenario();
    setCurrentScenario(matched);
    setShowArchive(false);
    setViewMode('gameplay');
    if (archivedState.debrief) {
      setShowDebrief(true);
    }
  };

  return (
    <>
      <BackgroundAtmosphere settings={settings} />

      <Header
        gameState={viewMode === 'gameplay' ? gameState : null}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenArchive={() => setShowArchive(true)}
        onOpenSettings={() => setShowSettings(true)}
        onReturnToMenu={() => setViewMode('main_screen')}
        onOpenDebrief={() => setShowDebrief(true)}
      />

      {viewMode === 'main_screen' ? (
        <MainScreen
          hasActiveSession={gameState !== null && !gameState.isCompleted}
          onNewInvestigation={() => setShowScenarioSelect(true)}
          onContinueInvestigation={handleContinueInvestigation}
          onOpenArchive={() => setShowArchive(true)}
          onOpenSettings={() => setShowSettings(true)}
        />
      ) : (
        gameState &&
        currentScenario && (
          <GameplayScreen
            gameState={gameState}
            scenario={currentScenario}
            settings={settings}
            onSubmitAction={handleSubmitAction}
            onUpdateScratchpad={handleUpdateScratchpad}
          />
        )
      )}

      {/* Modals */}
      {showScenarioSelect && (
        <ScenarioSelectModal
          onSelectScenario={handleStartScenario}
          onClose={() => setShowScenarioSelect(false)}
        />
      )}

      {showDebrief && gameState?.debrief && (
        <DebriefModal
          debrief={gameState.debrief}
          onClose={() => setShowDebrief(false)}
          onReturnToMain={() => {
            setShowDebrief(false);
            setViewMode('main_screen');
          }}
        />
      )}

      {showArchive && (
        <CaseArchiveModal
          archive={archive}
          onLoadArchivedRun={handleLoadArchivedRun}
          onClose={() => setShowArchive(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

export default App;
