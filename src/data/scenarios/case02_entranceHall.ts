// CASE-02: THE TO-OH ENTRANCE HALL (THE CROSS-EXAMINATION)
// Scope: Spoiler-safe (Episode 1-8 dynamics). Intellectual duel with "Hideki Ryuga".

import { ScenarioDefinition } from '../../types/scenario';

export const case02_entranceHall: ScenarioDefinition = {
  id: 'case_02_entrance_hall',
  code: 'CASE-02',
  title: 'THE TO-OH ENTRANCE HALL',
  subtitle: 'Psychological Inquest Disguised as Academic Camaraderie',
  difficulty: 'HEIGHTENED',
  briefing: {
    background:
      'Tokyo, April 2004. You are seated in the monumental lecture auditorium of To-Oh University for the freshman matriculation ceremony. Having secured a perfect entrance score, you are scheduled to deliver the representative student address.',
    playerObjective:
      'Engage in dialogue with the student beside you without displaying arrogance, suppressed malice, or unreleased police knowledge. Maintain the persona of an upright academic prodigy.',
    apparentSituation:
      'A fellow student with unruly black hair, shadowed eyes, and a hunched posture sits beside you. He introduces himself with the name of a famous idol: "Hideki Ryuga".',
    criticalWarning:
      'Your interlocutor is an intellectual razor. He will deploy deliberate factual errors regarding recent criminal deaths. Correcting a detail only present in confidential NPA files will be fatal.',
  },
  initialPlayerContext: {
    date: '08 APRIL 2004',
    time: '10:15 JST',
    location: 'TO-OH UNIVERSITY - MAIN AUDITORIUM',
    role: 'CO-REPRESENTATIVE FRESHMAN (KIRA)',
    knownFacts: [
      'You tied for first place in the national entrance examinations with 100% in all subjects.',
      'One other student achieved the exact same perfect score.',
      'Last night, you skimmed your father’s briefcase files: the heart attack death of criminal Shingo Takahashi was timestamped at 14:00 JST, but the television news reported it as 15:30 JST to protect the investigating precinct.',
      'You are dressed in formal student attire.',
    ],
    resources: [
      'MATRICULATION SPEECH NOTES (HANDWRITTEN)',
      'STUDENT IDENTIFICATION CARD',
      'FOUNTAIN PEN (BLUE-BLACK INK)',
      'NO DEATH NOTE SHEETS PRESENT (CONCEALED SAFELY AT HOME)',
    ],
    relationships: [
      {
        name: 'HIDEKI RYUGA',
        role: 'FELLOW TOP STUDENT / UNKNOWN ADVERSARY',
        status: 'SEATED ADJACENT IN ROW 4',
        credibility: 'suspect',
        knownToPlayer: 'Uses an obvious celebrity pseudonym. Slouched posture, intense analytical gaze.',
        hiddenAgenda: 'L, investigating whether Light Yagami has the psychological profile of Kira.',
      },
      {
        name: 'DEAN OF ADMISSIONS',
        role: 'FACULTY OFFICIAL',
        status: 'AT PODIUM',
        credibility: 'credible',
        knownToPlayer: 'Presiding over matriculation proceedings.',
      },
    ],
  },
  initialNarrative: [
    {
      id: 'case02-init-1',
      timestamp: '10:15 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'The auditorium hums with the low murmur of eight hundred dressed freshmen and faculty members. Warm spring sunlight cuts through towering stained-glass windows.',
    },
    {
      id: 'case02-init-2',
      timestamp: '10:15 JST',
      turnNumber: 0,
      type: 'observation',
      content:
        'To your immediate left sits the other co-valedictorian. His posture is slumped, knees drawn slightly toward his chest, fingers toying with a cellophane wrapper. He turns his head slowly; dark bags underline eyes of unnerving stillness.',
    },
    {
      id: 'case02-init-3',
      timestamp: '10:15 JST',
      turnNumber: 0,
      type: 'dialogue',
      speaker: 'HIDEKI RYUGA',
      speakerRole: 'Fellow Student',
      content:
        '"Yagami-kun. It is quite an honor to share the podium with you today. Tell me... when you read about Kira in the papers, do you feel admiration or disgust?"',
    },
  ],
  initialEvidence: [
    {
      id: 'evd-201',
      code: 'EVD-201',
      title: 'PSEUDONYM ALIAS',
      description: 'The student introduced himself as "Hideki Ryuga"—the exact name of a famous Japanese pop star.',
      source: 'Verbal Introduction',
      discoveredTurn: 0,
      isConfirmed: true,
      nature: 'deliberately_staged',
    },
    {
      id: 'evd-202',
      code: 'EVD-202',
      title: 'CONFIDENTIAL TIMING FILE',
      description: 'NPA internal log: Takahashi died at 14:00 JST. Public media: Takahashi died at 15:30 JST.',
      source: 'Father’s Briefcase (Prior Night)',
      discoveredTurn: 0,
      isConfirmed: true,
      nature: 'genuine',
    },
  ],
  initialTimeline: [
    {
      id: 'tl-201',
      timestamp: '10:00 JST',
      turnNumber: 0,
      label: 'CEREMONY COMMENCEMENT',
      summary: 'Seated in front row reserved for honors co-representatives.',
      significance: 'routine',
    },
    {
      id: 'tl-202',
      timestamp: '10:15 JST',
      turnNumber: 0,
      label: 'INITIAL PROBE',
      summary: 'Ryuga poses direct philosophical query regarding moral stance on Kira.',
      significance: 'elevated',
    },
  ],
  suggestedActions: [
    {
      id: 'sug-201',
      label: 'MEASURED LAW-AND-ORDER RESPONSE',
      actionText: 'State calmly that murder cannot be justified by any individual outside the judicial framework.',
      category: 'verbal',
    },
    {
      id: 'sug-202',
      label: 'COUNTER-QUESTION HIS VIEW',
      actionText: 'Ask him how he personally views Kira before answering.',
      category: 'verbal',
    },
    {
      id: 'sug-203',
      label: 'DEFLECT TOWARD MATRICULATION',
      actionText: 'Remind him politely that the ceremony is starting and focus on reviewing speech notes.',
      category: 'tactical',
    },
    {
      id: 'sug-204',
      label: 'EXPRESS PASSIONATE HOSTILITY',
      actionText: 'Denounce Kira as an evil terrorist who threatens the fabric of Japanese society.',
      category: 'verbal',
    },
  ],
  opponentConfig: {
    name: 'RYUGA (L)',
    apparentRole: 'Co-Valedictorian Student',
    trueRole: 'L, Lead Investigator for ICPO Task Force',
    initialObjective:
      'Test Light Yagami’s psychological equilibrium and detect any slip revealing non-public police intelligence.',
    initialSuspicionScore: 35,
    initialKnowledge: [
      'Light is the son of Director Soichiro Yagami.',
      'Light exhibits genius-level intellect matching Kira’s criminal profile.',
      'Only someone with direct NPA database access knew Takahashi died at 14:00.',
    ],
    initialHypotheses: [
      {
        id: 'civilian_student',
        label: 'Genuinely Brilliant Law Student',
        probability: 60,
        basis: ['Perfect entrance exam scores', 'No criminal record'],
      },
      {
        id: 'hyper_vigilant_suspect',
        label: 'Arrogant Intellectual with Kira Ideology',
        probability: 30,
        basis: ['Over-controlled facial expressions'],
      },
      {
        id: 'kira_with_police_leak',
        label: 'Kira Operating with NPA Home Terminal',
        probability: 10,
        basis: ['Timing of earlier killings correlated with police data updates'],
      },
    ],
  },
  tests: [
    // Phase 1: The Moral Philosophy Probe
    {
      id: 'test_moral_probe',
      triggerTurn: 1,
      name: 'The Moral Philosophy Probe',
      description: 'Ryuga awaits your stance on Kira’s legitimacy.',
      opponentGoal: 'Evaluate if target shows narcissistic pride or defensive rationalization.',
      evaluatedCriteria:
        'A model law student naturally cites legal precedent and judicial due process without fanatical righteousness or hidden satisfaction.',
      responses: [
        {
          intentMatches: ['law', 'judicial', 'murder', 'crime', 'justice', 'measured'],
          narrativeOutcome:
            'You adjust your speech notes and reply evenly: "Kira is a murderer, Ryuga-kun. Regardless of how one views crime rates, allowing a single individual to execute vigilante justice destroys the rule of law. My father dedicated his life to the police; I intend to uphold that tradition."',
          opponentReaction:
            'Ryuga tilts his head, rubbing his thumb along his lower lip. "A textbook answer. Perfectly structured. You speak with great filial devotion."',
          suspicionDelta: -5,
        },
        {
          intentMatches: ['evil', 'terrorist', 'hate', 'passionate'],
          narrativeOutcome:
            'You lean in with intense conviction, declaring that Kira is unmitigated evil and must be executed at all costs.',
          opponentReaction:
            'Ryuga’s pupils dilate slightly. "Such visceral anger for an abstract news topic. Most students treat Kira with cynical fascination."',
          suspicionDelta: 12,
        },
        {
          intentMatches: ['counter', 'how about you', 'what do you think'],
          narrativeOutcome:
            'You smile faintly: "Before I answer, what prompted the question? I would have expected a fellow valedictorian to be thinking about campus seminars."',
          opponentReaction:
            'Ryuga blinks twice, a ghost of an amused smirk touching the corner of his mouth. "Touché, Yagami-kun."',
          suspicionDelta: -2,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'You offer a restrained response, letting the auditorium ambience absorb the conversational tension.',
        opponentReaction:
          'Ryuga taps his fingernail against the wooden desk, observing your throat and pulse point.',
        suspicionDelta: 2,
      },
    },

    // Phase 2: The Takahashi Factual Bait (The Critical Trap)
    {
      id: 'test_takahashi_bait',
      triggerTurn: 2,
      name: 'The Takahashi Timeline Trap',
      description: 'Ryuga introduces a deliberate factual contradiction regarding a recent death.',
      opponentGoal: 'Trap the subject into referencing internal NPA records not available to the public.',
      evaluatedCriteria:
        'The public thinks Takahashi died at 15:30. Only NPA task force members know he died at 14:00.',
      responses: [
        {
          intentMatches: ['14:00', 'two o\'clock', 'actually at 14', 'earlier', 'npa file', 'database'],
          narrativeOutcome:
            'You speak with analytical precision: "Actually, Ryuga-kun, that is incorrect. Takahashi didn’t die at 15:30; the cardiac arrest was certified at 14:00 JST."',
          opponentReaction:
            'Ryuga’s body freezes completely. He slowly lowers his hand from his chin, his dark eyes fixing upon your face with predatory stillness. "Interesting. The television and newspapers explicitly stated 15:30. That detail was strictly confidential within police headquarters."',
          suspicionDelta: 50,
        },
        {
          intentMatches: ['news', 'television', '15:30', 'papers said', 'as reported'],
          narrativeOutcome:
            'You remark casually: "If you are referring to yesterday’s broadcast, the news reported his collapse at 15:30 outside the Shinjuku arcade. Why do you bring him up?"',
          opponentReaction:
            'Ryuga watches your eyelids for micro-tremors, finding only the accurate recall of a media consumer. "Ah. Yes. 15:30. My mistake. My memory must be slipping."',
          suspicionDelta: -8,
        },
        {
          intentMatches: ['ignore', 'silence', 'don\'t know', 'unfamiliar', 'not interested'],
          narrativeOutcome:
            'You shake your head with polite detachment: "I don’t follow every minor tabloid crime report. My focus has been on the administrative law syllabus."',
          opponentReaction:
            'Ryuga nods faintly, chewing on a thumbnail. "Of course. How pragmatic."',
          suspicionDelta: -4,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'You handle the inquiry with cautious ambiguity, avoiding definitive statements.',
        opponentReaction:
          'Ryuga remains silent for three seconds before shifting his gaze to the podium.',
        suspicionDelta: 3,
      },
    },

    // Phase 3: The Handshake & Eye Contact
    {
      id: 'test_podium_invitation',
      triggerTurn: 3,
      name: 'The Podium Call',
      description: 'The Dean calls the two student representatives to the stage.',
      opponentGoal: 'Observe physical autonomic responses (sweat, heart rate, tremors).',
      evaluatedCriteria:
        'Standing together under stage spotlights tests physical composure and somatic tells.',
      responses: [
        {
          intentMatches: ['stand', 'walk', 'poised', 'calm', 'stage', 'lead'],
          narrativeOutcome:
            'You stand gracefully, smoothing the lapels of your blazer, and gesture for him to proceed first with customary Japanese academic courtesy.',
          opponentReaction:
            'Ryuga rises with an awkward slouch, hands stuffed deep into his pockets. "After you, Yagami-kun."',
          suspicionDelta: -4,
        },
        {
          intentMatches: ['hesitate', 'nervous', 'flustered', 'stumble'],
          narrativeOutcome:
            'You hesitate for a fraction of a second, gripping your papers with slightly tight knuckles before rising.',
          opponentReaction:
            'Ryuga glances at the impression left by your fingers on the parchment paper.',
          suspicionDelta: 10,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'Both of you step out into the center aisle toward the marble steps of the stage.',
        opponentReaction:
          'Ryuga walks with silent, padded steps beside you.',
        suspicionDelta: 0,
      },
    },

    // Phase 4: The Revelation Probe
    {
      id: 'test_whispered_whisper',
      triggerTurn: 4,
      name: 'The Whispered Declaration',
      description: 'At the foot of the podium stairs, Ryuga leans in and whispers six words.',
      opponentGoal: 'Deliver maximum psychological shock: "I am L."',
      evaluatedCriteria:
        'Kira would experience acute internal alarm, calculating how to kill him or searching for a Death Note. Light must react with the bewildered confusion of an ordinary student hearing a ridiculous claim.',
      responses: [
        {
          intentMatches: ['who?', 'are you joking', 'l?', 'confused', 'smile', 'ridiculous', 'baffled'],
          narrativeOutcome:
            'You stop on the third step, looking at him with genuine intellectual disbelief, then chuckle softly: "You’re claiming to be the famous detective L? Is this a psychological prank to throw off my address, Ryuga-san?"',
          opponentReaction:
            'Ryuga examines your facial symmetry. You did not flinch, look around for security cameras, or ask for his real name. "Perhaps it is. Good luck with the address."',
          suspicionDelta: -10,
        },
        {
          intentMatches: ['kill', 'death note', 'write', 'how', 'name', 'real name'],
          narrativeOutcome:
            'A shadow crosses your features as you stare intensely at him, your mind racing to deduce whether his face and name match the rules of the notebook.',
          opponentReaction:
            'Ryuga’s gaze pierces through you. "Your eyes just hardened, Yagami-kun. As if calculating a fatal equation."',
          suspicionDelta: 35,
        },
        {
          intentMatches: ['ignore', 'silence', 'continue walking', 'say nothing'],
          narrativeOutcome:
            'You proceed up the stairs in cold, stony silence without acknowledging his whisper.',
          opponentReaction:
            'Ryuga notes your unnatural refusal to react to such an outrageous claim. "An innocent student would at least ask if I was insane."',
          suspicionDelta: 15,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The auditorium lights glint off the polished mahogany podium as the microphone crackles.',
        opponentReaction:
          'Ryuga takes his place beside you, unmoving.',
        suspicionDelta: 2,
      },
    },
  ],
  endingConditions: [
    {
      id: 'end_npa_leak_fatal',
      condition: (state: any) => state.opponentState.suspicionScore >= 75,
      verdict: 'critical_exposure',
      verdictTitle: 'FATAL INTELLIGENCE LEAK // IDENTITY ALL BUT PROVEN',
      summary:
        'By confirming details known only to the task force, you proved beyond statistical doubt that you possess illegal access to confidential police databases. Ryuga (L) has confirmed you as the primary Kira candidate.',
      narrativeConclusion:
        'As you finish the speech, Ryuga whispers in the wings: "Thank you for the verification, Light. Your father will be deeply saddened."',
    },
    {
      id: 'end_master_deflection',
      condition: (state: any) => state.turnNumber >= 5 && state.opponentState.suspicionScore <= 28,
      verdict: 'flawless_concealment',
      verdictTitle: 'MASTER EQUILIBRIUM // ADVERSARY PERPLEXED',
      summary:
        'You reacted with absolute psychological poise, neither revealing illegal knowledge nor failing the behavioral baseline of an elite student. L is forced to admit your probability rating remains below 5%.',
      narrativeConclusion:
        'The auditorium erupts into applause as your address concludes. Ryuga applauds slowly with limp hands, his expression one of profound, unsatisfied curiosity.',
    },
    {
      id: 'end_tense_draw',
      condition: (state: any) => state.turnNumber >= 5,
      verdict: 'tactical_stalemate',
      verdictTitle: 'PROTRACTED STALEMATE // WAR OF ATTRITION',
      summary:
        'You gave nothing decisive away, but Ryuga’s razor instincts detect that your composure is too immaculate. You have entered a direct game of cat and mouse.',
      narrativeConclusion:
        'Stepping off the stage, Ryuga slips his hands into his pockets: "We should play tennis sometime, Yagami-kun. I believe we have much to discuss."',
    },
  ],
  maxTurns: 5,
  groundTruthData: {
    fullStory:
      'The student beside you was indeed L, operating under the alias Hideki Ryuga. He chose to enroll openly at To-Oh specifically to inspect Light Yagami face-to-face. His main weapon was the Takahashi murder timestamp trap: testing if Light possessed insider knowledge from Soichiro Yagami’s home files.',
    opponentMasterPlan:
      'Drop confidential bait. If Light corrects the 15:30 press report with the true 14:00 time, he is 100% Kira. If he whispers a threat or seeks Ryuga’s real name, suspicion spikes. If he acts like an ordinary honors student bewildered by a strange classmate, suspicion drops.',
    clueAudits: [
      {
        code: 'EVD-201',
        title: 'HIDEKI RYUGA PSEUDONYM',
        nature: 'deliberately_staged',
        playerPerspective: 'Suspected an arrogant prank or a test to see if Kira would attempt to kill him.',
        actualFact:
          'L chose this name deliberately so that if Kira attempted to write "Hideki Ryuga" in the notebook, the famous pop star would die instead, proving Kira’s identity!',
      },
      {
        code: 'EVD-202',
        title: 'TAKAHASHI TIME CONFLICT',
        nature: 'deliberately_staged',
        playerPerspective: 'A factual discrepancy in criminal reporting.',
        actualFact:
          'A precision trap set by L. Media broadcasts were deliberately falsified to test for internal police database leaks.',
      },
    ],
    alternativePaths: [
      {
        title: 'The Police Database Trap',
        description: 'Correcting Ryuga that Takahashi died at 14:00 JST.',
        potentialOutcome:
          'Instant tactical defeat. There was no public record of 14:00 anywhere in Japan. It would prove you read your father’s locked task force files.',
      },
      {
        title: 'Concealing Emotion upon "I am L"',
        description: 'Reacting with cold robotic silence.',
        potentialOutcome:
          'Paradoxically suspicious: any human freshman told that their classmate is the world’s top detective would express shock or laugh at the absurdity.',
      },
      {
        title: 'The Natural Laugh and Dismissal',
        description: 'Treating the "I am L" statement as an eccentric academic joke.',
        potentialOutcome:
          'The ideal psychological maneuver. Deprives L of any emotional tremor while fitting the persona of a confident high achiever.',
      },
    ],
  },
};
