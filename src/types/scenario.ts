// Scenario Blueprint & Contract Types
import {
  EntityNature,
  EvidenceItem,
  NarrativeEntry,
  OutcomeVerdict,
  PlayerContext,
  CharacterRelation,
  TimelineEntry,
} from './game';

export interface ActionIntent {
  category:
    | 'observation'
    | 'dialogue'
    | 'movement'
    | 'concealment'
    | 'investigation'
    | 'silence'
    | 'confrontation'
    | 'feigned_normalcy'
    | 'provocation';
  subIntent?: string;
  target?: string;
  tone?: 'calm' | 'nervous' | 'assertive' | 'curious' | 'aloof' | 'paranoid';
  rawText: string;
}

export interface SuggestedAction {
  id: string;
  label: string;
  actionText: string;
  category: 'tactical' | 'verbal' | 'observational' | 'investigation' | 'communication';
}

export interface ScenarioTest {
  id: string;
  triggerTurn?: number;
  triggerCondition?: (state: any) => boolean;
  name: string;
  description: string;
  opponentGoal: string;
  evaluatedCriteria: string;
  responses: {
    intentMatches: string[];
    narrativeOutcome: string;
    opponentReaction: string;
    suspicionDelta: number;
    newEvidence?: EvidenceItem[];
    newTimelineEntry?: Partial<TimelineEntry>;
    advancesLocation?: string;
    revealsFact?: string;
  }[];
  defaultResponse: {
    narrativeOutcome: string;
    opponentReaction: string;
    suspicionDelta: number;
    newTimelineEntry?: Partial<TimelineEntry>;
  };
}

export interface ScenarioEndingCondition {
  id: string;
  condition: (state: any) => boolean;
  verdict: OutcomeVerdict;
  verdictTitle: string;
  summary: string;
  narrativeConclusion: string;
}

export interface ScenarioDefinition {
  id: string;
  code: string; // e.g. "CASE-01"
  title: string;
  subtitle: string;
  difficulty: 'STANDARD' | 'HEIGHTENED' | 'CRITICAL';
  briefing: {
    background: string;
    playerObjective: string;
    apparentSituation: string;
    criticalWarning: string;
  };
  initialPlayerContext: PlayerContext;
  initialNarrative: NarrativeEntry[];
  initialEvidence: EvidenceItem[];
  initialTimeline: TimelineEntry[];
  suggestedActions: SuggestedAction[];
  
  // Opponent setup
  opponentConfig: {
    name: string;
    apparentRole: string;
    trueRole: string;
    initialObjective: string;
    initialSuspicionScore: number;
    initialKnowledge: string[];
    initialHypotheses: { id: string; label: string; probability: number; basis: string[] }[];
  };

  // Turn-by-turn or triggered progression tests
  tests: ScenarioTest[];
  endingConditions: ScenarioEndingCondition[];
  maxTurns: number;

  // Ground truth audit for debrief
  groundTruthData: {
    fullStory: string;
    opponentMasterPlan: string;
    clueAudits: {
      code: string;
      title: string;
      nature: EntityNature;
      playerPerspective: string;
      actualFact: string;
    }[];
    alternativePaths: {
      title: string;
      description: string;
      potentialOutcome: string;
    }[];
  };
}
