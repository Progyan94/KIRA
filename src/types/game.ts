// Core Types for KIRA — The Psychological Warfare Simulator

export type EntityNature =
  | 'genuine'
  | 'incorrect'
  | 'misleading'
  | 'deliberately_staged'
  | 'incomplete'
  | 'unrelated';

export type EntryType =
  | 'narrative'
  | 'dialogue'
  | 'observation'
  | 'communication'
  | 'action_echo'
  | 'incident'
  | 'system';

export interface NarrativeEntry {
  id: string;
  timestamp: string; // Fictional in-scenario timestamp, e.g. "17:36:12 JST"
  turnNumber: number;
  type: EntryType;
  speaker?: string;
  speakerRole?: string;
  content: string;
  contextNote?: string;
  isImportant?: boolean;
}

export interface EvidenceItem {
  id: string;
  code: string; // e.g. "EVD-04"
  title: string;
  description: string;
  source: string;
  discoveredTurn: number;
  isConfirmed: boolean; // Confirmed fact vs unverified speculation
  nature: EntityNature; // Ground truth nature (hidden during gameplay, revealed in debrief)
  notes?: string;
}

export interface TimelineEntry {
  id: string;
  timestamp: string;
  turnNumber: number;
  label: string;
  summary: string;
  significance: 'routine' | 'elevated' | 'critical';
}

export interface CharacterRelation {
  name: string;
  role: string;
  status: string;
  credibility: 'unknown' | 'credible' | 'suspect' | 'compromised';
  knownToPlayer: string;
  hiddenAgenda?: string; // Ground truth, revealed in debrief
}

export interface PlayerContext {
  date: string; // e.g. "24 NOVEMBER 2003"
  time: string; // e.g. "17:35 JST"
  location: string;
  role: string;
  knownFacts: string[];
  resources: string[];
  relationships: CharacterRelation[];
}

export interface OpponentHypothesis {
  id: string;
  label: string;
  probability: number; // 0 to 100 (Internal state, strictly hidden from player)
  basis: string[];
}

export interface OpponentState {
  name: string;
  apparentIdentity: string;
  trueIdentity: string;
  objective: string;
  knowledgeBase: string[]; // Facts opponent knows for certain
  suspicions: string[]; // Hypotheses opponent is testing
  currentHypotheses: OpponentHypothesis[];
  suspicionScore: number; // 0 to 100 (Strictly hidden during gameplay!)
  vigilanceLevel: 'routine' | 'cautious' | 'heightened' | 'acute';
  activeTestId: string | null; // e.g., active bait/trap in progress
  testHistory: {
    testId: string;
    description: string;
    playerResponse: string;
    opponentDeduction: string;
    suspicionDelta: number;
  }[];
}

export type OutcomeVerdict =
  | 'flawless_concealment'
  | 'tactical_stalemate'
  | 'inconclusive_investigation'
  | 'partial_compromise'
  | 'critical_exposure'
  | 'decoy_trap_triggered';

export interface DebriefData {
  scenarioId: string;
  verdict: OutcomeVerdict;
  verdictTitle: string;
  summary: string;
  turnsElapsed: number;
  finalSuspicionScore: number; // 0-100 (Revealed now in debrief)
  groundTruthNarrative: string;
  whatOpponentKnew: string[];
  whatOpponentSuspected: string[];
  clueAudit: {
    code: string;
    title: string;
    nature: EntityNature;
    playerAssumed: string;
    actualReality: string;
  }[];
  stepByStepTimeline: {
    turn: number;
    playerAction: string;
    opponentDeduction: string;
    underlyingTruth: string;
    suspicionShift: number; // e.g. +10, -5, 0
  }[];
  alternativePaths: {
    title: string;
    description: string;
    potentialOutcome: string;
  }[];
}

export interface GameState {
  scenarioId: string;
  scenarioTitle: string;
  turnNumber: number;
  maxTurns: number;
  inScenarioTime: string;
  isCompleted: boolean;
  playerContext: PlayerContext;
  narrativeLog: NarrativeEntry[];
  evidenceList: EvidenceItem[];
  timeline: TimelineEntry[];
  playerScratchpad: string; // Player's personal deduction notebook
  opponentState: OpponentState;
  groundTruthNotes: string[];
  debrief: DebriefData | null;
  lastActionText?: string;
}

export interface SavedInvestigation {
  id: string;
  savedAt: string;
  scenarioId: string;
  scenarioTitle: string;
  turnNumber: number;
  isCompleted: boolean;
  verdict?: OutcomeVerdict;
  verdictTitle?: string;
  gameState: GameState;
}
