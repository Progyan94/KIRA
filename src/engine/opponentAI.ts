// Adversarial Opponent Engine
// Implements an autonomous, non-omniscient investigator with bounded knowledge, hypothesis generation, and indirect testing capabilities.

import { OpponentHypothesis, OpponentState, EntityNature } from '../types/game';
import { ParsedAction } from './actionParser';

export interface OpponentDecision {
  suspicionDelta: number;
  newVigilance: 'routine' | 'cautious' | 'heightened' | 'acute';
  internalDeduction: string; // Strictly hidden from player during gameplay!
  behavioralResponse: string; // Outward action, spoken dialogue, or subtle movement visible to player
  launchedTestId?: string | null;
  updatedHypotheses: OpponentHypothesis[];
}

export function evaluatePlayerAction(
  opponent: OpponentState,
  action: ParsedAction,
  turnNumber: number,
  scenarioContext: {
    activeTest?: {
      id: string;
      goal: string;
      criteria: string;
    };
    location: string;
    surroundingCrowdDensity: 'empty' | 'sparse' | 'dense';
  }
): OpponentDecision {
  let delta = 0;
  const deductions: string[] = [];
  let responseText = '';
  let vigilance = opponent.vigilanceLevel;

  // 1. Evaluate Direct Confrontation / Panic
  if (action.isConfrontational) {
    delta += 24;
    deductions.push(
      'Target displayed acute defensive reflex and unprompted hostility. Innocent civilians do not confront a discreet stranger in a crowded terminal.'
    );
  } else if (action.vigilanceIndex >= 80) {
    delta += 16;
    deductions.push(
      'Target exhibited abnormal evasive trajectory. Sudden pace change and irregular check-backs suggest awareness of surveillance.'
    );
  }

  // 2. Evaluate Confidential Information Leakage (NPA / Secret Data)
  if (action.hasNpaSlip) {
    delta += 40;
    deductions.push(
      'CRITICAL: Target referenced unreleased internal NPA case details. This establishes direct access to police headquarters data.'
    );
  }

  // 3. Evaluate Calculated Normalcy vs Over-Correction
  if (action.category === 'feigned_normalcy') {
    if (opponent.suspicionScore > 50 && action.subIntent === 'active_normalcy_performance') {
      // If already suspicious, exaggerated normalcy (e.g. intensely reading while sirens blare) is noted
      delta += 2;
      deductions.push(
        'Target exhibits disciplined emotional control. Normal students display momentary curiosity at unexpected terminal announcements.'
      );
    } else {
      // Natural behavior lowers immediate tension
      delta -= 6;
      deductions.push('Target actions remain consistent with scheduled commute routine.');
    }
  }

  // 4. Evaluate Observation Methods
  if (action.category === 'observation') {
    if (action.subIntent === 'indirect_surveillance') {
      // Using glass reflection: intelligent, but if done smoothly, difficult for opponent to prove
      delta += 4;
      deductions.push('Target paused near reflective storefront. Could be checking reflection or merely viewing display.');
    } else if (action.subIntent === 'overt_lookback') {
      delta += 14;
      deductions.push('Target turned head directly toward my position. Visual contact confirmed.');
    }
  }

  // 5. Evaluate Silence / Restraint
  if (action.category === 'silence') {
    if (opponent.activeTestId) {
      // Silence during a direct verbal query might seem aloof or guarded
      delta += 5;
      deductions.push('Subject withheld verbal response. Calculated hesitation or genuine indifference?');
    } else {
      delta -= 3;
      deductions.push('Subject continues without reacting to peripheral commotion.');
    }
  }

  // 6. Natural bounded bounds for Suspicion Score (0 to 100)
  const newScore = Math.max(0, Math.min(100, opponent.suspicionScore + delta));

  // 7. Update Vigilance State
  if (newScore >= 75) {
    vigilance = 'acute';
  } else if (newScore >= 50) {
    vigilance = 'heightened';
  } else if (newScore >= 25) {
    vigilance = 'cautious';
  } else {
    vigilance = 'routine';
  }

  // 8. Update Hypothesis Probabilities
  const updatedHypotheses = opponent.currentHypotheses.map(hypo => {
    let newProb = hypo.probability;
    if (hypo.id === 'civilian_student') {
      newProb = Math.max(5, Math.min(95, 100 - newScore));
    } else if (hypo.id === 'hyper_vigilant_suspect') {
      newProb = Math.max(5, Math.min(95, Math.round(newScore * 0.4 + 10)));
    } else if (hypo.id === 'kira_with_police_leak') {
      newProb = Math.max(2, Math.min(95, Math.round(newScore * 0.6)));
    }
    return { ...hypo, probability: newProb };
  });

  const finalDeduction =
    deductions.length > 0
      ? deductions.join(' ')
      : 'Subject behavior conforms to baseline civilian expectations.';

  return {
    suspicionDelta: delta,
    newVigilance: vigilance,
    internalDeduction: finalDeduction,
    behavioralResponse: responseText,
    updatedHypotheses,
  };
}
