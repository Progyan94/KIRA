// CASE-01: THE SHINJUKU TRANSIT ENCOUNTER (THE TAIL)
// Scope: Spoiler-safe (Episode 1-8 dynamics). Original narrative implementation.

import { ScenarioDefinition } from '../../types/scenario';

export const case01_shinjukuTail: ScenarioDefinition = {
  id: 'case_01_shinjuku_tail',
  code: 'CASE-01',
  title: 'THE SHINJUKU TRANSIT ENCOUNTER',
  subtitle: 'Surveillance Evasion under Dense Pedestrian Load',
  difficulty: 'STANDARD',
  briefing: {
    background:
      'Tokyo, 24 November 2003. You have just exited Daiei Prep School in Shinjuku. In your inner blazer pocket rests an ordinary college-ruled notebook containing four concealed loose sheets of the Death Note.',
    playerObjective:
      'Neutralize the tail’s suspicion without confirming that you are aware of being followed. Preserve the absolute secrecy of the notebook.',
    apparentSituation:
      'A tall male in a charcoal trench coat has matched your cadence for the last 300 meters across the south concourse of Shinjuku Station.',
    criticalWarning:
      'Any abrupt confrontation or erratic detour will be cataloged as hyper-vigilance. Ordinary students do not inspect reflections or bolt down stairwells.',
  },
  initialPlayerContext: {
    date: '24 NOVEMBER 2003',
    time: '17:35 JST',
    location: 'SHINJUKU STATION - SOUTH CONCOURSE',
    role: 'HONORS HIGH SCHOOL SENIOR (KIRA)',
    knownFacts: [
      'Your father is a senior director in the National Police Agency (NPA).',
      'The ICPO has recently discussed dispatching international liaisons to Tokyo.',
      'You are returning home along your standard weekday route.',
      'Four trimmed sheets of the black notebook are folded flat in your breast pocket.',
    ],
    resources: [
      'STUDENT COMMUTER PASS (SUICA/MAGNETIC)',
      'SHARP 0.5MM MECHANICAL PENCIL',
      'CONCEALED NOTEBOOK LEAFLETS (4 SHEETS)',
      'CELLULAR FLIP PHONE (UNLOCKED)',
      'PREP SCHOOL MOCK EXAM SYLLABUS',
    ],
    relationships: [
      {
        name: 'SOICHIRO (FATHER)',
        role: 'NPA TASK FORCE DIRECTOR',
        status: 'AT HEADQUARTERS',
        credibility: 'credible',
        knownToPlayer: 'Believes his son is solely focused on Tokyo University entrance exams.',
        hiddenAgenda: 'Has unknowingly provided Kira with indirect proximity to police movements.',
      },
      {
        name: 'MAN IN CHARCOAL COAT',
        role: 'PEDESTRIAN / POTENTIAL OBSERVER',
        status: 'TRAILING AT 15 PACES',
        credibility: 'suspect',
        knownToPlayer: 'Caucasian male, approximately 30 years old, carrying Japanese daily newspaper.',
        hiddenAgenda: 'FBI Agent Mark Parker, assigned to discreetly vet NPA households.',
      },
    ],
  },
  initialNarrative: [
    {
      id: 'case01-init-1',
      timestamp: '17:35 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'The November dusk descends early over Shinjuku. Fluorescent light floods through the glass atrium of the South Concourse, reflecting off polished grey granite tiles.',
    },
    {
      id: 'case01-init-2',
      timestamp: '17:35 JST',
      turnNumber: 0,
      type: 'observation',
      content:
        'A sea of dark umbrellas and salaryman raincoats surges toward the automated ticket barriers. Fifteen paces behind your right shoulder, footsteps sync precisely with your own.',
    },
    {
      id: 'case01-init-3',
      timestamp: '17:35 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'In the darkened plate-glass display of the Kinokuniya annex to your left, you catch the silhouette: Western build, charcoal trench coat, eyes leveled unblinkingly at the center of your back. He does not carry a commuter bag.',
    },
  ],
  initialEvidence: [
    {
      id: 'evd-01',
      code: 'EVD-01',
      title: 'TRENCH COAT OBSERVER',
      description: 'Male, Caucasian, ~182cm, dark charcoal coat, holding folded copy of Tokyo Shimbun.',
      source: 'Kinokuniya Storefront Glass Reflection',
      discoveredTurn: 1,
      isConfirmed: true,
      nature: 'genuine',
    },
    {
      id: 'evd-02',
      code: 'EVD-02',
      title: 'TIMING IRREGULARITY',
      description: 'Pacing matched your deceleration outside cram school gate at exactly 17:31 JST.',
      source: 'Pedestrian Observation',
      discoveredTurn: 1,
      isConfirmed: false,
      nature: 'genuine',
    },
  ],
  initialTimeline: [
    {
      id: 'tl-01',
      timestamp: '17:30 JST',
      turnNumber: 0,
      label: 'DEPARTURE',
      summary: 'Exited Daiei Prep School following three-hour national mock exam.',
      significance: 'routine',
    },
    {
      id: 'tl-02',
      timestamp: '17:34 JST',
      turnNumber: 0,
      label: 'SURVEILLANCE IDENTIFIED',
      summary: 'Confirmed single-operative foot tail mirroring trajectory.',
      significance: 'elevated',
    },
  ],
  suggestedActions: [
    {
      id: 'sug-1',
      label: 'GLANCE AT BOOKSTORE WINDOW',
      actionText: 'Pause naturally by the bookstore window display and check his reflection in the glass.',
      category: 'observational',
    },
    {
      id: 'sug-2',
      label: 'MAINTAIN ROUTINE WALK',
      actionText: 'Continue toward the Yamanote Line ticket gates without breaking pace or looking back.',
      category: 'tactical',
    },
    {
      id: 'sug-3',
      label: 'CHECK TRAIN TIMETABLE',
      actionText: 'Stop casually under the overhead transit monitor to check the rapid service departures.',
      category: 'tactical',
    },
    {
      id: 'sug-4',
      label: 'FEIGN DROPPING STATIONERY',
      actionText: 'Reach into bag as if retrieving a commuter pass and observe whether he stops or bypasses.',
      category: 'observational',
    },
  ],
  opponentConfig: {
    name: 'AGENT PARKER',
    apparentRole: 'Unidentified Pedestrian in Dark Coat',
    trueRole: 'FBI Special Agent Mark Parker (dispatched under clandestine ICPO agreement)',
    initialObjective:
      'Establish whether student Light Yagami exhibits guilt indicators, unprompted vigilance, or unverified contacts.',
    initialSuspicionScore: 20,
    initialKnowledge: [
      'Subject is top-ranked national high school student.',
      'Subject is son of NPA Task Force Director Soichiro Yagami.',
      'Assigned to vet five separate households linked to senior police officials.',
    ],
    initialHypotheses: [
      {
        id: 'civilian_student',
        label: 'Ordinary Honors Student with Cram Routine',
        probability: 75,
        basis: ['Standard route from cram school', 'Wearing official school blazer'],
      },
      {
        id: 'hyper_vigilant_suspect',
        label: 'Subject Conscious of Surveillance',
        probability: 20,
        basis: ['Slight pace modulation outside prep school exit'],
      },
      {
        id: 'kira_with_police_leak',
        label: 'Kira Operative Utilizing NPA Intelligence',
        probability: 5,
        basis: ['Theoretical possibility due to father’s station'],
      },
    ],
  },
  tests: [
    // Phase 1: Storefront Window / Pacing Probe
    {
      id: 'test_pacing_probe',
      triggerTurn: 1,
      name: 'Pacing Modulation Test',
      description: 'The agent tests whether your deceleration triggers a visible flinch or check-back.',
      opponentGoal: 'Detect unnatural glance angles or paranoid route deviations.',
      evaluatedCriteria:
        'Normal commuters do not turn around 180 degrees upon slowing down. Stopping at a storefront is natural.',
      responses: [
        {
          intentMatches: ['observation', 'indirect_surveillance', 'reflection', 'bookstore', 'window'],
          narrativeOutcome:
            'You pause before the Kinokuniya window display, studying the bestseller stack. In the reflection, the man in the trench coat slows smoothly, withdrawing a pocket transit map without looking directly at you.',
          opponentReaction:
            'He stops eight paces back near a public telephone pillar, eyes casually sweeping the overhead transit sign.',
          suspicionDelta: -2,
        },
        {
          intentMatches: ['overt_lookback', 'turn around', 'confrontation', 'challenge'],
          narrativeOutcome:
            'You turn your head directly back to lock eyes with the man. His gaze immediately flinches upward to the digital departure board, but his jaw tightens visibly.',
          opponentReaction:
            'He shifts the newspaper to his left hand, taking a deliberate step behind a structural concrete column.',
          suspicionDelta: 22,
        },
        {
          intentMatches: ['routine_transit', 'walk', 'maintain', 'feigned_normalcy'],
          narrativeOutcome:
            'You keep your eyes forward and maintain an unhurried, steady pace toward the automated gates. The rhythm of your footsteps blends seamlessly with the surrounding commuter tide.',
          opponentReaction:
            'The man maintains his fifteen-pace trailing interval, posture relaxed.',
          suspicionDelta: -4,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'Your subtle movement registers in the flow of the concourse. The man in the coat adjusts his gait to maintain visual sightlines.',
        opponentReaction:
          'He keeps his distance, newspaper tucked beneath his arm.',
        suspicionDelta: 0,
      },
    },

    // Phase 2: Decoy Distraction — Pickpocket Commotion
    {
      id: 'test_decoy_commotion',
      triggerTurn: 2,
      name: 'Unrelated Platform Commotion',
      description: 'A sudden shout echoes across the turnstiles: a transit officer chases a pickpocket.',
      opponentGoal: 'Evaluate if the subject over-reacts to law enforcement presence.',
      evaluatedCriteria:
        'An innocent student may look curiously at police commotion. A guilty suspect flinches defensively or clutches concealed items.',
      responses: [
        {
          intentMatches: ['silence', 'feigned_normalcy', 'ignore', 'routine_transit'],
          narrativeOutcome:
            'A transit guard shouts fifty meters ahead, sprinting after a man who leapt a turnstile. You glance toward the commotion with moderate, calm curiosity, then continue sliding your pass toward the reader.',
          opponentReaction:
            'The agent notes your measured reaction. You did not flinch, reach for your breast pocket, or alter your path.',
          suspicionDelta: -5,
          revealsFact: 'Commotion was an ordinary fare evader, entirely unrelated to the investigation.',
        },
        {
          intentMatches: ['concealment', 'pocket', 'notebook', 'hide'],
          narrativeOutcome:
            'At the sound of the officer’s whistle, your right hand instinctively clamps over the left breast of your blazer where the notebook leaves are folded.',
          opponentReaction:
            'Behind you, the agent’s eyes narrow sharply onto your chest pocket. He subtly adjusts his pocket pen to note the gesture.',
          suspicionDelta: 18,
        },
        {
          intentMatches: ['confrontation', 'run', 'flee', 'dash'],
          narrativeOutcome:
            'You accelerate abruptly toward the west corridor. The sharp change in speed instantly separates you from the leisurely pedestrian stream.',
          opponentReaction:
            'The agent breaks into a brisk, purposeful stride, his right hand slipping inside his trench coat.',
          suspicionDelta: 28,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The station alert blares briefly before fading into ambient rumble. You navigate the gate perimeter steadily.',
        opponentReaction:
          'The observer remains ten paces back, scanning your silhouette.',
        suspicionDelta: 1,
      },
    },

    // Phase 3: The Yamanote Platform & Timetable Bait
    {
      id: 'test_platform_transit',
      triggerTurn: 3,
      name: 'Boarding Maneuver',
      description: 'The green Yamanote train glides into Track 14. Chimes chime for door closure.',
      opponentGoal: 'Determine if target executes a last-second door jump to isolate the tail.',
      evaluatedCriteria:
        'Last-second boarding or leaping off just before door closure is classic counter-surveillance tradecraft.',
      responses: [
        {
          intentMatches: ['routine_transit', 'board', 'enter train', 'casual'],
          narrativeOutcome:
            'You board the third carriage alongside twelve other passengers, taking a spot near the center handrail with your school bag held before your knees.',
          opponentReaction:
            'The man boards through the adjacent door of the same car, standing near the opposite glass window with his back three-quarters turned.',
          suspicionDelta: -3,
          advancesLocation: 'YAMANOTE LINE - CARRIAGE 3 (OUTBOUND)',
        },
        {
          intentMatches: ['door jump', 'last second', 'feint', 'leap'],
          narrativeOutcome:
            'You wait until the electronic chime reaches its final cadence, then step sharply onto the train just as the rubber seals clamp shut.',
          opponentReaction:
            'The agent is caught outside on the platform. Through the sealed glass, his eyes lock onto yours with chilling certainty. He pulls out a cellular phone.',
          suspicionDelta: 30,
        },
        {
          intentMatches: ['wait', 'let train leave', 'stand on platform'],
          narrativeOutcome:
            'You calmly let the crowded train depart, standing patiently in the queue line painted on the yellow safety strip.',
          opponentReaction:
            'The man in the coat halts six paces away, checking his wristwatch and stepping into the adjacent waiting queue.',
          suspicionDelta: 2,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'You transition onto the train platform as the announcement chimes resonate overhead.',
        opponentReaction:
          'The tail maintains position through the crowd.',
        suspicionDelta: 0,
      },
    },

    // Phase 4: The In-Carriage Reflection & Identity Check
    {
      id: 'test_in_carriage_reflection',
      triggerTurn: 4,
      name: 'In-Carriage Proximity',
      description: 'Inside the humming electric carriage, the train accelerates into the dark tunnel.',
      opponentGoal: 'Observe whether subject inspects fellow riders or makes suspicious phone communications.',
      evaluatedCriteria:
        'Making encrypted calls or frantically writing in notebooks inside the train exposes operational panic.',
      responses: [
        {
          intentMatches: ['study', 'feigned_normalcy', 'syllabus', 'exam', 'read'],
          narrativeOutcome:
            'You unzip your school bag and retrieve your Daiei prep mock exam paper, quietly reviewing quadratic formulas in the reflection of the darkened tunnel window.',
          opponentReaction:
            'The agent observes the high test scores printed at the top of your paper (99th percentile). His posture softens into fatigue.',
          suspicionDelta: -8,
        },
        {
          intentMatches: ['phone', 'call', 'communication'],
          narrativeOutcome:
            'You retrieve your phone. If you dial, the silent carriage makes every whisper audible.',
          opponentReaction:
            'The agent immediately angles his ear, eyes fixed on your reflection in the tunnel glass.',
          suspicionDelta: 12,
        },
        {
          intentMatches: ['dialogue', 'confrontation', 'why are you following'],
          narrativeOutcome:
            'You turn inside the silent train car and ask him directly why he has been following you since Shinjuku.',
          opponentReaction:
            'The entire carriage falls dead silent. The man stares at you with absolute calm, then replies in accented Japanese: "I apologize, young man. I am merely heading to Ikebukuro."',
          suspicionDelta: 35,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The train sways across the rail switches approaching Shin-Okubo. Fluorescent tubes hum softly overhead.',
        opponentReaction:
          'The man in the trench coat remains motionless against the safety partition.',
        suspicionDelta: 0,
      },
    },
  ],
  endingConditions: [
    {
      id: 'end_critical_exposure',
      condition: (state: any) => state.opponentState.suspicionScore >= 80,
      verdict: 'critical_exposure',
      verdictTitle: 'SURVEILLANCE CONFIRMED // PRIORITY TARGET DESIGNATED',
      summary:
        'Your erratic maneuvers and confrontational gestures completely convinced Agent Parker that you are actively evading surveillance. He has filed an emergency request for full visual and electronic wiretapping of your household.',
      narrativeConclusion:
        'The train halts at Mejiro Station. As you step out, you catch the agent speaking rapidly into a micro-recorder in English: "Subject has confirmed situational hostility. Mark household 04 for immediate phase-two surveillance."',
    },
    {
      id: 'end_flawless_clear',
      condition: (state: any) => state.turnNumber >= 5 && state.opponentState.suspicionScore <= 22,
      verdict: 'flawless_concealment',
      verdictTitle: 'FLAWLESS CONCEALMENT // LEAD ABANDONED',
      summary:
        'You conducted yourself with the unassailable normalcy of an elite high school student. Agent Parker checked off your name as an unproductive lead, redirecting his investigation toward other police households.',
      narrativeConclusion:
        'At your home station, you alight among dozens of students and salarymen. Across the yellow line, Agent Parker remains aboard the carriage, calmly crossing a line through your dossier in his pocket notebook.',
    },
    {
      id: 'end_tactical_stalemate',
      condition: (state: any) => state.turnNumber >= 5,
      verdict: 'tactical_stalemate',
      verdictTitle: 'TACTICAL STALEMATE // DOSSIER REMAINS OPEN',
      summary:
        'You avoided fatal self-incrimination, but minor anomalies kept you on the potential suspect list. The investigation will continue under elevated caution.',
      narrativeConclusion:
        'You reach the quiet residential streets near your home. The footfalls behind you fade, but an icy intuition tells you the dossier has not been closed.',
    },
  ],
  maxTurns: 5,
  groundTruthData: {
    fullStory:
      'The man following you is FBI Special Agent Mark Parker (operating under secret ICPO directorate sanction). He was assigned to tail five separate families of the NPA task force to discover if Kira has an internal police conduit. He had zero proof that Light Yagami was Kira prior to this encounter.',
    opponentMasterPlan:
      'Evaluate whether the target reacts to tailing. If target panics or exhibits counter-surveillance tactics, escalate to 24/7 wiretaps. If target behaves like an ordinary diligent student, close the file.',
    clueAudits: [
      {
        code: 'EVD-01',
        title: 'TRENCH COAT OBSERVER',
        nature: 'genuine',
        playerPerspective: 'Suspected either task force detective, police liaison, or L himself.',
        actualFact: 'FBI Special Agent Mark Parker, executing a preliminary vetting assignment.',
      },
      {
        code: 'EVD-02',
        title: 'STATION PICKPOCKET COMMOTION',
        nature: 'unrelated',
        playerPerspective: 'Could have been a staged police provocation to force a reaction.',
        actualFact:
          'Entirely coincidental transit fare evader and petty thief. No link to the task force.',
      },
      {
        code: 'EVD-03',
        title: 'TOKYO SHIMBUN NEWSPAPER',
        nature: 'misleading',
        playerPerspective: 'Looked like an intelligence disguise used to hide a camera lens.',
        actualFact:
          'Standard evening edition purchased at Shinjuku kiosk; the agent was genuinely reading the sports section while waiting.',
      },
    ],
    alternativePaths: [
      {
        title: 'Aggressive Confrontation',
        description: 'Demanding the agent identify himself on the platform.',
        potentialOutcome:
          'Instantly flags you as hyper-vigilant. Civilians don’t accuse quiet commuters; Parker would have immediately alerted L.',
      },
      {
        title: 'The Door Feint (Last-Second Jump)',
        description: 'Leaping onto the carriage as the doors close to strand the tail.',
        potentialOutcome:
          'Conclusively proves professional counter-surveillance awareness. An ordinary high school senior has no reason to execute a train-door split.',
      },
      {
        title: 'The Cram Exam Study Routine',
        description: 'Retrieving your mock exam and quietly reviewing equations.',
        potentialOutcome:
          'The optimal path. Psychologically reinforces the identity of an obsessed honors student with no time or interest in criminal games.',
      },
    ],
  },
};
