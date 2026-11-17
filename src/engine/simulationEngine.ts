// Master Simulation Engine
// Coordinates turn execution, state transitions, narrative dispatch, and information boundary enforcement.

import { GameState, NarrativeEntry, TimelineEntry } from '../types/game';
import { ScenarioDefinition } from '../types/scenario';
import { parsePlayerAction } from './actionParser';
import { evaluatePlayerAction } from './opponentAI';
import { generateDebrief } from './debriefGenerator';

export class SimulationEngine {
  /**
   * Initializes a fresh game state for a selected scenario.
   */
  public static initializeScenario(scenario: ScenarioDefinition): GameState {
    return {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      turnNumber: 1,
      maxTurns: scenario.maxTurns,
      inScenarioTime: scenario.initialPlayerContext.time,
      isCompleted: false,
      playerContext: JSON.parse(JSON.stringify(scenario.initialPlayerContext)),
      narrativeLog: JSON.parse(JSON.stringify(scenario.initialNarrative)),
      evidenceList: JSON.parse(JSON.stringify(scenario.initialEvidence)),
      timeline: JSON.parse(JSON.stringify(scenario.initialTimeline)),
      playerScratchpad: '',
      opponentState: {
        name: scenario.opponentConfig.name,
        apparentIdentity: scenario.opponentConfig.apparentRole,
        trueIdentity: scenario.opponentConfig.trueRole,
        objective: scenario.opponentConfig.initialObjective,
        knowledgeBase: [...scenario.opponentConfig.initialKnowledge],
        suspicions: ['Target displays above-average situational awareness.'],
        currentHypotheses: JSON.parse(JSON.stringify(scenario.opponentConfig.initialHypotheses)),
        suspicionScore: scenario.opponentConfig.initialSuspicionScore,
        vigilanceLevel: 'routine',
        activeTestId: scenario.tests[0]?.id || null,
        testHistory: [],
      },
      groundTruthNotes: [scenario.groundTruthData.fullStory],
      debrief: null,
    };
  }

  /**
   * Executes a player turn with free-form text input.
   */
  public static executeTurn(
    currentState: GameState,
    scenario: ScenarioDefinition,
    actionText: string
  ): GameState {
    if (currentState.isCompleted) return currentState;

    const turn = currentState.turnNumber;
    const parsed = parsePlayerAction(actionText);

    // 1. Advance fictional clock by 2-5 minutes
    const nextTime = this.advanceScenarioTime(currentState.inScenarioTime, 3);

    // 2. Identify active test if any
    const activeTest = scenario.tests.find(
      t => t.id === currentState.opponentState.activeTestId || t.triggerTurn === turn
    );

    // 3. Opponent AI evaluation
    const opponentEval = evaluatePlayerAction(
      currentState.opponentState,
      parsed,
      turn,
      {
        activeTest: activeTest
          ? { id: activeTest.id, goal: activeTest.opponentGoal, criteria: activeTest.evaluatedCriteria }
          : undefined,
        location: currentState.playerContext.location,
        surroundingCrowdDensity: 'dense',
      }
    );

    // 4. Determine narrative consequence from scenario test or default fallback
    let outcomeNarrative = '';
    let opponentSpokenOrObserved = '';
    let locationUpdate: string | undefined;
    let newEvidenceItems = [...currentState.evidenceList];

    if (activeTest) {
      // Find matching response rule in scenario test
      const matchedResponse = activeTest.responses.find(r =>
        r.intentMatches.some(
          match =>
            parsed.category === match ||
            parsed.subIntent === match ||
            parsed.rawText.toLowerCase().includes(match.toLowerCase())
        )
      );

      if (matchedResponse) {
        outcomeNarrative = matchedResponse.narrativeOutcome;
        opponentSpokenOrObserved = matchedResponse.opponentReaction;
        if (matchedResponse.advancesLocation) {
          locationUpdate = matchedResponse.advancesLocation;
        }
        if (matchedResponse.newEvidence) {
          for (const ev of matchedResponse.newEvidence) {
            if (!newEvidenceItems.some(existing => existing.id === ev.id)) {
              newEvidenceItems.push(ev);
            }
          }
        }
      } else {
        outcomeNarrative = activeTest.defaultResponse.narrativeOutcome;
        opponentSpokenOrObserved = activeTest.defaultResponse.opponentReaction;
      }
    } else {
      outcomeNarrative = this.generateGenerativeNarrative(parsed, currentState);
      opponentSpokenOrObserved =
        'The figure behind you pauses momentarily, maintaining a distance of twelve paces.';
    }

    // 5. Append Narrative Log entries
    const newNarrativeLog: NarrativeEntry[] = [...currentState.narrativeLog];

    // Player action echo (editorial, restrained)
    newNarrativeLog.push({
      id: `turn-${turn}-action`,
      timestamp: currentState.inScenarioTime,
      turnNumber: turn,
      type: 'action_echo',
      speaker: 'YOU',
      speakerRole: currentState.playerContext.role,
      content: parsed.rawText,
    });

    // Environmental / situational progression
    newNarrativeLog.push({
      id: `turn-${turn}-outcome`,
      timestamp: nextTime,
      turnNumber: turn,
      type: 'narrative',
      content: outcomeNarrative,
    });

    // Opponent observable reaction
    if (opponentSpokenOrObserved) {
      newNarrativeLog.push({
        id: `turn-${turn}-opponent`,
        timestamp: nextTime,
        turnNumber: turn,
        type: 'observation',
        speaker: currentState.opponentState.apparentIdentity,
        content: opponentSpokenOrObserved,
      });
    }

    // 6. Update Timeline
    const newTimeline: TimelineEntry[] = [
      ...currentState.timeline,
      {
        id: `timeline-${turn}`,
        timestamp: nextTime,
        turnNumber: turn,
        label: `PHASE ${turn}: ${parsed.category.toUpperCase()}`,
        summary: parsed.rawText.length > 60 ? parsed.rawText.slice(0, 57) + '...' : parsed.rawText,
        significance: opponentEval.suspicionDelta > 15 ? 'critical' : opponentEval.suspicionDelta > 5 ? 'elevated' : 'routine',
      },
    ];

    // 7. Record Opponent internal history for debrief
    const nextSuspicionScore = Math.max(
      0,
      Math.min(100, currentState.opponentState.suspicionScore + opponentEval.suspicionDelta)
    );

    const updatedOpponentState = {
      ...currentState.opponentState,
      suspicionScore: nextSuspicionScore,
      vigilanceLevel: opponentEval.newVigilance,
      currentHypotheses: opponentEval.updatedHypotheses,
      activeTestId: scenario.tests[turn]?.id || null,
      testHistory: [
        ...currentState.opponentState.testHistory,
        {
          testId: activeTest?.id || `turn_${turn}`,
          description: activeTest?.name || `Free-form phase ${turn}`,
          playerResponse: parsed.rawText,
          opponentDeduction: opponentEval.internalDeduction,
          suspicionDelta: opponentEval.suspicionDelta,
        },
      ],
    };

    // 8. Update Player Context
    const updatedPlayerContext = {
      ...currentState.playerContext,
      time: nextTime,
      location: locationUpdate || currentState.playerContext.location,
    };

    const nextState: GameState = {
      ...currentState,
      turnNumber: turn + 1,
      inScenarioTime: nextTime,
      narrativeLog: newNarrativeLog,
      evidenceList: newEvidenceItems,
      timeline: newTimeline,
      opponentState: updatedOpponentState,
      playerContext: updatedPlayerContext,
      lastActionText: actionText,
    };

    // 9. Evaluate Ending Conditions
    let endingTriggered = false;
    let finalVerdict: any = null;

    for (const ending of scenario.endingConditions) {
      if (ending.condition(nextState)) {
        endingTriggered = true;
        finalVerdict = ending.verdict;
        newNarrativeLog.push({
          id: `ending-${turn}`,
          timestamp: nextTime,
          turnNumber: turn + 1,
          type: 'incident',
          isImportant: true,
          content: ending.narrativeConclusion,
        });
        break;
      }
    }

    if (!endingTriggered && nextState.turnNumber > scenario.maxTurns) {
      endingTriggered = true;
      newNarrativeLog.push({
        id: `ending-${turn}-max`,
        timestamp: nextTime,
        turnNumber: turn + 1,
        type: 'incident',
        isImportant: true,
        content:
          'The observation window concludes. The operational timeline has elapsed, locking the case parameters.',
      });
    }

    if (endingTriggered) {
      nextState.isCompleted = true;
      nextState.debrief = generateDebrief(nextState, scenario, finalVerdict);
    }

    return nextState;
  }

  private static advanceScenarioTime(currentTime: string, minutes: number): string {
    const match = currentTime.match(/(\d{1,2}):(\d{2})\s*(JST|AM|PM)?/i);
    if (!match) return currentTime;
    let hour = parseInt(match[1], 10);
    let min = parseInt(match[2], 10) + minutes;
    if (min >= 60) {
      hour = (hour + Math.floor(min / 60)) % 24;
      min = min % 60;
    }
    const zone = match[3] || 'JST';
    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${zone}`;
  }

  private static generateGenerativeNarrative(parsed: any, state: GameState): string {
    if (parsed.category === 'silence') {
      return 'You maintain steady breathing and unbroken stride. The commuter crowd surges around you like dark water around a pillar.';
    }
    if (parsed.category === 'observation') {
      return 'Through peripheral vision and shopfront glass, you dissect the geometry of the concourse. Shadows shift with deliberate rhythm.';
    }
    if (parsed.category === 'movement') {
      return 'You shift direction smoothly, integrating into the pedestrian flow toward the platform stairwell.';
    }
    if (parsed.category === 'feigned_normalcy') {
      return 'You adjust your bag strap and check the departure board with the practiced indifference of a student returning from cram school.';
    }
    return 'Your action ripples through the immediate space, registering subtly in the observer’s positioning.';
  }
}
