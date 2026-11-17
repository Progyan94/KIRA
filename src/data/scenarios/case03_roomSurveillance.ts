// CASE-03: THE WIRETAP IN ROOM 204 (THE COLD GLASS)
// Scope: Spoiler-safe (Episode 1-8 dynamics). Surveillance counter-measures in the bedroom.

import { ScenarioDefinition } from '../../types/scenario';

export const case03_roomSurveillance: ScenarioDefinition = {
  id: 'case_03_room_surveillance',
  code: 'CASE-03',
  title: 'THE WIRETAP IN ROOM 204',
  subtitle: 'Domestic Behavior under Sixty-Four Hidden Transmitters',
  difficulty: 'CRITICAL',
  briefing: {
    background:
      'Tokyo, 18 December 2003, 21:00 JST. You return to your second-floor bedroom after evening classes. Before opening your door, you check your triple physical fail-safe.',
    playerObjective:
      'Conduct a typical evening of study, domestic interaction, and rest. You must neither react to the surveillance nor alter your habits in a way that suggests you know your sanctuary is compromised.',
    apparentSituation:
      'The pencil lead in the door hinge is broken. The handle tilt is off by 5 millimeters. Sixty-four pinhole audio-visual transmitters are active inside your private room.',
    criticalWarning:
      'Do not search for camera lenses. Do not whisper to yourself. Do not look directly into corners, smoke detectors, or electrical fixtures.',
  },
  initialPlayerContext: {
    date: '18 DECEMBER 2003',
    time: '21:00 JST',
    location: 'YAGAMI RESIDENCE - BEDROOM 204',
    role: 'HONORS STUDENT UNDER 24/7 SURVEILLANCE',
    knownFacts: [
      'You established a mechanical pencil lead trap in the hinge: broken (someone opened the door).',
      'You left the door handle tilted down 5mm: leveled flat (intruder reset it carelessly).',
      'A microscopic piece of scrap paper wedged in the frame fell out onto the carpet.',
      'The Death Note is secured inside the false bottom of your desk drawer with a gasoline ignition trap.',
    ],
    resources: [
      'STUDY DESK & HALOGEN LAMP',
      'PORTABLE TELEVISION SET',
      'SEALED FOIL SNACK PACKET (POTATO CHIPS)',
      'COLLEGE PREP REFERENCE BOOKS',
      'DESK DRAWER (DOUBLE-BOTTOM MECHANISM)',
    ],
    relationships: [
      {
        name: 'L (AND TASK FORCE)',
        role: 'REMOTE SURVEILLANCE SUITE',
        status: 'MONITORING VIA 64 CAMERAS',
        credibility: 'suspect',
        knownToPlayer: 'Watching every angle from a secure hotel operations room.',
        hiddenAgenda: 'Attempting to catch Light writing names or exhibiting suspicious solitary behavior.',
      },
      {
        name: 'SAYU YAGAMI (SISTER)',
        role: 'FAMILY MEMBER',
        status: 'DOWNSTAIRS IN LIVING ROOM',
        credibility: 'credible',
        knownToPlayer: 'Frequently knocks on your door for math homework tutoring.',
      },
    ],
  },
  initialNarrative: [
    {
      id: 'case03-init-1',
      timestamp: '21:00 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'The hallway floorboards are cool beneath your socks. Standing outside bedroom 204, your fingertips graze the brass doorknob.',
    },
    {
      id: 'case03-init-2',
      timestamp: '21:00 JST',
      turnNumber: 0,
      type: 'observation',
      content:
        'The handle is perfectly horizontal. You always leave it angled five millimeters downward. Looking down at the threshold, the fragment of 0.5mm pencil lead you placed inside the upper hinge lies crushed into carbon dust.',
    },
    {
      id: 'case03-init-3',
      timestamp: '21:00 JST',
      turnNumber: 0,
      type: 'narrative',
      content:
        'Someone has entered your room. Not your mother or sister—their clumsy entries would have left obvious traces. This was executed with surgical caution. The room is wired.',
    },
  ],
  initialEvidence: [
    {
      id: 'evd-301',
      code: 'EVD-301',
      title: 'HINGE TRAP BREACHED',
      description: 'Pencil lead crushed, paper wedge displaced, doorknob leveled.',
      source: 'Doorway Physical Security Check',
      discoveredTurn: 0,
      isConfirmed: true,
      nature: 'genuine',
    },
    {
      id: 'evd-302',
      code: 'EVD-302',
      title: 'FALSE BOTTOM IGNITER',
      description: 'Special drawer bottom wired to ignite gasoline if opened without disarming ballpoint pen trick.',
      source: 'Desk Drawer Trap Mechanism',
      discoveredTurn: 0,
      isConfirmed: true,
      nature: 'genuine',
    },
  ],
  initialTimeline: [
    {
      id: 'tl-301',
      timestamp: '20:55 JST',
      turnNumber: 0,
      label: 'RETURN HOME',
      summary: 'Greeted mother and sister downstairs before ascending to bedroom.',
      significance: 'routine',
    },
    {
      id: 'tl-302',
      timestamp: '21:00 JST',
      turnNumber: 0,
      label: 'TRAP BREACH DETECTED',
      summary: 'Confirmed covert entry into private quarters.',
      significance: 'critical',
    },
  ],
  suggestedActions: [
    {
      id: 'sug-301',
      label: 'ENTER NATURALLY & SWITCH ON LIGHT',
      actionText: 'Open the door casually, turn on the ceiling light, kick off slippers, and toss bag on bed.',
      category: 'tactical',
    },
    {
      id: 'sug-302',
      label: 'BEGIN STUDY ROUTINE AT DESK',
      actionText: 'Sit down at the desk, pull out mock exam papers, and begin solving problems under the lamp.',
      category: 'tactical',
    },
    {
      id: 'sug-303',
      label: 'TURN ON PORTABLE TELEVISION',
      actionText: 'Switch on the TV to the evening news while continuing to write notes in your textbook.',
      category: 'tactical',
    },
    {
      id: 'sug-304',
      label: 'INSPECT DESK DRAWER BOTTOM',
      actionText: 'Pull open the drawer and check if the hidden bottom compartment was tampered with.',
      category: 'tactical',
    },
  ],
  opponentConfig: {
    name: 'MONITORING TASK FORCE (L)',
    apparentRole: 'Hidden Audio/Visual Surveillance',
    trueRole: 'L and Soichiro Yagami monitoring 64 feed screens in secure hotel suite',
    initialObjective:
      'Catch Light Yagami in the act of writing names or displaying unnatural solitary secrecy.',
    initialSuspicionScore: 30,
    initialKnowledge: [
      'Room has been fitted with 64 ultra-miniature pinhole cameras and directional microphones.',
      'Soichiro Yagami is present watching the screens with profound paternal anxiety.',
      'Target does not know about the cameras (assumed).',
    ],
    initialHypotheses: [
      {
        id: 'civilian_student',
        label: 'Hardworking Student Dedicated to Studies',
        probability: 70,
        basis: ['Spends 4 to 5 hours studying every evening'],
      },
      {
        id: 'hyper_vigilant_suspect',
        label: 'Subject Aware of Room Bugs',
        probability: 20,
        basis: ['Checking corners or acting stiffly'],
      },
      {
        id: 'kira_with_police_leak',
        label: 'Kira Operating Under Domestic Cover',
        probability: 10,
        basis: ['High criminal profile match'],
      },
    ],
  },
  tests: [
    // Phase 1: Entry Demeanor
    {
      id: 'test_entry_demeanor',
      triggerTurn: 1,
      name: 'Initial Room Entry',
      description: 'L monitors the exact micro-expressions as Light steps across the threshold.',
      opponentGoal: 'Detect if subject scans the ceiling corners or freezes upon entering.',
      evaluatedCriteria:
        'A person entering their own room does not scan the air conditioning vents or examine wall sockets.',
      responses: [
        {
          intentMatches: ['enter naturally', 'casual', 'toss bag', 'switch on light', 'routine'],
          narrativeOutcome:
            'You turn the knob with fluid unconcern, click the wall switch, kick off your slippers, and drop your heavy leather bookbag onto the comforter. You stretch your arms and roll your shoulders with a weary exhale.',
          opponentReaction:
            'Across forty screens in the hotel operations room, your movements appear completely organic. L sits hunched forward, sipping sweetened tea.',
          suspicionDelta: -6,
        },
        {
          intentMatches: ['search', 'scan', 'camera', 'inspect ceiling', 'vents', 'socket'],
          narrativeOutcome:
            'Your eyes flick toward the corner molding and the seam of the ceiling smoke detector.',
          opponentReaction:
            'In the control room, L whispers: "He just glanced at camera angle twelve. Why look at the ceiling junction?"',
          suspicionDelta: 30,
        },
        {
          intentMatches: ['drawer', 'false bottom', 'check desk', 'notebook'],
          narrativeOutcome:
            'You rush directly to your study desk and slide open the drawer, checking the lock mechanism.',
          opponentReaction:
            'Cameras 4 and 7 zoom in on your hands. L leans closer to the high-definition monitor.',
          suspicionDelta: 25,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'You cross into the center of the room. The subtle hum of hidden electronics is imperceptible beneath the floor heater.',
        opponentReaction:
          'The monitors display a tranquil bedroom scene.',
        suspicionDelta: 0,
      },
    },

    // Phase 2: Sister Interruption / Study Setup
    {
      id: 'test_sister_knock',
      triggerTurn: 2,
      name: 'Family Interruption',
      description: 'A knock at the door: Sayu asks if she can come in to ask about a geometry problem.',
      opponentGoal: 'Evaluate domestic warmth vs cold hostility.',
      evaluatedCriteria:
        'A sociopathic criminal often snaps at siblings; an affectionate brother welcomes or playfully banters.',
      responses: [
        {
          intentMatches: ['sayu', 'sister', 'come in', 'door', 'help', 'geometry'],
          narrativeOutcome:
            'You smile warmly, calling out: "Door’s unlocked, Sayu. What problem are you stuck on this time?" She bounces in with her textbook, and you patiently walk her through an angle theorem.',
          opponentReaction:
            'Soichiro watches the screen with tearful relief: "See, Ryuzaki? Light is just a good older brother!" L remains impassive, but logs no anomalies.',
          suspicionDelta: -8,
        },
        {
          intentMatches: ['go away', 'busy', 'shut door', 'locked', 'refuse'],
          narrativeOutcome:
            'You snap through the door: "I’m studying, Sayu! Don’t bother me tonight!"',
          opponentReaction:
            'L tilts his head: "Slightly irritable tonight. Stress from exams, or guarding something inside?"',
          suspicionDelta: 8,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'You manage the family interaction with brief efficiency.',
        opponentReaction:
          'The observation team continues logging audio feeds.',
        suspicionDelta: 0,
      },
    },

    // Phase 3: The Television Broadcast & Snack Maneuver
    {
      id: 'test_snack_tv_maneuver',
      triggerTurn: 3,
      name: 'The Media Broadcast Test',
      description: 'The television news airs a special broadcast naming a hostage taker.',
      opponentGoal: 'Check if Light watches the television and if criminal dies shortly after.',
      evaluatedCriteria:
        'If the criminal dies while Light is studying without touching anything, suspicion drops dramatically.',
      responses: [
        {
          intentMatches: ['chips', 'snack', 'tv', 'television', 'watch news', 'study'],
          narrativeOutcome:
            'You prop open your reference manual, switch on the portable TV with your left hand, and pop open a foil bag of potato chips with your right, munching idly as news of an armed bank standoff plays.',
          opponentReaction:
            'L monitors the packet and your hands through cameras 03 and 19. On screen, you appear to be an ordinary hungry honors student multitasking between snacks, news, and calculus.',
          suspicionDelta: -7,
        },
        {
          intentMatches: ['stare', 'intense', 'glare at tv', 'write name immediately'],
          narrativeOutcome:
            'You stare transfixed at the television screen, reaching for a pen with sudden rigidity.',
          opponentReaction:
            'L mutters: "His focus just spiked 300%. Keep camera 04 tight on his right hand."',
          suspicionDelta: 20,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'The low drone of the news anchor fills the bedroom. You turn the page of your calculus book.',
        opponentReaction:
          'Feeds 01 through 64 remain steady.',
        suspicionDelta: 0,
      },
    },

    // Phase 4: Bedtime Routine
    {
      id: 'test_bedtime_routine',
      triggerTurn: 4,
      name: 'The Night Shutdown',
      description: '23:30 JST. Preparing for bed.',
      opponentGoal: 'See if target conducts nocturnal operations once lights are extinguished.',
      evaluatedCriteria:
        'Normal students brush teeth, wash face, turn off desk lamp, and sleep.',
      responses: [
        {
          intentMatches: ['sleep', 'bed', 'turn off light', 'teeth', 'pajamas'],
          narrativeOutcome:
            'You switch off the desk lamp, change into sleepwear, set your alarm clock for 06:30, and slip beneath the quilt, closing your eyes with relaxed breathing.',
          opponentReaction:
            'Night-vision infrared feeds register an even, lowering heart rate. L sighs: "Heart rate 62 BPM. He really is asleep."',
          suspicionDelta: -5,
        },
        {
          intentMatches: ['stay awake', 'sneak', 'search room in dark', 'whisper'],
          narrativeOutcome:
            'In the darkness, you sit up and attempt to whisper toward the closet.',
          opponentReaction:
            'Microphone array picks up anomalous vocal frequency. Infrared sensors flag motion.',
          suspicionDelta: 25,
        },
      ],
      defaultResponse: {
        narrativeOutcome:
          'Darkness settles over room 204 as the streetlights outside cast tree shadows across the wall.',
        opponentReaction:
          'Surveillance log enters night monitoring protocol.',
        suspicionDelta: 0,
      },
    },
  ],
  endingConditions: [
    {
      id: 'end_room_exposure',
      condition: (state: any) => state.opponentState.suspicionScore >= 75,
      verdict: 'critical_exposure',
      verdictTitle: 'ANOMALOUS SOLITARY BEHAVIOR // RED-FLAGGED',
      summary:
        'Your unnatural movements, glances toward hidden sensors, and defensive posture conclusively confirmed to L that you were aware of the surveillance suite. Cameras will remain permanently installed.',
      narrativeConclusion:
        'At 02:00 JST, L annotates the operations log: "Subject verified awareness of camera placement. Concealment failed."',
    },
    {
      id: 'end_master_domestic_clear',
      condition: (state: any) => state.turnNumber >= 5 && state.opponentState.suspicionScore <= 20,
      verdict: 'flawless_concealment',
      verdictTitle: 'PERFECT INNOCENCE // SURVEILLANCE DERIDED',
      summary:
        'Your flawless execution of an ordinary study evening under 64 active lenses deeply humiliated the surveillance initiative. Soichiro demanded the immediate removal of cameras from his family home.',
      narrativeConclusion:
        'In the hotel room, L rubs his eyes in exhaustion: "He spent five hours doing differential equations and eating potato chips. Soichiro-san... we are removing the wiretaps tomorrow."',
    },
    {
      id: 'end_unresolved_watch',
      condition: (state: any) => state.turnNumber >= 5,
      verdict: 'tactical_stalemate',
      verdictTitle: 'CONTINUED VIGIL // NO DECISIVE EVIDENCE',
      summary:
        'You avoided direct exposure, but L’s suspicion remains unresolved. The surveillance team will continue monitoring your room for another 48 hours.',
      narrativeConclusion:
        'Morning sunlight filters through your curtains. The faint electronic hum persists. The watch continues.',
    },
  ],
  maxTurns: 5,
  groundTruthData: {
    fullStory:
      'L planted exactly 64 cameras and listening devices across room 204 while Light was at school. Soichiro Yagami and the task force observed the feed simultaneously. If Light showed any sign of searching for the bugs, his guilt would be heavily corroborated.',
    opponentMasterPlan:
      'Watch for any behavior impossible to explain for an ordinary student: checking hidden spots, whispering to the air, refusing to study, or writing names while watching television.',
    clueAudits: [
      {
        code: 'EVD-301',
        title: 'HINGE PENCIL LEAD TRAP',
        nature: 'genuine',
        playerPerspective: 'Confirmed physical breach of the room.',
        actualFact: 'Installed by technicians under L’s personal inspection.',
      },
      {
        code: 'EVD-302',
        title: 'SAYU HOMEWORK REQUEST',
        nature: 'unrelated',
        playerPerspective: 'Could have been prompted by police or used as a distraction.',
        actualFact: 'Genuine sibling interaction; Sayu truly struggled with trigonometry.',
      },
    ],
    alternativePaths: [
      {
        title: 'Searching for the Bugs',
        description: 'Trying to locate the camera lenses in the vents or outlets.',
        potentialOutcome:
          'Catastrophic failure. Why would an innocent student look behind picture frames or inside pencil sharpeners?',
      },
      {
        title: 'Refusing to Study or Speak',
        description: 'Sitting silently on the bed in protest or panic.',
        potentialOutcome:
          'Raises immediate psychiatric flags. High-achieving student suddenly paralyzed on a weekday evening.',
      },
      {
        title: 'The Unflinching Routine',
        description: 'Studying, tutoring sister, eating snack, sleeping.',
        potentialOutcome:
          'The ultimate counter-move. Turns the opponent’s own massive surveillance apparatus into proof of your innocence.',
      },
    ],
  },
};
