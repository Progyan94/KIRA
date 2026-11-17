# KIRA — THE PSYCHOLOGICAL WARFARE SIMULATOR

> *"Every action creates information. Every silence leaves a possibility."*

An immersive, browser-based psychological thriller game inspired by the intellectual conflict between Light Yagami (Kira) and L from *Death Note*.

The player assumes the role of Kira. An intelligent investigator, potentially L or a task force agent, is independently investigating the player. The player's identity, the investigator's identity, their information boundaries, and their hidden objectives remain separate and uncertain.

---

## 1. Core Architecture

The application is structured into decoupled, modular systems built with modern React, TypeScript, and Vite:

```
src/
├── types/
│   ├── game.ts              # GameState, PlayerContext, NarrativeEntry, EvidenceItem, TimelineEntry, DebriefData
│   ├── scenario.ts          # ScenarioDefinition, ScenarioTest, EndingCondition, ActionIntent
│   └── settings.ts          # Audio preferences, display scaling, terminal shader options
├── engine/
│   ├── simulationEngine.ts  # Master turn coordination, clock advancement, narrative dispatch
│   ├── opponentAI.ts        # Adversarial investigator AI: hypothesis matrix, hidden suspicion (0-100), vigilance
│   ├── actionParser.ts      # Free-form NLP action parser: dialogue extraction, vigilance rating, NPA leak detection
│   ├── knowledgeManager.ts  # Strict asymmetric knowledge boundaries (Player vs Opponent vs Ground Truth)
│   ├── debriefGenerator.ts  # Master post-scenario intelligence debrief & counterfactual generator
│   └── audioAmbience.ts     # Client-side procedural Web Audio API soundscape (subterranean drone, tape hiss, key clicks)
├── data/
│   ├── scenarios/
│   │   ├── case01_shinjukuTail.ts      # Case 01: The Shinjuku Transit Encounter (The Tail)
│   │   ├── case02_entranceHall.ts      # Case 02: The To-Oh Entrance Hall (The Cross-Examination)
│   │   ├── case03_roomSurveillance.ts  # Case 03: The Wiretap in Room 204 (The Cold Glass)
│   │   ├── case04_kantoBroadcast.ts    # Case 04: The Kantō Broadcast Gambit (The Decoy Broadcast)
│   │   └── index.ts                    # Scenario catalog and lookup registry
│   └── saveManager.ts       # LocalStorage auto-save, multiple save slots, case archive, JSON backup export/import
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # Classified status bar, case ID, fictional time, audio toggle
│   │   ├── MainScreen.tsx              # Editorial title sequence, menu triggers
│   │   └── BackgroundAtmosphere.tsx    # Architectural grid, vignette, procedural film grain, scanlines
│   ├── gameplay/
│   │   ├── GameplayScreen.tsx          # Multi-region responsive layout coordinator
│   │   ├── LeftPlayerContext.tsx       # Date/time, location, role, known facts, inventory, contacts
│   │   ├── CenterNarrative.tsx         # Dominant cinematic narrative stream
│   │   ├── RightRecordPanel.tsx        # Dossier tabs: Evidence, Chronology, and Cipher Scratchpad
│   │   └── BottomActionInput.tsx       # Free-form natural language input + tactical vector chips
│   └── modals/
│       ├── DebriefModal.tsx            # Post-game master debrief: verdict, parallel timeline, clue audit
│       ├── ScenarioSelectModal.tsx     # Scenario selector with dossiers and security levels
│       ├── CaseArchiveModal.tsx        # Classified case archive of historical investigations
│       └── SettingsModal.tsx           # Audio gain, keystroke acoustics, CRT shaders, data wipe
└── styles/
    ├── variables.css        # Palette, editorial typography, spacing tokens
    ├── global.css           # Base reset, scrollbars, atmospheric layers, utilities
    └── components.css       # Custom component styling (zero component-library dependencies)
```

---

## 2. Key Game Systems

### Asymmetric Knowledge Boundaries
- **Player Knowledge**: The player sees their current location, resources, known facts, and public interactions. The player does **not** see the opponent's suspicion score, private thoughts, or behind-the-scenes surveillance orders.
- **Opponent Knowledge**: The opponent evaluates outward behavior, vocal consistency, pacing, and physical tells. The opponent does **not** see the player's private thoughts, inner monologues, or notes written in the player's personal scratchpad.
- **Ground Truth**: The engine maintains the objective underlying truth (e.g., whether an observer is an FBI agent or a bystander, whether a broadcast is regional or national).

### Adversarial Opponent AI
- Forms hypotheses across probability distributions:
  - `Civilian Student` (Baseline assumption)
  - `Hyper-Vigilant Suspect` (Conscious of being shadowed)
  - `Kira with Police Data Access` (Critical threat with inside information)
- Evaluates actions using behavioral heuristics:
  - Flinching or turning around 180 degrees in a train station spikes vigilance.
  - Leaking unreleased NPA case timestamps (e.g. knowing a victim died at 14:00 when the press reported 15:30) confirms inside police database access.
  - Executing ordinary study and transit routines lowers suspicion.

### Decoy and Misdirection System
- Clues and occurrences are classified as:
  - `genuine`: Factual intelligence.
  - `deliberately_staged`: Provocations and traps set by L.
  - `misleading`: Tabloid reports or incomplete information.
  - `unrelated`: Random coincidences (e.g., transit police chasing a pickpocket).
- No "TRAP" or "DECOY" badges are ever shown during active gameplay. The player must deduce the significance themselves. The ground truth is revealed in the post-game debrief.

### Post-Investigation Master Debrief
Upon case conclusion, the player unlocks a confidential dossier report:
1. **Status Classification & Verdict**: Flawless Concealment, Tactical Stalemate, Partial Compromise, Critical Exposure, or Decoy Trap Triggered.
2. **Step-by-Step Cognitive Duality Matrix**: Parallel comparison of [Your Action] vs [Opponent's Deduction at that Moment] vs [Ground Truth Reality] vs [Suspicion Shift].
3. **Decoy & Clue Audit**: Full breakdown of every exhibit and whether the player's assumption matched reality.
4. **Counterfactual Analysis**: Detailed exploration of alternative actions and divergent timelines.

### Client-Side Procedural Audio (Web Audio API)
- 100% offline, zero external audio asset files.
- Generates a deep 48Hz/52Hz subterranean drone, vinyl dust / analog tape hiss, and mechanical keystroke clicks.
- Can be toggled on/off instantly via the status bar or configuration modal.

---

## 3. Scenarios Included

1. **CASE-01: THE SHINJUKU TRANSIT ENCOUNTER (Standard Security)**
   - *Theater*: Shinjuku Station & Yamanote Line, 17:35 JST.
   - *Opponent*: FBI Special Agent Mark Parker trailing you at 15 paces.
   - *Objective*: Neutralize tailing suspicion without confirming you noticed the surveillance.

2. **CASE-02: THE TO-OH ENTRANCE HALL (Heightened Security)**
   - *Theater*: To-Oh University Auditorium, 10:15 JST.
   - *Opponent*: "Hideki Ryuga" (L) seated beside you as co-valedictorian.
   - *Objective*: Engage in academic dialogue without falling for the confidential NPA murder timestamp trap.

3. **CASE-03: THE WIRETAP IN ROOM 204 (Critical Security)**
   - *Theater*: Private Bedroom, 21:00 JST.
   - *Opponent*: Task Force monitoring feeds across 64 pinhole cameras and wiretaps.
   - *Objective*: Maintain a flawless evening study routine under continuous optical and acoustic surveillance.

4. **CASE-04: THE KANTŌ BROADCAST GAMBIT (Critical Security)**
   - *Theater*: Living Room Television, 19:00 JST.
   - *Opponent*: Lind L. Tailor on live broadcast issuing an execution dare.
   - *Objective*: Analyze signal geography and deduce the localized Kantō broadcast trap before taking fatal action.

---

## 4. Strict Design Principles

- **Zero Emojis**: Absolutely no emojis or cartoonish icons anywhere in UI, buttons, game text, or logs.
- **Color Palette**:
  - Background: `#090909`
  - Charcoal Surfaces: `#111111`, Elevated: `#181818`, Muted: `#202020`
  - Typography: Desaturated Ivory `#E8E5DF`, Secondary `#99958E`, Muted `#65615D`
  - Accents: Muted Blood-Red `#8D2529`, Wine Red `#521B1E`
  - Borders: Thin Editorial `#302D2A`
- **Typography Hierarchy**:
  - Display: *Cormorant Garamond* (Editorial serif)
  - Interface: *Inter* (Restrained sans-serif)
  - Technical: *IBM Plex Mono* (Monospace telemetry and timestamps)

---

## 5. Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Run test suite (17/17 tests passing)
npm test

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build
```

Open your browser to `http://localhost:5173/` to begin the simulation.
