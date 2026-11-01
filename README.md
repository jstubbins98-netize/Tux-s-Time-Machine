# Tux's Time Machine!

## Player manual and project guide

A point-and-click adventure through American history for middle-school learners and up. Play as Tux, a programmer penguin whose time machine malfunctions after he ignores a compiler warning. Recover nine modules, repair corrupted historical records, and find your way home.

**The central rule: observe history, do not rewrite it.** Tux repairs glitches in records, not historical injustices or outcomes. The people whose stories you learn retain their own agency.

## Quick start

1. Open **`index.html` in this folder** in a modern browser.
2. Watch the opening cutscene or select **Skip intro**.
3. Click or tap objects and people to explore the first era.
4. Use **Terminal** for hints when you need help.

The standalone HTML contains the game code, styles, and artwork. No installation, account, API key, database, or development server is required to play it. You can copy just this file to another computer.

The game itself can run offline. External historical-source links require internet access. Narration depends on the voices and capabilities available in your browser.

> There are two HTML entry files in the source tree. Use this folder's `index.html` to **play directly**. The file in `artifacts/tux-time-machine/index.html` is the **development template** and needs Vite; do not double-click that template to play.

## Opening cutscene

The introduction follows Tux from his lab through the malfunction to his arrival in 1781. It introduces the missing modules and Observer Mode.

- **Next / Back:** advance or revisit dialogue.
- **Begin adventure:** finish the final dialogue beat.
- **Skip intro:** enter the game immediately.
- **Enter / Space:** advance dialogue, or activate the focused button.
- **Escape:** skip the cutscene.
- **Replay intro:** watch it again from the game menu without resetting progress.

The game remembers when you finish or skip the introduction. Starting a new game makes it available again.

## Controls

### Mouse and touch

| Action | How |
|---|---|
| Walk | Click or tap the ground. |
| Interact | Click or tap a hotspot to open its verb menu. |
| Look | Examine a person, object, or record. |
| Talk | Start a conversation and choose questions. |
| Take | Collect an available item. |
| Use | Use your selected inventory item on a hotspot. |
| Select an item | Click or tap an item in the inventory. |
| Deselect an item | Select the same item again. |
| Combine items | Select one inventory item, then another. |
| Find hotspots | Use the **Hotspots (H)** button. |

### Keyboard

| Key | Action |
|---|---|
| Tab / Shift+Tab | Move focus between controls. |
| Enter / Space | Activate the focused button. |
| H | Toggle hotspot highlighting during exploration. |
| M | Open the era map during exploration. |
| I | Focus the first inventory item, when one is available. |
| 1–4 | Choose a verb when the hotspot menu is open; follow its displayed order. |
| Escape | Close the active panel or verb menu; skip the opening cutscene. |

Exploration shortcuts are inactive while a panel is open. Cutscene controls take precedence during the introduction.

## How to play

Each era follows the same basic loop:

1. **Read the situation.** Learn what record has been corrupted. Acknowledge any content note before continuing.
2. **Explore and talk.** Examine the scene and ask the guide questions. Conversations provide context and clues.
3. **Collect items.** Take useful objects and combine them when appropriate.
4. **Repair the record.** Select the correct inventory item, choose the relevant hotspot, and use it.
5. **Run the patch quiz.** Open the terminal and answer the historical question. You can retry incorrect answers.
6. **Recover a module.** Both the inventory puzzle and the quiz must be completed to earn that era's module.
7. **Travel onward.** Continue to the next era or revisit unlocked eras through the map.

There are no timed puzzles, deaths, or game-over penalties. An unsuccessful action gives feedback so you can try another approach.

### Inventory example

An item may need preparation before it is useful. If you collect a quill and ink, select one and then the other to combine them. Select the resulting item before using it on the appropriate record.

### Hints and fish

The terminal offers three increasingly direct hints, from a nudge to the solution.

- The first hint is free.
- Later hints cost one fish if you have fish available.
- Having no fish does **not** prevent you from receiving hints.
- Solving puzzles and recovering modules earns fish.
- The hat shop lets you spend fish on cosmetic hats. Hats do not affect puzzle solutions.

### The journey

The nine chapters cover:

1. The American Revolution.
2. The Cherokee Nation, literacy, and removal.
3. Freedom movements.
4. Chinese workers and the transcontinental railroad.
5. Immigration and investigative journalism.
6. World War II and its aftermath.
7. Civil rights and organizing.
8. Space and computing, including a later computing connection.
9. A modern museum finale.

The finale brings together the recovered modules and the knowledge recorded in your Codex.

## Codex and historical sources

The **Codex** collects source entries as you repair records. Entries link to historical institutions and reference material.

The game distinguishes:

- **Invented dialogue:** fictional writing for the game.
- **Historical summary:** a paraphrase of historical information.
- **Authentic quotation:** an attributed quotation.

Guides are identified as composite fictional characters. They are not recordings of historical people.

**Historical content has not been reviewed by professional historians.** Educators should review the linked sources before classroom use. Some links lead to institutional search pages or collections rather than individual documents, and external pages may change.

The game does not treat quilt-route signals as established historical fact. It distinguishes the 1947 Mendez case from wartime events and identifies Mark Dean's work as a later computing connection.

## Teacher mode

Open **Settings → Teacher mode** to view the classroom guide.

The guide includes:

- A summary of gameplay and Observer Mode.
- Chapter-specific discussion questions.
- Historical-source links and attribution.
- Content notes.
- Space for written responses.

Select **Print worksheet** to print the guide or use your browser's **Save as PDF** option.

Suggested classroom approach:

1. Preview the chapter and its content note.
2. Let students explore individually or in pairs.
3. Discuss what the record omitted or misrepresented.
4. Compare the game's summary with the linked historical material.
5. Ask students to distinguish fictional framing from historical evidence.

Chapters address slavery, forced removal, racial violence, incarceration, and state violence. Quiet reflection spaces are not scored challenges. Allow time for discussion and adapt use to your learners.

## Settings and accessibility

Open **Settings** to adjust:

- **Text size:** A, A+, or A++.
- **Narration:** browser-based text-to-speech, when supported.
- **Sound effects:** turn synthesized game sounds on or off.
- **Reduce motion:** reduce animation.

Dialogue remains visible whether or not narration is available. The opening cutscene also respects the operating system's reduced-motion preference.

Sound or narration may require a click or tap before the browser permits playback.

## Saving, replaying, and restarting

Progress saves automatically in browser local storage, including chapters, inventory, sources, puzzle progress, modules, fish, hats, and settings.

Important limitations:

- Saves belong to the browser and location where you play; there is no cloud synchronization.
- Different browsers, browser profiles, and devices have separate saves.
- Private browsing, blocked storage, or clearing site data can prevent saving or erase progress.
- Storage behavior for directly opened `file:` URLs varies by browser. Renaming or moving the HTML file may make an earlier save unavailable.
- There is no built-in save export or import.

Use **Replay intro** to watch the story again without changing your save.

To start over, choose **Settings → New game… → Erase and restart**. This deletes gameplay progress, including inventory, sources, modules, fish, and hats. Settings are retained. This cannot be undone within the game.

## Source layout

```text
Tux-Time-Machine!/
├── README.md                     This manual
├── index.html                    Standalone playable game
├── package.json                  Workspace scripts
├── pnpm-workspace.yaml            Workspace package configuration
├── pnpm-lock.yaml                 Dependency lockfile
├── tsconfig*.json                 Shared TypeScript configuration
├── artifacts/
│   ├── tux-time-machine/
│   │   ├── index.html            Development HTML template
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── scripts/
│   │   │   └── build-standalone.mjs
│   │   └── src/
│   │       ├── App.tsx           Game and teacher routes
│   │       ├── index.css         Shared game styling
│   │       ├── game/
│   │       │   ├── Game.tsx      Gameplay and interactions
│   │       │   ├── data.ts       Chapters, items, sources, puzzles
│   │       │   ├── store.ts      Saves, sound, narration
│   │       │   ├── art.tsx       SVG artwork
│   │       │   ├── panels.tsx    Game panels and menus
│   │       │   ├── IntroCutscene.tsx
│   │       │   └── intro-cutscene.css
│   │       └── pages/
│   │           └── teacher.tsx   Printable classroom guide
│   ├── api-server/               Workspace service scaffold
│   └── mockup-sandbox/           Design-preview scaffold
├── lib/                          Shared workspace libraries
└── scripts/                      Workspace utility scripts
```

The game runs client-side; the API server and design-preview scaffold are not required to play the standalone HTML.

Root compatibility links outside this folder preserve existing workspace tooling. They point to the consolidated sources rather than separate copies.

## Editing and rebuilding

Requirements for development: Node.js 24 and pnpm.

From a terminal at the surrounding project root:

```sh
cd 'Tux-Time-Machine!'
pnpm install
pnpm --filter @workspace/tux-time-machine run typecheck
pnpm --filter @workspace/tux-time-machine run build:standalone
```

The last command regenerates this folder's **`index.html`** with the current game, styles, artwork, and cutscene.

**Edit the source files, not the generated standalone HTML.** Rebuilding overwrites changes made directly to the standalone file.

For local development outside the managed preview, this POSIX-shell command supplies the variables expected by Vite:

```sh
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/tux-time-machine run dev
```

In Replit, use the existing managed game workflow instead of starting a duplicate server.

## Troubleshooting

| Problem | What to try |
|---|---|
| Opening HTML shows nothing or source-loading errors | Open `Tux-Time-Machine!/index.html`, not the development template under `artifacts/`. |
| A source change does not appear in the standalone game | Run `build:standalone` again, then reload the HTML file. |
| I cannot find anything to interact with | Press H or select **Hotspots (H)**. |
| An item does nothing | Select it in inventory first, then choose **Use** on the target. Some items need combining. |
| The next era is locked | Complete both the inventory puzzle and the terminal quiz in the current era. |
| I am stuck and have no fish | Open **Terminal** and request a hint; hints remain available without fish. |
| Narration is unavailable | Try a browser with speech synthesis support. All dialogue remains readable. |
| Progress disappeared | Check the browser, profile, site address, and local file location. Clearing storage or private browsing may remove saves. |
| A source link is unavailable | Search the named institution for the source title or collection listed in the Codex. |
| Printing includes unwanted browser headers | Adjust headers, footers, and margins in the browser's print dialog. |

Enjoy the journey—and read the compiler warnings.
