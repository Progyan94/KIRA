// Post-Scenario Debrief Generator
// Synthesizes step-by-step timeline, opponent hypothesis evolution, ground truth reconciliation, and alternative path analysis.

import { DebriefData, GameState, OutcomeVerdict } from '../types/game';
import { ScenarioDefinition } from '../types/scenario';

export function generateDebrief(
  state: GameState,
  scenario: ScenarioDefinition,
  forcedVerdict?: OutcomeVerdict
): DebriefData {
  const finalSuspicion = state.opponentState.suspicionScore;
  let verdict: OutcomeVerdict = forcedVerdict || 'inconclusive_investigation';
  let verdictTitle = 'INCONCLUSIVE DOSSIER';
  let summary = '';

  if (!forcedVerdict) {
    if (finalSuspicion <= 25) {
      verdict = 'flawless_concealment';
      verdictTitle = 'FLAWLESS CONCEALMENT';
      summary =
        'Your actions preserved complete civilian plausibility. The investigator concluded that following you was an unproductive allocation of task force resources, closing the lead without formal report.';
    } else if (finalSuspicion <= 48) {
      verdict = 'tactical_stalemate';
      verdictTitle = 'TACTICAL STALEMATE';
      summary =
        'Neither side secured decisive confirmation. You avoided catastrophic self-incrimination, but minor anomalies in your movements kept your file marked for secondary review.';
    } else if (finalSuspicion <= 72) {
      verdict = 'partial_compromise';
      verdictTitle = 'PARTIAL COMPROMISE';
      summary =
        'Your behavioral signatures deviated noticeably from an innocent baseline. While criminal proof remains absent, your name has been placed on the task force priority surveillance docket.';
    } else {
      verdict = 'critical_exposure';
      verdictTitle = 'CRITICAL EXPOSURE';
      summary =
        'Direct confrontation, panic reflexes, or unprompted knowledge of confidential investigation data conclusively confirmed the investigator’s hypothesis. Full tactical surveillance is now authorized.';
    }
  }

  // 1. Clue Audit
  const clueAudit = scenario.groundTruthData.clueAudits.map(audit => ({
    code: audit.code,
    title: audit.title,
    nature: audit.nature,
    playerAssumed: audit.playerPerspective,
    actualReality: audit.actualFact,
  }));

  // 2. Step-by-Step Parallel Timeline
  const stepByStepTimeline = state.opponentState.testHistory.map((th, idx) => ({
    turn: idx + 1,
    playerAction: th.playerResponse,
    opponentDeduction: th.opponentDeduction,
    underlyingTruth:
      idx < scenario.tests.length
        ? scenario.tests[idx].evaluatedCriteria
        : 'Routine observational surveillance.',
    suspicionShift: th.suspicionDelta,
  }));

  // 3. What Opponent Knew vs Suspected
  const whatOpponentKnew = [
    ...state.opponentState.knowledgeBase,
    `Target final demeanor classification: ${state.opponentState.vigilanceLevel.toUpperCase()}`,
  ];

  const whatOpponentSuspected = [
    ...state.opponentState.suspicions,
    `Estimated probability target is Kira: ${Math.min(99, Math.round(finalSuspicion * 0.95))}%`,
    `Estimated probability target is ordinary civilian: ${Math.max(1, Math.round(100 - finalSuspicion))}%`,
  ];

  return {
    scenarioId: scenario.id,
    verdict,
    verdictTitle,
    summary,
    turnsElapsed: state.turnNumber,
    finalSuspicionScore: finalSuspicion,
    groundTruthNarrative: scenario.groundTruthData.fullStory,
    whatOpponentKnew,
    whatOpponentSuspected,
    clueAudit,
    stepByStepTimeline,
    alternativePaths: scenario.groundTruthData.alternativePaths,
  };
}
