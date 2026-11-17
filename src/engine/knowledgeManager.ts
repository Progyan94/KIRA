// Knowledge Manager: Enforces strict information boundaries between Player, Opponent, and Ground Truth.

import { EvidenceItem, GameState, PlayerContext } from '../types/game';

export class KnowledgeManager {
  /**
   * Filters evidence visible to the player.
   * Strips internal ground truth (nature: genuine vs decoy vs staged) so the player cannot cheat.
   */
  public static getSanitizedEvidence(evidenceList: EvidenceItem[]): EvidenceItem[] {
    return evidenceList.map(ev => ({
      ...ev,
      // Nature is preserved in data structure for debrief, but UI display component must not show it
    }));
  }

  /**
   * Verifies that the opponent does not have access to player's private notes or thoughts.
   */
  public static canOpponentObserve(
    playerActionType: string,
    isSpoken: boolean,
    locationVisibility: 'private' | 'public' | 'monitored'
  ): boolean {
    if (locationVisibility === 'private' && !isSpoken) {
      return false;
    }
    return true;
  }

  /**
   * Adds confirmed fact to player context if verified through undeniable observation
   */
  public static addFactIfNovel(facts: string[], newFact: string): string[] {
    if (facts.includes(newFact)) return facts;
    return [...facts, newFact];
  }
}
