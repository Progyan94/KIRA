// CASE-04: THE KANTŌ BROADCAST GAMBIT (THE DECOY BROADCAST)
// Scope: Spoiler-safe (Episode 1-8 dynamics). Countering the Lind L. Tailor television provocation.

import { ScenarioDefinition } from '../../types/scenario';

export const case04_kantoBroadcast: ScenarioDefinition = {
  id: 'case_04_kanto_broadcast',
  code: 'CASE-04',
  title: 'THE KANTŌ BROADCAST GAMBIT',
  subtitle: 'Geographic Telemetry and Provocative Bait on Live Air',
  difficulty: 'CRITICAL',
  briefing: {
    background:
      'Tokyo, 19:00 JST. You are watching prime-time television. Without prior warning, the national programming is abruptly suspended by a high-priority ICPO emergency announcement.',
    playerObjective:
      'Analyze the emergency broadcast without reacting impulsively. Discern the broadcast transmission scope and uncover whether the provocative broadcast is genuine or a staged trap.',
    apparentSituation:
      'A man named Lind L. Tailor sits before international press insignia, identifying himself as the sole lead investigator tasked with executing Kira. He denounces Kira on live TV as childish and evil.',
    criticalWarning:
      'Striking down the speaker immediately will feel like a demonstration of divine supremacy—but consider why the broadcast allows a high-profile investigator to show his face so brazenly.',
  },
  initialPlayerContext: {
    date: '05 DECEMBER 2003',
    time: '19:00 JST',
    location: 'YAGAMI LIVING ROOM / STUDY',
    role: 'TELEVISION VIEWER (KIRA)',
    knownFacts: [
      'An emergency worldwide ICPO broadcast has just superseded scheduled programming.',
      'The man claims to be "Lind L. Tailor", lead investigator.',
      'He looks directly at the camera with intense, arrogant disdain.',
      'The Death Note and a pen are within reach on your desk.',
    ],
    resources: [
      'TELEVISION REMOTE (CABLE / SATELLITE CHANNELS)',
      'DESK TELEPHONE (LOCAL & REGIONAL EXCHANGES)',
      'DAILY TELEVISION PROGRAM GUIDE (NEWSPAPER INSERT)',
      'DEATH NOTE & BALLPOINT PEN',
    ],
    relationships: [
      {
        name: 'LIND L. TAILOR',
        role: 'TELEVISED ANCHOR / PURPORTED LEAD INVESTIGATOR',
        status: 'SPEAKING LIVE ON SCREEN',
        credibility: 'suspect',
        knownToPlayer: 'Western man in dark suit, reading from a prepared teleprompter.',
        hiddenAgenda: 'Death row inmate whose execution was stayed to serve as live bait for Kira.',
      },
      {
        name: 'TRUE INVESTIGATOR (L)',
        role: 'CONCEALED MASTERMIND',
        status: 'COVERT BROADCAST CONTROL CENTER',
        credibility: 'suspect',
        knownToPlayer: 'Unseen entity orchestrating the transmission feed.',
        hiddenAgenda: 'Monitoring regional signal return loops to locate Kira’s television precinct.',
      },
    ],
  },
  initialNarrative: [
    {
      id: 'case04-init-1',
      timestamp: '19:00 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'A piercing emergency broadcast chime cuts through the evening airwaves. The screen turns black, replaced by a bold seal: INTERPOL / INTERNATIONAL CRIMINAL POLICE ORGANIZATION.',
    },
    {
      id: 'case04-init-2',
      timestamp: '19:00 JST',
      turnNumber: 0,
      type: 'observation',
      content:
        'A middle-aged man in a dark grey suit appears behind a plain wooden desk. The lower third graphic reads: LIND L. TAILOR // SPECIAL INVESTIGATION DIRECTOR.',
    },
    {
      id: 'case04-init-3',
      timestamp: '19:00 JST',
      turnNumber: 0,
      type: 'dialogue',
      speaker: 'LIND L. TAILOR',
      speakerRole: 'Broadcast Subject',
      content:
        '"I am Lind L. Tailor, commonly known as L. Kira, you are nothing more than a coward who preys upon the defenseless. What you are doing is not justice. It is pure, pathetic evil. If you have the power to strike me down, do it now. Here I am!"',
    },
  ],
  initialEvidence: [
    {
      id: 'evd-401',
      code: 'EVD-401',
      title: 'BROADCAST IDENTIFIER',
      description: 'Speaker identified on screen as "Lind L. Tailor", claiming to be "L".',
      source: 'Televised Broadcast Graphics',
      discoveredTurn: 0,
      isConfirmed: false,
      nature: 'deliberately_staged',
    },
    {
      id: 'evd-402',
      code: 'EVD-402',
      title: 'LIVE PROVOCATION',
      description: 'Direct challenge daring Kira to execute the speaker on live television.',
      source: 'Televised Audio Stream',
      discoveredTurn: 0,
      isConfirmed: true,
      nature: 'deliberately_staged',
    },
  ],
  initialTimeline: [
    {
      id: 'tl-401',
      timestamp: '18:59 JST',
      turnNumber: 0,
      label: 'PROGRAM INTERRUPTION',
      summary: 'Regular scheduled broadcast suspended for ICPO bulletin.',
      significance: 'routine',
    },
    {
      id: 'tl-402',
      timestamp: '19:00 JST',
      turnNumber: 0,
      label: 'THE CHALLENGE AIRS',
      summary: 'Tailor denounces Kira on live broadcast and issues execution challenge.',
      significance: 'critical',
    },
  ],
  suggestedActions: [
    {
      id: 'sug-401',
      label: 'CHECK OTHER REGIONAL CHANNELS',
      actionText: 'Use the remote control to cycle through regional and national channels (Osaka, Hokkaido, Sendai) to see if this broadcast is truly worldwide.',
      category: 'investigation',
    },
    {
      id: 'sug-402',
      label: 'REMAIN MOTIONLESS & OBSERVE THE FEED',
      actionText: 'Keep your hands off the notebook and pen. Watch his breathing, audio latency, and studio background carefully.',
      category: 'observational',
    },
    {
      id: 'sug-403',
      label: 'CALL RELATIVE IN ANOTHER PREFECTURE',
      actionText: 'Pick up the phone and call your cousin in Osaka to ask if the emergency broadcast is showing on Kansai TV.',
      category: 'communication',
    },
    {
      id: 'sug-404',
      label: 'WRITE LIND L. TAILOR IN NOTEBOOK',
      actionText: 'Open the black notebook and write "Lind L. Tailor" to immediately silence this arrogant provocateur.',
      category: 'tactical',
    },
  ],
  opponentConfig: {
    name: 'L (BROADCAST OPERATIONS)',
    apparentRole: 'Lind L. Tailor (Television Decoy)',
    trueRole: 'L, managing satellite relay transmitters from secret command van',
    initialObjective:
      'Bait Kira into killing Lind L. Tailor to determine Kira’s existence, kill mechanism, and regional broadcast area.',
    initialSuspicionScore: 40,
    initialKnowledge: [
      'Tailor is a condemned felon whose execution was scheduled for today.',
      'The broadcast is currently airing ONLY in the Kantō region of Japan.',
      'If Tailor dies, Kira is confirmed to be residing in Kantō.',
    ],
    initialHypotheses: [
      {
        id: 'civilian_student',
        label: 'Passive Viewer with No Kill Power',
        probability: 50,
        basis: ['Millions of ordinary citizens watching the broadcast'],
      },
      {
        id: 'hyper_vigilant_suspect',
        label: 'Analytical Kira Calculating Transmission Asymmetry',
        probability: 25,
        basis: ['Delaying action to inspect broadcast headers'],
      },
      {
        id: 'kira_with_police_leak',
        label: 'Impulsive Kira Prone to Egotistical Rage',
        probability: 25,
        basis: ['Kira cannot stand being publicly insulted as evil'],
      },
    ],
  },
  tests: [
    // Phase 1: The Provocation Reaction
    {
      id: 'test_broadcast_reaction',
      triggerTurn: 1,
      name: 'The Live Provocation',
      description: 'Tailor leans closer to the microphone, sneering into the lens.',
      opponentGoal: 'Force an instantaneous emotional response from Kira.',
      evaluatedCriteria:
        'Writing the name on screen immediately proves Kira is watching this specific channel and can kill from afar.',
      responses: [
        {
          intentMatches: ['write', 'death note', 'kill', 'lind l tailor', 'pen'],
          narrativeOutcome:
            'You drag the notebook toward you, uncapping your black pen. You scrawl: "Lind L. Tailor". Forty seconds later on screen, Tailor suddenly clutches his chest, gasps violently for breath, and collapses face-first across the microphone with a sickening crack.',
          opponentReaction:
            'A cold digital font cuts across the screen: "I HAD TO TEST THIS TO BE CERTAIN. KIRA... YOU REALLY DO EXIST, AND YOU ARE CURRENTLY LOCATED IN THE KANTŌ REGION OF JAPAN."',
          suspicionDelta: 60,
        },
        {
          intentMatches: ['channel', 'switch', 'osaka', 'regional', 'remote', 'guide'],
          narrativeOutcome:
            'You grab the remote control and flip between regional relays. On NHK General Kantō, the broadcast is live. On the Osaka satellite feed, a baseball game plays uninterrupted. On Hokkaido TV, an anime rerun continues normally. This broadcast is strictly local!',
          opponentReaction:
            'Across the regional network, no unusual signal spikes occur. L’s monitors show Kantō viewership steadily rising.',
          suspicionDelta: -10,
          revealsFact: 'The broadcast is a localized Kantō feed, NOT a worldwide broadcast.',
        },
        {
          intentMatches: ['observe', 'silence', 'wait', 'watch', 'motionless'],
          narrativeOutcome:
            'You sit back, arms crossed, analyzing the lighting and the subtle latency delay on Tailor’s lapel microphone. Why would the most elusive detective in world history reveal his face on commercial television?',
          opponentReaction:
            'On screen, Tailor continues his speech for two full minutes without interruption.',
          suspicionDelta: -5,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'Tailor’s televised voice echoes through the quiet living room.',
        opponentReaction:
          'The broadcast continues to transmit uninterrupted.',
        suspicionDelta: 0,
      },
    },

    // Phase 2: The Signal Analysis
    {
      id: 'test_signal_analysis',
      triggerTurn: 2,
      name: 'Broadcast Dissection',
      description: 'The broadcast reaches minute five without a heart attack.',
      opponentGoal: 'Evaluate if Kira takes the bait on the secondary broadcast loop.',
      evaluatedCriteria:
        'L plans to cycle through other prefectures if Kantō fails.',
      responses: [
        {
          intentMatches: ['phone', 'call', 'osaka', 'cousin', 'check other city'],
          narrativeOutcome:
            'You pick up the receiver and casually call your acquaintance in Nagoya: "Hey, are you seeing this strange Interpol broadcast?" They reply with complete confusion: "What Interpol broadcast? We’re watching the variety special."',
          opponentReaction:
            'The regional test remains totally blind to your telephone query.',
          suspicionDelta: -5,
        },
        {
          intentMatches: ['laugh', 'smirk', 'trap', 'decoy', 'obvious'],
          narrativeOutcome:
            'A quiet, cold smile touches your lips: "A death row decoy... broadcast only to Kantō. If I had written his name, you would have pinpointed my prefecture within forty seconds. Nice try, L."',
          opponentReaction:
            'The silence in the room remains absolute. The screen transitions to commercial break.',
          suspicionDelta: -8,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The speaker finishes his statement and stands, bowing to the press gallery.',
        opponentReaction:
          'The television studio cuts back to the anchor desk.',
        suspicionDelta: 0,
      },
    },

    // Phase 3: The Aftermath
    {
      id: 'test_aftermath_reflection',
      triggerTurn: 3,
      name: 'Aftermath of the Broadcast',
      description: 'The broadcast concludes. Tailor walks off stage completely unharmed.',
      opponentGoal: 'Assess if the regional trap bore fruit.',
      evaluatedCriteria:
        'If Tailor is alive, L cannot prove Kira is in Kantō or even that Kira exists as a supernatural entity.',
      responses: [
        {
          intentMatches: ['routine', 'homework', 'turn off tv', 'close notebook'],
          narrativeOutcome:
            'You click the remote to turn off the television set, close your college prep binder, and head downstairs to join your mother and sister for dinner.',
          opponentReaction:
            'In the mobile ICPO telemetry trailer, L stares at the static monitor: "No reaction in Kantō. He either did not watch, or he deduced the transmission filter instantly."',
          suspicionDelta: -10,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The television screen goes dark, leaving only your faint reflection on the glass tube.',
        opponentReaction:
          'The broadcast transmission wraps up with zero telemetry leads.',
        suspicionDelta: 0,
      },
    },
  ],
  endingConditions: [
    {
      id: 'end_broadcast_trap_triggered',
      condition: (state: any) => state.opponentState.suspicionScore >= 80,
      verdict: 'decoy_trap_triggered',
      verdictTitle: 'BAIT TAKEN // KANTŌ REGIONAL COORDINATE COMPROMISED',
      summary:
        'You succumbed to egotistical anger and executed Lind L. Tailor on live air. L immediately hijacked the transmission to inform you that Tailor was a condemned death row convict and that the broadcast was only shown in the Kantō region of Japan.',
      narrativeConclusion:
        'On screen, the letter "L" appears in Old English calligraphy: "Kira... I never imagined it would be this easy. You are in the Kantō region of Japan. The net is closing."',
    },
    {
      id: 'end_master_decoy_evasion',
      condition: (state: any) => state.turnNumber >= 4 && state.opponentState.suspicionScore <= 30,
      verdict: 'flawless_concealment',
      verdictTitle: 'TRAP NEUTRALIZED // OPPONENT REMAINING BLIND',
      summary:
        'You saw through the broadcast asymmetry with cold calculation. By letting Lind L. Tailor live, you deprived L of any geographic telemetry. L must now broadcast across 47 prefectures at catastrophic financial cost with zero confirmed results.',
      narrativeConclusion:
        'In the secret Tokyo command center, L drops three sugar cubes into his cup, staring into the dark: "He didn’t take the bait. Kira is either extraordinarily disciplined... or someone with access to broadcast distribution networks."',
    },
    {
      id: 'end_neutral_resolution',
      condition: (state: any) => state.turnNumber >= 4,
      verdict: 'tactical_stalemate',
      verdictTitle: 'BROADCAST EVADED // INVESTIGATION EXTENDED',
      summary:
        'You avoided the fatal mistake of killing Tailor, though the encounter confirmed to the world that an active global manhunt is officially underway.',
      narrativeConclusion:
        'The news resumes normal programming. The psychological board has been established, but neither player has yielded ground.',
    },
  ],
  maxTurns: 4,
  groundTruthData: {
    fullStory:
      'Lind L. Tailor was a convicted felon scheduled for secret execution. L arranged for him to impersonate the lead investigator on a broadcast aired EXCLUSIVELY in the Kantō region of Japan. If Kira killed him, L would confirm: 1) Kira exists, 2) Kira can kill at a distance, and 3) Kira resides in the Kantō region.',
    opponentMasterPlan:
      'Provoke Kira’s pride. Kira cannot abide being called "evil" and will kill the speaker to prove godhood. When Tailor dies, trigger the L broadcast on the same regional frequency.',
    clueAudits: [
      {
        code: 'EVD-401',
        title: 'LIND L. TAILOR IDENTITY',
        nature: 'deliberately_staged',
        playerPerspective: 'Arrogant ICPO official claiming to be L.',
        actualFact:
          'Condemned murderer whose death had zero legal consequence to the task force. A disposable pawn.',
      },
      {
        code: 'EVD-402',
        title: 'WORLDWIDE BROADCAST CLAIM',
        nature: 'misleading',
        playerPerspective: 'Worldwide simultaneous transmission across all satellites.',
        actualFact:
          'Transmitted solely through Kantō terrestrial relay antennas. Kansai and other regions saw standard programming.',
      },
    ],
    alternativePaths: [
      {
        title: 'Executing Lind L. Tailor on Television',
        description: 'Writing Tailor’s name during the 40-second window.',
        potentialOutcome:
          'Catastrophic blunder. Confirms your physical presence in Kantō and validates L’s hypothesis that Kira is childish and hates to lose.',
      },
      {
        title: 'Checking Kansai & Hokkaido Feeds',
        description: 'Cycling through satellite channels to verify broadcast geography.',
        potentialOutcome:
          'Instantly exposes the trap. Knowing the broadcast is localized to Kantō allows you to smile and do nothing, completely paralyzing L’s gambit.',
      },
      {
        title: 'Complete Silence and Indifference',
        description: 'Turning off the television and eating dinner.',
        potentialOutcome:
          'Leaves L completely empty-handed. No regional data, no confirmed murder mechanism, no psychological victory.',
      },
    ],
  },
};
