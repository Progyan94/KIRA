// Free-form Action and Natural Language Parser
// Deconstructs player's text input into tactical intents, dialogue extraction, vigilance metrics, and semantic targets.

export interface ParsedAction {
  rawText: string;
  category:
    | 'observation'
    | 'dialogue'
    | 'movement'
    | 'concealment'
    | 'investigation'
    | 'silence'
    | 'confrontation'
    | 'feigned_normalcy'
    | 'communication';
  subIntent: string;
  spokenWords: string | null;
  tone: 'calm' | 'nervous' | 'assertive' | 'curious' | 'aloof' | 'paranoid';
  detectedEntities: string[];
  vigilanceIndex: number; // 0 (completely ordinary) to 100 (acutely suspicious / paranoid)
  isConfrontational: boolean;
  hasNpaSlip: boolean; // Mentioned confidential police knowledge
}

export function parsePlayerAction(input: string): ParsedAction {
  const text = input.trim();
  const lower = text.toLowerCase();

  // 1. Dialogue extraction
  let spokenWords: string | null = null;
  const quoteMatch = text.match(/["“']([^"”']+)["”']/);
  if (quoteMatch) {
    spokenWords = quoteMatch[1];
  } else if (
    lower.startsWith('say ') ||
    lower.startsWith('tell ') ||
    lower.startsWith('ask ') ||
    lower.startsWith('whisper ') ||
    lower.startsWith('reply ')
  ) {
    spokenWords = text.replace(/^(say|tell|ask|whisper|reply)\s+(to\s+[^:]+[:\s]+)?/i, '').trim();
  }

  // 2. Keyword detection
  const detectedEntities: string[] = [];
  const keywordMap: Record<string, string[]> = {
    notebook: ['notebook', 'death note', 'page', 'scrap', 'paper', 'pocket', 'pen'],
    tail_agent: ['tail', 'agent', 'coat', 'stranger', 'man', 'tracker', 'investigator', 'penber', 'parker'],
    police_intel: ['npa', 'task force', 'secret file', 'database', 'classified', 'headquarters', 'internal server'],
    broadcast: ['broadcast', 'television', 'tv', 'news', 'lind', 'tailor', 'satellite', 'kanto'],
    surveillance: ['camera', 'wiretap', 'microphone', 'lead', 'pencil lead', 'doorknob', 'bug', 'lens'],
    university: ['exam', 'to-oh', 'ryuga', 'score', 'auditorium', 'ceremony', 'classmate'],
    reflection: ['glass', 'reflection', 'window', 'mirror', 'display window', 'train window'],
  };

  for (const [key, terms] of Object.entries(keywordMap)) {
    if (terms.some(t => lower.includes(t))) {
      detectedEntities.push(key);
    }
  }

  // 3. Category & Sub-Intent classification
  let category: ParsedAction['category'] = 'feigned_normalcy';
  let subIntent = 'routine_behavior';
  let vigilanceIndex = 15;

  if (
    lower.includes('silence') ||
    lower.includes('say nothing') ||
    lower.includes('remain quiet') ||
    lower.includes('stay quiet') ||
    lower.includes('ignore') ||
    lower.includes('no response') ||
    lower.includes('hold tongue') ||
    text === '...' ||
    text === '—'
  ) {
    category = 'silence';
    subIntent = 'calculated_restraint';
    vigilanceIndex = 25;
  } else if (spokenWords || lower.startsWith('say ') || lower.startsWith('ask ') || lower.includes('dialogue')) {
    category = 'dialogue';
    if (lower.includes('why are you following') || lower.includes('who are you') || lower.includes('stop following')) {
      subIntent = 'direct_challenge';
      vigilanceIndex = 85;
    } else if (lower.includes('excuse me') || lower.includes('pardon') || lower.includes('time') || lower.includes('directions')) {
      subIntent = 'casual_inquiry';
      vigilanceIndex = 20;
    } else if (lower.includes('kira') || lower.includes('justice') || lower.includes('killings') || lower.includes('police')) {
      subIntent = 'ideological_engagement';
      vigilanceIndex = 65;
    } else {
      subIntent = 'conversational_exchange';
      vigilanceIndex = 30;
    }
  } else if (
    lower.includes('reflection') ||
    lower.includes('glance') ||
    lower.includes('look at') ||
    lower.includes('observe') ||
    lower.includes('watch') ||
    lower.includes('check behind') ||
    lower.includes('inspect') ||
    lower.includes('peer')
  ) {
    category = 'observation';
    if (lower.includes('reflection') || lower.includes('glass') || lower.includes('window')) {
      subIntent = 'indirect_surveillance';
      vigilanceIndex = 40;
    } else if (lower.includes('behind') || lower.includes('turn head') || lower.includes('look back')) {
      subIntent = 'overt_lookback';
      vigilanceIndex = 75;
    } else {
      subIntent = 'environmental_scan';
      vigilanceIndex = 35;
    }
  } else if (
    lower.includes('hide') ||
    lower.includes('conceal') ||
    lower.includes('pocket') ||
    lower.includes('tuck away') ||
    lower.includes('cover') ||
    lower.includes('clutch') ||
    lower.includes('destroy paper')
  ) {
    category = 'concealment';
    subIntent = 'evidence_protection';
    vigilanceIndex = 60;
  } else if (
    lower.includes('confront') ||
    lower.includes('grab') ||
    lower.includes('interrogate') ||
    lower.includes('block') ||
    lower.includes('demand')
  ) {
    category = 'confrontation';
    subIntent = 'overt_confrontation';
    vigilanceIndex = 95;
  } else if (
    lower.includes('walk') ||
    lower.includes('turn') ||
    lower.includes('stairs') ||
    lower.includes('board') ||
    lower.includes('train') ||
    lower.includes('step') ||
    lower.includes('exit') ||
    lower.includes('enter') ||
    lower.includes('cross') ||
    lower.includes('commute') ||
    lower.includes('detour')
  ) {
    category = 'movement';
    if (lower.includes('sudden') || lower.includes('run') || lower.includes('dash') || lower.includes('sprint') || lower.includes('bolt')) {
      subIntent = 'evasive_flee';
      vigilanceIndex = 90;
    } else if (lower.includes('detour') || lower.includes('change route') || lower.includes('alternate platform') || lower.includes('different gate')) {
      subIntent = 'calculated_reroute';
      vigilanceIndex = 45;
    } else {
      subIntent = 'routine_transit';
      vigilanceIndex = 15;
    }
  } else if (
    lower.includes('call') ||
    lower.includes('phone') ||
    lower.includes('dial') ||
    lower.includes('pager') ||
    lower.includes('message')
  ) {
    category = 'communication';
    subIntent = 'telecom_action';
    vigilanceIndex = 45;
  } else if (
    lower.includes('read') ||
    lower.includes('study') ||
    lower.includes('browse') ||
    lower.includes('pretend') ||
    lower.includes('act normal') ||
    lower.includes('eat') ||
    lower.includes('snack') ||
    lower.includes('chips') ||
    lower.includes('write notes')
  ) {
    category = 'feigned_normalcy';
    subIntent = 'active_normalcy_performance';
    vigilanceIndex = 20;
  }

  // 4. Tone estimation
  let tone: ParsedAction['tone'] = 'calm';
  if (lower.includes('!') || lower.includes('suddenly') || lower.includes('frantic') || lower.includes('panic') || lower.includes('hurry')) {
    tone = 'nervous';
  } else if (lower.includes('demand') || lower.includes('harsh') || lower.includes('confront') || lower.includes('stop')) {
    tone = 'assertive';
  } else if (lower.includes('paranoia') || lower.includes('trap') || lower.includes('they know') || lower.includes('suspicious')) {
    tone = 'paranoid';
  } else if (lower.includes('why') || lower.includes('how') || lower.includes('curious') || lower.includes('wonder')) {
    tone = 'curious';
  } else if (lower.includes('cold') || lower.includes('indifferent') || lower.includes('shrug') || lower.includes('dismiss')) {
    tone = 'aloof';
  }

  // 5. Confidential Police Slip detection
  // If player mentions information known ONLY to the investigation task force / NPA (e.g. unannounced heart attack victim, secret task force size, internal files)
  const hasNpaSlip =
    lower.includes('heart attack at 14:00') ||
    lower.includes('npa server') ||
    lower.includes('internal police file') ||
    lower.includes('task force count') ||
    lower.includes('fbi involvement') ||
    lower.includes('shinjuku memo') ||
    (lower.includes('raye') && lower.includes('penber'));

  return {
    rawText: text,
    category,
    subIntent,
    spokenWords,
    tone,
    detectedEntities,
    vigilanceIndex,
    isConfrontational: category === 'confrontation' || subIntent === 'direct_challenge',
    hasNpaSlip,
  };
}
