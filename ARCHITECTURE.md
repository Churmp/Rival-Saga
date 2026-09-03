> **Authority: IMPLEMENTATION ARCHITECTURE**
> This document plans implementation and records system structure. It does not create gameplay rules.

# Rival Saga Architecture

## Battle Phase Presentation Authority

The Teambuilder is the sole editor for Battle Phase membership, Badge assignments, forms, and sets. Team submission stores one revisioned exact-instance snapshot per player and Gym in `state.battleTeams`; Battle Phase consumes that snapshot as a read-only overview. `getBattleTeamView` projects it through durable viewer-scoped reveal grants with `HIDDEN`, `SPECIES`, `PUBLIC_SUMMARY`, and `FULL_SET` levels. See `BATTLE_PHASE_ARCHITECTURE.md` for the state inventory, visibility boundary, UI composition, and current transport-security limitation.

## Confirmed Events Drive The App

Rival Saga should move toward being a rules-aware event system, not only a visual tracker.

Major connected changes should happen through confirmed events:

1. The user enters or selects data.
2. The app previews consequences where useful.
3. The user confirms/saves.
4. The app applies the change.
5. The Activity Log records what happened.
6. Undo can reverse the event when enough prior state was stored.

Typing into a form, choosing a team slot, or changing a draft value should not immediately update every connected system. The commit point is the confirmed event.

Examples of confirmed events:

- Battle Result Saved
- Purchase Finalized
- Effect Activated
- Trade Confirmed
- Pokemon Added
- Pokemon Released
- Trainer Class Gained
- Perk Added
- Victory Road Reward Claimed
- Bulletin Board Reward Claimed
- Saga Point Awarded
- Money Awarded

Trainer class imports should follow the effect-resolution model instead of becoming one-off UI buttons. `TRAINER_CLASS_IMPORT_PREP.md` documents the current class-effect prep layer, including Snowboarder / Skier stance state, control-style activations, Frost Counters, Frozen passives, and Team Builder move-sharing donors.

## No Gameplay Refresh Button

The normal app flow should not depend on a global "refresh/recalculate everything" button.

Confirmed events should apply their own consequences when saved. A rebuild/recalculate command can exist later as an admin/debug tool, but it should not be the regular gameplay flow.

## Theme System

Themes are coordinated palettes, not single-hue replacements. Every theme provides a neutral foundation plus primary, secondary, highlight, semantic, and readable foreground roles.

The shared contract includes:

- `bg`, `surface`, `surface2`, `ink`, `muted`, and `line` for the interface foundation.
- `brand`, `brandDark`, `accent2`, `gold`, `onBrand`, and `onAccent2` for identity and emphasis.
- `success`, `warning`, `info`, and `danger` for gameplay/system meaning independent of theme identity.
- `resultBg`, `resultInk`, and `resultBorder` for resolution announcements whose contrast must not depend on a generated gradient.
- Explicit header roles for navigation, profile identity, chips, and controls.

Components may blend palette roles for depth, but text-bearing surfaces must use their matching foreground role. Light and dark themes also set the browser color scheme and theme-aware elevation shadow.

Global themes and player profile themes remain separately selectable, but matching IDs share one palette contract. A profile theme such as Silver is derived from the same Silver definition used by the global interface; it must not be maintained as a second unrelated palette. Players may intentionally mix different global and profile themes, while selecting the same name produces a coordinated result.

Gold, Silver, Crystal, Emerald, Pearl, and Midnight Red are the first flagship palettes under this contract. Remaining legacy palettes can be migrated after these establish the visual baseline.

## Ruleset vs Game State

Rival Saga data should be separated into three layers:

- Site/app code: how the website executes systems, such as wheels, battle recording, activation overlays, and undo.
- Ruleset/content: editable Rival Saga content, such as token art, token definitions, Pokemon tiers, sprite aliases, trainer classes, perks, shop data, Route data, and current reward wheels.
- Game state: one active game's save data, such as players, rosters, money, phase, sessions, ledgers, logs, and pending activities.

Admin tools should answer one question before changing data: is this editing Rival Saga rules/content, or repairing one game's current state?

Rules/content belongs in the League Manager ruleset/content library. Game repair belongs in repair/debug tools. Eventually each game should pin to a ruleset version and opt into future ruleset updates instead of receiving every balance/content change automatically.

Token art image bytes are asset data, not gameplay state. Uploaded token art should be persisted through the backend token-art asset route and referenced from game/ruleset snapshots by URL plus display settings. Save snapshots should not duplicate token art in both `ruleset.contentLibraries.tokenArt` and top-level `tokenArtLibrary`; the runtime can mirror that data in memory after load when older UI helpers need it.

Action Phase behavior is a single current ruleset contract. `action-phase-v2-real-series` remains the stored identifier for the Route-era implementation, but there is no supported alternate V1 runtime and no requirement to load or continue V1 saves. Historical Action Phase behavior belongs in Git history and the pre-removal archive branches, not in production compatibility paths. New work extends the one current ruleset rather than adding version forks.

Route Exploration is the current Pokemon-acquisition Action path. The retired pre-Route encounter and grotto systems are not production models and must not be restored as compatibility branches. Shared Pokemon-result, reroll, and Token infrastructure remains shared where the current Route-era rules still use it; existing `state.v2` and `v2*` names may remain until a separate naming cleanup. See `versions/README.md` for the current versioning authority.

Future V2 Route modifiers should call the Route Effect API instead of directly mutating resident arrays, public discovery lists, player-private knowledge, suppressions, or opportunity temporary residents. Route Effect records persist source metadata, affected route/player/opportunity IDs, hidden affected resident IDs, status, count, and creation revision; player-facing selectors project only safe summaries plus public and viewer-private knowledge. The Route layer remains source-agnostic: Trainer Classes, Perks, Tokens, Gym modifiers, and Action rewards may request private/table reveals or temporary Primary-Type injection later, but the Route engine must not import or infer Class-specific rules.

## Perk Offer Rules

Each perk offer contains three independently tiered choices: Silver 67%, Gold 28%, and Crystal 5%. The stable internal tier IDs remain `C`, `B`, and `A`; player-facing rules and UI use Silver, Gold, and Crystal.

Perks are globally unique while owned. Offer generation excludes perks owned by any player, perks already present in that same offer, and perks marked as unavailable for offers by another rule. When a claimed perk also appears in an older pending offer, that stale choice is refreshed so it cannot create duplicate ownership.

Players may own at most one Crystal, two Gold, and three Silver perks. Choosing a new perk at a full tier requires replacing an owned perk from that same tier; declining the replacement leaves the offer unclaimed. The removed perk immediately becomes available for future offers.

After the first Crystal perk appears in an offer, every other player receives one guaranteed Crystal choice in their next perk offer. The other two choices continue to roll normally.

Consumable perks retain their tier slot while owned. Their definitions store their written number of uses. Future timing-engine activation must decrement those uses and, when a perk is fully consumed and removed, release it back into the available offer pool unless that perk says otherwise.

## Site Shell / Multiple Games

The website has an outer Site Shell that exists above the Rival Saga game UI.

The correct hierarchy is:

- Site Shell: login/profile placeholder, main menu, game list, ruleset patches, future account/game membership tools.
- Game Module: Rival Saga itself, opened from the Site Shell as a playable game instance.
- Game Tabs: Player Hub, Action Phase, Battle Phase, Shop, Pokedex, Info, and the rest of the in-game UI.

The Site Shell should be a real website surface, not a drawer inside Rival Saga. Current shell pages are Home, My Games, Rulebook, Patch Notes, Profiles, Forums, and Admin.

A compact `global-app-shell` owns platform identity, current-game return/control, rules access, signed-in account access, logout, and permission-gated site administration outside game instances. Entering `?view=game` hides that website chrome and renders one dedicated `game-client-header` instead. The game header shows the active game and Series/Gym context, a persistent gameplay ribbon for Live Referee, Action Phase, Team Builder, Player Sheet, Shops, and Battle Phase, an anchored League menu, and the independent viewed trainer plus utility Menu. It does not create new account, game, or permission state: account identity still comes from `SITE_PROFILE_ID_KEY`, current game from the backend game ID/query contract, and viewed-trainer context from `state.activePlayerId`.

Ribbon and League navigation reuse the existing page/view, Live Referee, and Activity Log state. `page` and `panel` query parameters mirror that canonical UI state so direct links, refresh, and browser history can restore the selected destination without introducing a second route model. The League menu exposes only implemented informational surfaces: Standings/series breakdown, MVP Race/Pokemon performance, Pokedex/status/ban history, and Activity Log. Current Gym results, matchups, battle records, and battle history remain part of the canonical Battle Phase page and are not duplicated in League.

The focus-trapped game drawer is now a utility surface for Rival Saga website destinations, theme Preferences, account controls, and permission-gated administration. Game administration follows `hasSiteAdminAccess()` while Site Admin remains gated by `siteUserIsSiteAdmin()`. Theme selection retains the existing viewed-trainer mutation and persistence path. The Action Phase owns the existing agenda and phase-advance controls; there is no global phase strip, Action-row theme control, or full-width demo banner.

The repeated trainer profile card remains in place during this foundation pass. It continues to own legacy player switching and detailed trainer information until a later regression-tested player-context redesign replaces those responsibilities.

The local backend now supports the beginning of that site shell:

The game directory is the authoritative game index. The shell reads lightweight summaries through `game-shell-contract.js`; it does not hydrate or normalize complete gameplay state merely to list a game. Summary reads are bounded-memory and cached by file size/mtime so large progressed saves do not destabilize the server. Supported summaries carry stable game/trainer membership IDs plus series, Gym, phase, status, player count, and schema version. Unknown optional gameplay fields are ignored, while unsupported required schemas and malformed records remain visible in diagnostics.

Shell and game requests resolve through one runtime API origin. A stale remembered game or profile is cleared narrowly and returns the user to the authoritative list; it never creates a replacement record. Read-only shell listing does not rewrite authoritative files. Entering a legacy game may return a compacted snapshot and then persist that migration through the normal versioned save queue. Isolated `codex-*` and `browser-smoke` records remain on disk but are excluded from the normal game library.

- Profiles live outside a game and are stored as local backend user records.
- Accounts use a stable private login ID internally, while the visible display name can be changed freely.
- `SagaAdmin` is the local development site-admin account. Site admins can use global Site Shell tools such as deleting lobbies; game owners/hosts are intentionally a separate, narrower permission level.
- Games live as separate backend records under their own game IDs.
- Creating or joining a game should lead to a lobby/waiting screen before entering the Rival Saga module. The lobby connects site accounts to game membership and gives clear feedback about seats, host/player role, and readiness.
- Lobby host tools may create fake local test accounts to fill empty seats. These accounts are development/testing helpers only; they should not replace the real account membership model.
- Existing unowned test games can be claimed by the current account so old local game records can be brought under the lobby/host model without manually editing JSON.
- When a new backend game has no saved Rival Saga state yet, opening the game seeds the fixed trainer slots from the lobby members. Existing saved games may receive missing profile-to-trainer links and generic trainer names from lobby membership, but custom trainer names should not be overwritten.
- The client can switch games through the `?game=` query parameter, which keeps each game state isolated.
- The client enters the Rival Saga game module through `?view=game`. Without that view, the site opens to the outer shell/main menu.
- Ruleset patches are separate metadata records. Applying a patch to a game currently marks patch history and updates the game ruleset version; future passes should add real migrations/content diffs.
- Patch Notes are public/read-only. Patch creation and patch application belong in host/admin tools only.

This is a placeholder for future hosted auth and game membership. The current profile layer is not security; it is a local development stand-in for accounts.

## Client Performance And Persistence

Static text assets are negotiated as Brotli or gzip by the local server, carry ETag and Last-Modified validators, and use immutable one-year caching when the HTML supplies a version query. HTML remains revalidated so new asset versions are discovered. The ordered browser scripts are declared with `defer` in the document head, allowing downloads to begin while the large app shell is still being parsed without changing their execution order.

The in-game render path should only rebuild the active top-level surface and the active Player Hub tab. Hidden heavy pages such as Pokedex, Battle Phase, MVP Race, Shop, and Teambuilder should not be regenerated by unrelated clicks.

Client-side `localStorage` persistence is intentionally queued for normal `saveState()` calls so quick UI interactions collapse into one snapshot write. Backend persistence uses a separate single-flight revision queue: rapid mutations coalesce behind one upload, every full-state write includes the last acknowledged server version, mutation tracking waits through response-body version acknowledgement, remote revisions cannot silently replace a dirty local state, and network failures remain visibly retryable. Already-acknowledged timing events are ignored even if SSE delivery is delayed. Critical Gym/gameflow transitions render immediately but await an authoritative acknowledgement. A dirty tab flushes when hidden and triggers the browser's leave guard while a save is queued or in flight.

Game entry does not render the clean/default state while backend hydration is pending. A dedicated League-themed hydration surface covers the game shell until the authoritative snapshot has normalized; failure retains that surface with Retry instead of presenting an empty game as usable. The server accepts bounded state bodies up to 96 MiB and stores authoritative JSON compactly through the existing temporary-file rename.

Undo persistence is bounded independently from visible Activity history. The latest 50 reversible events retain rollback data; older rows remain readable and are marked History only. Phase advancement stores the prior phase fields plus only collection/player-map values that changed, rather than complete before-and-after game snapshots. Terminal interaction records do not duplicate undo payloads already owned by the Activity Log. The same compaction runtime runs in the browser and backend, applies when logs are created, and migrates legacy snapshots through an optimistic versioned save after load. Full-state uploads still scale with the remaining live game state, so a future database-backed multi-table deployment should move high-churn chronology and large inventories out of the primary snapshot before claiming hundreds of simultaneous active tables.

Before real ruleset patches are implemented, design and review:

- Patch package shape: notes, content diffs, migration steps, validation metadata, and rollback metadata.
- Permission model: who can author, publish, apply, and rollback patches.
- Game opt-in model: games should not automatically receive balance/rules changes during a live league.
- Snapshot behavior: applying a patch should create a restorable game-state backup before migration.
- Validation: patch application must detect invalid token IDs, Pokemon tier names, shop entries, wheel definitions, and migration failures.

## Live Referee Direction

The existing Rival Saga game tabs remain the Game Manager for long-term state, prep, review, shopping, battle records, logs, ledgers, and host/admin repair. The Live Referee is the player-facing gameplay controller above those systems. Its Play screen presents the current situation and only the choices available to the controlled player.

Live Referee window mode, floating geometry, dock side, pane split, layout focus, density, UI scale, motion, and collapse state are device-local presentation preferences stored through the client UI snapshot. They are not backend game authority. Floating, docked, expanded, and full-table presentations all render the same prompt and screen state; switching or collapsing the presentation does not navigate, rebuild a prompt, or alter an Action operation. Docked layouts reserve Game Manager space, while full-table mode visually suppresses unrelated shell content without browser fullscreen APIs.

The Situation and five-seat table are an adaptive workspace. Surface classification (decision, collection, reading, resolution, or waiting/table status) chooses an automatic proportional split; explicit Situation/Table focus or a persisted divider position overrides it. Collection and reading surfaces own their bounded content scrolling while their command bars remain in reserved grid tracks. At narrow widths the same two panes stack, and compact pentagon styling preserves the five stable seat positions and authoritative status signals.

`state.liveTable` remains a derived prompt layer rather than a separate rules source. Precise `flowState` values distinguish Pregym, Gym Start, Action, Team Build, Team Lock, Sabotage, Team Preview, Rival Battles, Gym Payout, Victory Road, Shopping, and End Gym while preserving the broader rulebook phases.

The persistent gameplay HUD is also derived. `deriveLiveRefereeHudViewModel` and adjacent presentation helpers read the current prompt, prompt priority, flow state, Action counts, team locks, revision windows, battle records, and lingering public effects. They render orientation, a stable five-player pentagon, phase progress, compact chain context, and the collapsed summary without storing a second gameplay cursor. Situation + Choices remains the replaceable center screen.

Decorative effect presentation is reconstructed from the current prompt or persistent result announcement. A new prompt may animate once during the current browser session; reload shows the correct final pending/result position without replaying travel motion. Token art is optional and falls back to a readable effect badge. The animation layer never advances priority, resolves effects, or mutates targets.

For pending events, the newest chain layer determines the current prompt. The directly affected player receives first priority; remaining eligible players follow previous-Gym standings starting after the newest layer's user. Every eligible player explicitly responds or chooses Pass. Owned Tokens that are legal for the current timing category are shown directly. Once everyone passes on the newest layer, fully automated Token chains resolve last-in-first-out without reopening response windows between existing layers. Unsupported effect resolutions are marked `Needs Automation Later` and remain host-repair work.

Each authoritative interaction Activity also owns a `situation` lifecycle record. Its status is one of `pending`, `awaitingResponse`, `awaitingRequiredChoice`, `resolving`, `resolved`, `withdrawn`, `canceledRefunded`, or `failedRecoveryRequired`; it records the current decision owner, required action, progression block, resume point, consumption state, and mutation state. Legacy `status: open` remains a compatibility projection for active records, while terminal lifecycle state wins during normalization. A completion key and mutation-state check make resolution idempotent: a completed mutation with a stale open shell is closed without replay, and an interrupted or unsafe resolver enters explicit host recovery.

Responses are nested records, never standalone Activities. The backend generic Activity route accepts only `/activity`; `/activity/:id/responses` is handled by the response route. Persistence and client normalization reject the historical response-shaped top-level form so a Pass cannot become a phantom pending event. Collapsing the Referee is presentation-only and the active situation remains available through its compact indicator. `Cancel Event And Refund` is a host-only repair action shown only for `failedRecoveryRequired`; it is not legal gameplay negation.

Material Trades can be offered from normal Play or while a response window is paused. Tracked money, Pokemon, Items/Tickets, TMs, and Tokens transfer atomically only after the receiving player accepts. Promises remain audit notes. A pending material Trade becomes the current Live Referee situation; accepting or declining it returns the table to the unchanged gameplay prompt. Trades never become chain layers.

Attached Token effects are persistent state records. Substitute attaches to a specific owned roster instance and intercepts after resolved responses but before the parent mutation. Standard Pokemon-name Curses retain one exact Active Roster anchor but enumerate every matching Active Roster instance across players; each matching Substitute or Arena Curse immunity creates an exact exclusion while unprotected matches continue resolving. Extra Ban is the exception: only its selected anchor is checked for Substitute, and that attachment negates the entire species-wide Ban while every other matching Substitute remains untouched. A future anchorless species Ban needs its own explicit interception policy. The Timing drawer remains Advanced / Repair Controls rather than the normal gameplay path.

Live Table must be designed to support both Individual Turn Order and a future Batch Order mode. Individual Turn Order remains the current enforced Action Phase model. Batch Order should not be implemented until tested, but prompt state should not assume there is always exactly one active player or exactly one pending action.

See `LIVE_REFEREE_GAMEPLAY_CONTROLLER.md` for the canonical gameplay-controller, ordered response-priority, declaration-consumption, and prompt-resolution model. `GAMEFLOW_ARCHEOLOGY.md`, `LIVE_TABLE_ARCHITECTURE.md`, `TOKEN_TIMING_ARCHITECTURE.md`, and `LIVE_REFEREE_EFFECT_DRAWER_ARCHITECTURE.md` remain useful implementation history and subsystem planning, but the gameplay-controller document takes precedence where their older timing assumptions conflict.

## Current Event Commit Points

Chronology and timing windows:
- New confirmed log rows, pending timing windows, responses, and transactions receive monotonic `eventOrder` values for table-auditable order in addition to timestamps.
- `state.interactionEvents` is the alpha pending-event/response-window queue. Open events are pending; resolving or passing the event closes that timing window.
- Manual timing windows can be opened from the Timing drawer when a table event needs a response/transaction pause before it resolves.
- Manual responses can be recorded against a pending event even when the app does not yet understand the exact rules text for that effect.
- `state.transactions` stores pending-acceptance, completed, promised, declined, or canceled Trade records. Trades may stand alone or link to the exact interaction prompt that was paused.
- Accepted material Trades validate the complete offer before applying it, then atomically transfer money, Pokemon, Items/Tickets, TMs, and Tokens. Promise and service text remains audit-only.
- Transactions do not resolve, negate, or rewind a pending event by themselves; the acquired resource still needs a legal response/effect window.
- Some effects need a future Pre-Gym Phase: they are checked at End of Gym, queued for the start of the next Gym, and resolved before Action Phase begins. See `EFFECT_RESOLUTION_ARCHITECTURE.md` for the Professor No Release Fallback example and target metadata.

Canonical phase flow is defined in `TIMING_AND_PHASES.md`. The implementation currently exposes Start of Gym and Action Phase before the Battle Phase sequence, followed by Shopping and End of Gym where supported.
- Pre-Gym resolves or expires queued effects before declarations open at Gym Start.
- The Battle Phase sequence is Team Building, Team Lock, Sabotage, Team Preview, Rival Battle Phase, then Battle Payout.
- Battle Payout owns salary, placement rewards, Victory Road resolution, Momentum calculation/rewards, player record updates, Pokemon record updates, and corrections.
- Shop Phase owns ordinary shop purchases. Department Store is the Action Phase exception for its persisted full-catalog Item/TM visit.

Action Phase:
- Each player has 3 actions per Action Phase.
- Each location visit costs 1 action.
- Action Phase order is locked per Series/Gym when the gym's action state is created. The order follows placement/leaderboard order from first place downward, then cycles until each player has spent their actions.
- Confirming an Action Phase location outside the active turn is blocked by the action confirmation helper.
- Once the backend accepts an exact player/location/service destination reservation, that same reservation may pass through the local starter's duplicate-confirmation guard. Other destinations remain blocked, and a starter failure releases the accepted reservation without spending an Action.
- Action selections should be draft/preview state until the player confirms the visit/effect.
- Confirmed Action Phase visits should later create Activity Log entries and undo data where practical.
- Ranger Credits remain series-scoped. Item Points and TM Points are removed and legacy save fields are inert compatibility data.
- Location definitions live in `actionPhaseRules` so future UI can consume one rules source instead of copying text.

Battle Phase:
- Team lock-in is still preview state until teams are locked.
- Teambuilder drafts are preview state until a player locks a team for battle.
- Battle Recording commits on `Save Battle Record`.
- Battle records are the source of truth for Pokemon performance stats.
- Locked submitted teams mark Pokemon as brought. Battle record participation marks Pokemon as used for battle performance. Benched means a roster Pokemon was not brought, not merely unused in a specific battle.
- MVP Race and Player Sheet Pokemon stats should display derived Battle Phase results.

Shop:
- Shop rows add to cart only.
- `Finalize Purchase` is the purchase event commit point.
- Finalized purchases update balance, inventory, and Activity Log entries.
- Each Shop Phase naturally increases Item and TM shop access by 1 level. This natural increase does not change Item/TM discount points.

Effect Activation:
- Items, tokens, perks, buffs, nerfs, trainer class abilities, rewards, and similar effects should go through the Activation Overlay.
- The overlay should collect actor, effect, target, choices, duration, preview, and confirmation before applying anything.

Pokemon management:
- Adding, releasing, moving, trading, evolving, and modifying Pokemon should be treated as confirmed Pokemon events.
- Pokemon records must keep stable IDs so stats/history follow the Pokemon through trades or evolution.

## Token Automation Status

Token activation is intentionally incremental. The Activation Overlay is the commit point and should store enough prior state for undo before changing rosters, inventory, lingering statuses, or trainer class wheel sessions.

Current first-pass token behavior:

- Token/Ticket boundary: normal Tokens are effect objects and are usually consumed on use. Tickets are key-item-like reward/access resources tied to Pokemon reward systems. Legacy Ticket, Game Corner Ticket, and Badge Point are not normal Tokens.
- Token Timing Engine v1 adds richer token metadata for object type, family, timing windows, activation pattern, persistence bucket, resolution payloads, target type/scope, duration, consumption behavior, response behavior, and resolver id. The first wired representatives are Extra Encounter, Restrict, Safeguard, Immunity, and Reroll Token. The engine deliberately separates consumed Token records from created lingering/effect records.
- `token-control-effects.js` is the pure resolver foundation for Restrict, standard species-wide Curses, instance-scoped restrictions, Extra Ban, Unban, Substitute interception, Arena Trap, Clear Smog, Rage Candy Bar, Incinerate, Steal, Wicked Blow, Move Deleter, explicit ongoing-effect replacement/suppression, Smokescreen replacement, copied-activation provenance, post-payout Purge/Revenge, and delayed Teleport records. Effect records separate the declared target from `applicationScope` and preserve singular anchors plus selected, affected, protected, and excluded exact collections. Atomic operations retain pre-mutation snapshots, stable operation IDs, lifecycle state, and undo/refund data where required.
- Control tokens: Rage Candy Bar, Arena Trap, Clear Smog, Wicked Blow, Incinerate, Steal, Class Change, Rebrand, Restrict, Extra Ban, Unban, Cold Wave, and Move Deleter are the target Control timing group. Link Cable has been removed from Rival Saga and is filtered from legacy catalogs, inventories, and Pokemon buffs during migration. Cold Wave and Wicked Blow are `verifiedComplete`: ongoing-effect consumers use suppression-aware lookup, while Wicked Blow preserves exact Active-roster identity and only updates pre-existing team references. Mixed-tier terminal branches remain an explicit fail-closed boundary rather than an invented tier choice.
- Live Referee effect choices are derived from exact owned inventory records that resolve to canonical Token contracts, then pass runtime-usability and current-timing checks. Token categories, Shop containers, unknown placeholders, Tickets, and blocked/development-only effects never become activatable choices. Canonical Curse contracts expose an explicit Sabotage-only Curse window without opening Sabotage to ordinary Control effects. Wicked Blow target eligibility waits for the production `pokemon-build-data.js` dataset and uses the resolver's existing evolution/final-tier path; asynchronous loading is represented as a non-terminal UI state rather than permanent target ineligibility.
- Arena Trap is a team mutation, not only a Team Lock validator. Its exact-instance lingering status owns the forced draft insertion, forced slot reference, minimum Badge assignment, Curse protection, repair state, tier-at-resolution metadata, optional compensation grant, and cleanup boundary. Eligibility asks the same authoritative question as Teambuilder: whether the target owner can currently bring that exact Active-roster Pokemon after tier, Badge-capacity, Ban, Restrict, exact restriction, and exemption checks. Compensation is a separate calculation: two or more ordered Battle Tier steps below the Natural tier, with Elite tiers counted as distinct steps, requires the target owner to choose one approved injected Ability or move before Team Lock. Full teams temporarily carry the inserted seventh member and require the player to remove an unlocked member; forced members are never silently displaced.
- Final effect presentation reads `finalResultSummary` rather than reconstructing causality from log prose. The structure preserves the original declaration, selected target/application scope, response effects, canonical final outcome, created/removed/prevented mutations, exact affected/excluded instances, consumption/refund records, continuation, and visual chain nodes. Detailed passes and priority events remain in History.
- Protection and encounter tokens: Substitute has a structured owned-instance attachment and pre-mutation interception path. 7 Tools Of The Bandit and Counterspell share an exact-inventory runtime. Follow Me creates a parent-gated Gym-long relationship, while Ditto transforms one exact inventory record into a chosen canonical Token. After You creates a provenance-linked non-inventory activation; unsupported interactions fail closed individually. Teleport is verified for exact root Control-controller Token declarations and merges its delayed and returned phases into one causal History operation. Reroll is verified on exact unresolved Encounter and supported wheel results with superseded revision linkage. Honey is verified as a non-respondable End-of-Action exact-result copy that enters normal acquisition under a fresh identity. Revenge retains its verified post-payout required-choice lifecycle.
- Curses: Toxic, Iron Ball, Flame, Silencing, Imprison, Devolve, Haze, and Foresight are Pokemon-name species effects unless an individual contract says otherwise. Their declaration anchor is one exact Active Roster instance and their application enumerates matching Active Roster instances globally. Haze takes two different species anchors and preserves per-instance Substitute/Curse immunity. Devolve overlays one safe direct pre-evolution without changing roster identity. Knock Off is exact-instance and destroys one exact held Item or TM grant; final TM access loss opens exactly one mandatory Sabotage revision from current locked-build provenance without silently deleting the move. Purge targets one player and is an absolute post-payout operation with no ordinary response or Trade window; it ignores gameplay negation, redirection, Substitute, and Curse immunity. Foresight remains blocked until authenticated player-scoped move-only delivery exists, and the backend recursively strips private records from shared payloads.
- Gym Modifiers are a future system, separate from Tokens. A modifier may be selected randomly and change one or more settings for a Gym. No catalog, timing, stacking, persistence, UI, or automation contract is approved yet.

Teambuilder consumes active lingering statuses and Pokemon buffs where the rules are already local: Rage Candy Bar raises EV caps, Imprison locks EVs/IVs/nature, Silencing locks extra move slots, forced-orb curses lock the item, Haze negates buff-derived bonuses, Move Deleter/Knock Off block selected moves, Foresight warns that a set will be revealed, and Devolve/Arena Trap show warnings.

## Simulation Harness

`npm.cmd run simulate:series` runs a deterministic bot league simulation through encounters, shop purchases, battles, Game Corner-style rewards, Token activations, lingering status expiry, steals, and incinerates. The harness reads real Token/shop/Pokemon pool data from source files and fails on state-shape invariants such as negative balances, duplicate inventory IDs, missing Token definitions, orphaned Pokemon/status records, and expired statuses that remain active.

By default, each run writes a readable Markdown report and a full JSON report under `data/simulations/`. The Markdown report is for quick review of standings, rosters, inventories, statuses, issues, and event timeline samples. The JSON report keeps the full event log for deeper debugging.

Use seeds to replay failures:

```powershell
npm.cmd run simulate:series -- --series 4 --players 8 --seed beta-long
```

Use `--no-report` for terminal-only checks.

Trainer Class token activations are intentionally skipped in this harness until trainer class data is restructured and implemented.

## Encounter Data Imports

PokeAPI can be used as an offline source for region/location/location-area encounter candidates. The browser should not call PokeAPI during normal play. Import scripts should write local draft data and cross-check reports first, then Rival Saga can decide which official encounters, cross-generation additions, special entries, and custom weights belong in live wheels.

`npm.cmd run import:encounters:hoenn` builds a Hoenn draft from Ruby, Sapphire, Emerald, Omega Ruby, and Alpha Sapphire encounter data. It groups Hoenn locations into draft before-gym buckets and cross-checks those candidates against the current hand-authored Hoenn encounter wheels in `app.js`.

## Teambuilder Direction

Rival Saga should be the source of truth for legal team construction. External tools such as Pokemon Showdown should only be needed for the actual battle, not for deciding what a player is allowed to bring.

Runtime teambuilding must use local data only:

- imported Rival Saga Natural movepools,
- local Pokemon type/stat/ability metadata,
- local move metadata and effect text,
- local ability metadata,
- local item metadata,
- owned Rival Saga Pokemon records,
- owned Rival Saga inventory.

Pokemon build data is generated offline into `pokemon-build-data.js`. The refresh pipeline is:

1. Import Rival Saga legal level-up learnsets with `scripts/import-levelup-build-data.js`.
2. Enrich that file from PokeAPI with `scripts/import-pokeapi-build-data.js`.
3. Import Bulbapedia `Rem.` rows with `scripts/import-bulbapedia-rem-moves.js`; these remain legal level-up moves. Every other legacy learn-method classification is normalized into the TM category because only level-up moves and TMs exist in gameplay.
4. Run `npm.cmd run generate:move-classification` to rebuild rare-TM naturalization from the final imported compatibility data.
5. Ship only the compact generated Rival Saga datasets to the browser.

Pokémon Showdown is a development-only historical compatibility source for the build-data importer. Its source codes restore cross-generation Egg, Tutor, machine, event, restricted, and pre-evolution move access that PokeAPI may omit from current records. Run `npm.cmd run audit:build-data` after refreshing the generated bundle; the audit requires every supported Showdown move to land in exactly one Rival Saga bucket and explicitly checks Medicham/Fake Out and Sceptile/Shed Tail regressions.

The generated `bulbapedia-rem-moves.json` file is the auditable reminder-move list. Rebuild and apply it with:

```powershell
node scripts/import-bulbapedia-rem-moves.js pokemon-build-data.js pokemon-build-data.js --all --refresh
```

The reminder import reads supported-game leveling-up tables, excludes Let's Go Pikachu/Eevee, Legends: Z-A, and Legends: Arceus sections for non-native Pokemon, and maps separate form tables before updating the shared browser dataset.

The browser should not call PokeAPI during normal play. External data fetching is a developer refresh step, not a runtime dependency. PokeAPI enrichment should preserve Rival Saga legality fields and only add local metadata such as base stats, types, normal/hidden abilities, move PP/power/accuracy/category/effects, and species basics for Pokedex/intel surfaces.

Held-item descriptions use the smaller generated `item-reference-data.js` bundle so Shop and Teambuilder item help does not force the full Pokemon build dataset to load. Refresh it with `scripts/import-pokeapi-item-data.js`. `shop-choice-data.js` is the canonical source for bundled shop shelves such as Berries, Weather Rocks, Z-Crystals, and unlisted Mega Stones. `shop-data.js` derives each shelf option into a concrete Item Shop product, hides unresolved shelf-parent entries from the storefront, and preserves the derived catalog ID through cart and inventory records. Item Shop folders in `app.js` are presentation-only navigation over that concrete catalog; they do not create purchasable inventory entries. Normal Item browsing uses the explicit `shop-browse-data.js` placement table, where each concrete product is either `featured` on the root storefront or assigned to one folder path. Roles, tags, category, price, and other functional metadata remain available for search/filtering but must not infer normal browse placement. Item Shop visuals are localized under `assets/shop/` and described by `shop-sprite-data.js`: PokeAPI item sprites are preferred, Pokemon Showdown item atlas crops are used only for canonical items without PokeAPI sprite files, Pokemon Showdown Tera type icons cover Tera mechanic products, and the audit script must keep known products at zero unresolved initials fallbacks.

The Pokedex is a runtime reference consumer of this same local build-data bundle. Pokedex entries should use local species stats, abilities, typing, and Natural move metadata for search and detail display, while player-specific legality such as owned TMs, inventory items, buffs, perks, and extra EV caps should stay in Teambuilder/Intel surfaces where the active player context is known.

Move legality starts with this rule:

- Every owned Pokemon immediately has access to its full Rival Saga Natural movepool: imported level-up moves, Move Reminder (`Rem.`) moves, and rare TM-style compatibility promoted by the rule below.
- Every permitted non-level-up source, including Egg, Tutor, machine, and special teaching methods, is represented as a Rival Saga `TM` move. It remains visible but unavailable until that exact TM is in the player's inventory.
- A TM-style move compatible with no more than five distinct evolution-line compatibility groups is promoted into those Pokemon's Natural movepools and removed from the TM shop. Existing `familyChainId` data defines the preferred group key; alternate forms and Mega Evolutions share their underlying line identity, and source entries without a line fall back to species/form identity for auditability. The generated record preserves former learn methods and exact compatible forms for auditing.
- `move-classification-rules.js` holds manual singles exclusions, globally removed moves, and the rare-compatibility threshold. `move-classification-data.js` is the deterministic generated result. Excluded and removed moves are filtered consistently from level-up, TM, buff, and effect-granted Teambuilder options, the TM coverage audit, the shop, and future build-data imports rather than being hidden only in one UI.
- Embargo is removed because its held-item suppression does not belong in Rival Saga competitive play. Hail is removed in favor of Snow so both weather versions do not coexist.
- Learnsets merge the main-series generational groups from Red/Blue through Scarlet/Violet and its DLC, excluding Let's Go Pikachu/Eevee and Legends: Z-A. Legends: Arceus sources are excluded for existing Pokemon; Pokemon and forms introduced by Legends: Arceus retain their Legends: Arceus movesets. Showdown historical compatibility is filtered against PokeAPI version groups when PokeAPI has explicit move history, so Legends-only sources cannot be reintroduced through generation-coded Showdown learnsets. Separate Stadium, Colosseum, XD, and Pokemon Champions teaching sources are not part of this generational pool.
- The builder should merge immediately available Natural moves with compatible owned TMs, then validate drafts against that merged list.
- Move options should carry a Rival Saga source label such as `level-up`, `natural`, `tm`, or future `buff` so the UI can filter by how that move is legal.
- Teambuilder move access is resolved once for both the picker and final validation. Sources are imported level-up/Reminder moves, exact compatible TMs in the player's inventory, active Pokemon move buffs, owned perk rules such as Move Maniac, and targeted grants recorded by future perk/class effect handlers. Haze-negated Pokemon buffs do not grant moves. Stored effect grants may target a roster record or species and must identify their source as `perk`, `class`, `buff`, or `manual`.
- Structured move-access grants live on the owning player in `moveAccessGrants`. Each grant records a stable ID, source/source record, target roster Pokemon or species, grant mode, canonical move names, duration and Series/Gym scope, uses/status, and timestamps. The shared resolver ignores canceled, consumed, expired, removed, replaced, and zero-use grants. Effect implementations should call `grantTeambuilderMoveAccess` instead of adding custom Teambuilder exceptions; `revokeTeambuilderMoveAccess` is the matching removal path.
- Dragon's Den move rewards are a production writer for this contract: they validate that the selected move exists, retain a readable Pokémon buff label, store a permanent targeted location grant, and include the previous grant collection in notification-resolution undo data. Dragon's Den Ability rewards remain Ability buffs. Day Care uses the same canonical TM taxonomy.
- Inventory records identify TMs with `type: "TM"`; their elemental move type is stored separately as `moveType`. State normalization repairs older shop and Max Testing records whose `type` was incorrectly saved as the elemental type, using their `tm-*` catalog identity. New TM purchases and testing grants use the corrected schema.
- `npm.cmd run audit:tm-shop` compares every non-excluded, non-naturalized TM-gated compatibility move in `pokemon-build-data.js` with the purchasable TM catalog. It reports naturalized rare moves, zero-compatibility removals, and event/restricted-only gaps separately from moves with ordinary teaching sources. Missing entries require an explicit Rival Saga tier and price decision; the audit does not invent shop balance.
- TM Shop browse metadata lives in `tm-browse-data.js` and is presentation-only. The shop has Damage, Setup, Disruption, Field, and Support folders, with per-folder Staples, Main, Niche, and Junk Drawer shelf prominence. A move may occupy multiple folders, All deduplicates and uses the highest prominence, and the default browse state is All -> Staples. The browse taxonomy does not affect move legality, inventory identity, prices, Natural filtering, or purchase behavior; Junk Drawer moves remain purchasable. Future Pokemon-aware TM browsing, such as a `My Pokemon` mode backed by roster learnability, is planned direction only and is not part of the base browse filter.

Move usefulness is guidance, not legality. `showdown-move-usefulness.js` mirrors Pokemon Showdown's current Gen 9 singles `BattleMoveSearch` grouping and classifies moves as `Useful` or `Usually Useless` for the selected species, ability, item, and complete learnset. Teambuilder keeps availability separate: useful unowned TMs remain unavailable and stay below every currently usable move. The default view groups useful moves first, followed by usually-useless moves, then repeats that ordering inside `Learnable Later`; players can filter to either usefulness group without changing what is legal.

Teambuilder Item and Ability pickers use a discoverable-catalog model: the full imported catalog remains searchable, but only player-owned items and species/buff-granted abilities are assignable. Unavailable entries stay visible and muted. Future Trainer Class, perk, and buff systems should extend the availability helpers instead of creating separate pickers or hiding catalog entries.

### Slot Badge Points And Battle Forms

Badge Points are a shared Teambuilder budget, not a Pokemon-record stat. Each occupied Battle Team slot automatically reserves the minimum Badge Points required to raise the current Gym's natural Battle Tier cap to that slot's selected battle species. Adding, removing, replacing, or changing the selected battle species recalculates the reservation and the player's remaining pool. The slot stores the calculated reservation so locked-team snapshots remain deterministic; players do not manually over-assign Badge Points to a slot.

Owned Pokemon records now distinguish public committed form from private draft intent:

- `currentSpecies` is the public committed form.
- `selectedBattleSpecies` belongs to a Teambuilder/Battle Team slot and is private until Team Preview.
- The locked Battle Team snapshot stores Pokemon record id, committed species at lock, selected battle species, assigned Badge Points, effective slot cap, legality, and pending evolution.

When all Battle Phase teams are locked, the Battle Phase enters Sabotage. Locked snapshots stay private, public Pokemon records continue to show `currentSpecies`, and pending evolutions are not committed yet. Only the explicit Team Preview reveal step makes locked teams public, marks the shown Pokemon as brought through battle reporting, commits any legal pending slot evolutions to the Pokemon record, logs the reveal, and keeps the evolved form for the rest of the Series. Series-reset evolution rollback remains a future Series Transition hook.

Battle Phase revision windows are deliberately split into two buckets. A Sabotage Revision Window (`revisionType: "sabotageSetRevision"`) happens during Sabotage after a disruptive effect changes one locked Pokemon's legal set; it does not change team membership and validates only that Pokemon's set against active curses, restrictions, buffs, slot rules, moves, ability, item, EVs, IVs, and nature rules. A Team Preview Revision Window (`revisionType: "teamPreviewMembershipRevision"`) happens during Team Preview when an effect changes which Pokemon are on the team; it changes membership, keeps existing restrictions active, validates the full revised team, and requires reconfirmation before Team Preview continues. Mixed cases should resolve membership first, then any set revision for the new Pokemon.

Team build drafts should reference stable Rival Saga Pokemon record IDs, not only species names. This matters when a player owns multiple copies of the same Pokemon, trades a Pokemon, evolves it, or receives copy-specific buffs/nerfs.

Draft slots default to six but must support extra Rival Saga roster/bench slots. The UI can cap this for sanity, but the data model should preserve more than six slots and Battle Phase can later decide how many are selected, benched, or exported for a given format.

Slot-level build data should store battle prep values without mutating the Pokemon record itself. This includes level, ability, held item, nature, moves, notes, and EVs. Rival Saga can grant extra EV capacity, so EV validation should not assume standard cartridge caps unless a future ruleset explicitly defines those caps.

New Teambuilder slots use Level 100 as the Rival Saga baseline. Explicitly saved or imported levels remain valid overrides; a Showdown import with no `Level:` line falls back to Level 100.

Recommended draft shape:

```js
state.teambuilder = {
  activeBuildByPlayerId: {},
  buildsByPlayerId: {
    [playerId]: [{
      id,
      playerId,
      name,
      series,
      gym,
      format,
      slots: [{
        pokemonRecordId,
        ability,
        item,
        moves: [],
        nature,
        evs,
        notes
      }],
      createdAt,
      updatedAt
    }]
  },
  selectedPlayerId: "",
  selectedBuildId: ""
};
```

The first implementation should support owned active roster Pokemon, level-up moves, owned TMs, owned held items, basic duplicate Pokemon validation, and copy/export text. Battle lock-in should then consume a valid draft instead of being edited independently.

Placement lives in Player Hub as a dedicated Teambuilder subtab. Player Hub is the prep workspace for trainer-owned resources: sheet, inventory/shop, roster browsing, build drafts, and optional note tools. Battle Phase should stay focused on matchup scheduling, locking a selected valid build, recording battle results, and consuming the exported/locked team rather than owning the build editor itself.

The Teambuilder uses a persistent two-pane workspace. The left pane switches between the player's Active Roster and the full local Pokemon Database while the active draft remains visible on the right. Database species may be added as editable draft candidates for set research, but an ungranted candidate stores `databaseSpeciesKey` / `databaseSpeciesName` rather than a Pokemon record id and always fails team legality. If the active player owns that exact species on their Active Roster, the database add action uses the real owned record instead.

Database ownership context is public game information. Species rows may summarize which trainers currently hold that species in Active Roster or Legacy; Released Pokemon are intentionally omitted. Future temporary/rental ownership should only appear when its source says that information is public.

Intel remains observation/planning data and should not mutate legal build options. A dedicated Prep Notes column is no longer part of the Teambuilder layout; future notes can return as an optional tab or notepad that does not displace the roster/database and draft panes.

## Profile-Locked Prep and Intel

Player prep is private. The Shop, Teambuilder, Battle Phase team lock-in, effect resolution, private notifications, purchases, and any other trainer-owned prep action should only be viewable or mutable when the active Site Shell profile controls the matching Rival Saga trainer slot. Host/admin tools can exist, but they should be explicit moderation/development surfaces instead of silently letting a host inspect another player's private prep.

The first client-side permission layer uses a shared profile-control check for linked trainer slots. Once a game has Site Shell membership links or trainer `siteUserId` values, private prep surfaces should render a locked state unless the active Site Shell profile owns that trainer. Old unlinked local development games may remain open until their trainer slots are linked, so existing saves are not stranded during migration.

Intel is different: it is planning data owned by the viewer. A player can inspect public or observed opponent information, such as roster Pokemon, revealed inventory, revealed buffs/nerfs, battle history, tags, and notes, but cannot see an opponent's private build drafts, cart choices, unresolved private effects, or hidden teambuilder work.

Intel notes should be scoped by viewer profile, game, and target:

```js
state.playerIntelByProfileId = {
  [viewerProfileId]: {
    [gameId]: {
      globalNotes,
      players: {
        [targetPlayerId]: {
          notes,
          pokemon: {
            [targetPokemonRecordId]: { tag, notes }
          }
        }
      }
    }
  }
};
```

The current client uses this scoped Intel container for the opponent drawer. Legacy unscoped `state.playerIntel` is preserved as a migration source for the game owner/local-dev viewer so old notes do not vanish, while newly edited Intel saves under the active viewer profile. In linked games, no logged-in Site Shell profile means Intel facts can still be browsed, but note and tag editing is disabled until a viewer profile is active.

The same Intel data should remain available from a global drawer so players can check notes from Player Hub, Battle Phase, Pokedex, or other pages without losing context. A future compact notepad tab may surface it in Teambuilder without becoming a permanent third column.

Do not expose another player's real Teambuilder as a tab switch. If Rival Saga needs opponent-side building tools, create a read-only Scout Mode that lets the viewer model possible opponent sets from public/observed legality and their own assumptions. Scout Mode can share the Teambuilder UI language, but it must save as the viewer's Intel/analysis, not as the opponent's private build.

For the current local backend, this is primarily a UX/data boundary, not real security. A hosted version must enforce the same permission rules in API routes and storage so private prep data is not sent to clients that should not see it.

## Battle Result Event Direction

Future `Battle Result Saved` events should be responsible for:

- saving the battle record
- updating or deriving player win/loss records
- updating or deriving Pokemon KOs/deaths
- updating or deriving Pokemon battles won/lost
- updating MVP Race calculations
- updating Player Sheet Pokemon stats
- applying money payouts
- applying momentum changes when rules are known
- updating battle log/history
- creating Activity Log entries
- storing undo data where practical

Future battle payout automation should fit into the battle save confirmation flow:

1. Calculate payout preview.
2. Show salary, win/loss payout, class/perk/token modifiers, and total.
3. Save Battle Record.
4. Apply payout and log the event.

Do not apply payout changes while the battle form is merely being edited.

## Money Payouts From Battle Phase

Most player money is earned through gyms and battles. Future Battle Result Saved events should be able to calculate and preview battle payouts before the result is confirmed.

Battle payout inputs may include:

- base salary
- win payout
- loss payout
- trainer class bonuses
- perk bonuses
- momentum effects
- active token/effect modifiers
- other future game effects

The Battle Recording flow should eventually show a payout preview before saving.

Example:

```text
Gold payout:
Base Salary: 1000
Win Bonus: 1500
Trainer Class Bonus: +500
Total: 3000

Steevee payout:
Base Salary: 1000
Loss Bonus: 500
Total: 1500
```

The full salary formula should not be implemented until the real values are known. The important architecture point is that payout automation belongs inside the confirmed Battle Result Saved event.

## Effect Activation Events

Items, tokens, perks, buffs, nerfs, trainer class effects, Bulletin Board rewards, Victory Road rewards, and similar systems should activate through an event flow.

Do not make effects apply instantly from random buttons.

Preferred flow:

1. Click effect/item/token/perk.
2. Contextual menu opens.
3. Choose Activate.
4. Activation Overlay opens.
5. Select valid target/options.
6. Preview consequences.
7. Confirm.
8. App applies effect.
9. Activity Log records it.
10. Undo is available if supported.

The Activation Overlay should eventually understand:

- who is activating the effect
- what effect is being activated
- valid target type
- selected target
- optional choices
- duration
- result
- confirmation summary

This lets the app become rules-aware instead of only a visual tracker.

See `EFFECT_RESOLUTION_ARCHITECTURE.md` for the target timing/source/target/resolution/consumption model that should guide effect metadata before more automatic token, class, perk, item, TM, Pokemon, and manual host-event resolvers are wired.

## Action Phase Location Rules

The Action Phase uses location-based confirmed events. Players should choose where to spend actions, preview consequences, then confirm the visit/effect.

Current surviving location rule foundations (Route Exploration is documented separately by the current Route runtime):

- Department Store: one persisted visit per Gym over the unrestricted Item and TM catalogs, with one 75% sale, capped normal savings, and three stable Clearance rolls. Move Dojo and Item/TM Points are removed.
- Day Care: deposit up to two Pokémon for $1,500 each. They remain visible but unavailable and return automatically next Gym with +3 Levels and a TM choice.
- Ranger Base: repeatable escalating actions. First action scouts one moveset from each player during Team Preview; second lowers one Pokemon to the next lowest gym level cap; third shields one Pokemon from bans until the next Ban Phase ends. Each action gives 1 Ranger Credit. Ranger Credit milestones reset each series.
- Graveyard: confirm a batch release, total consolidated-tier Destroy Value, and grant one Curse Wheel reward per complete $6,000.
- Game Corner: buy/use consolidated Battle Tier Tickets or play the $2,000 Slot Machine with the finalized 20/30/25/15/7/3 table.
- PC: Legacy Tickets can only be used here. Supports Legacy releases and 1/2/3-ticket Legacy effects.
- Pokemon Center: restore recent released Pokemon for tier-scaled costs or buy an Emergency Immunity Token for 5000 that expires at gym end; current behavior has no dependency on the retired pre-Route encounter runtime.
- Dragon's Den: leave exactly one Pokémon for one Gym at consolidated-tier cost, then choose a legal move or AAA-approved Ability.
- Silph Co. R&D: develop up to three Pokémon at consolidated-tier costs; each persists two Ability and four Move options until one is selected.
- Bulletin Board: once per Exploration/Action Phase, receive 3 random quests, reroll one for free, and complete quests for cash rewards. Completing all 3 grants a free Bulletin Board visit next gym.

These rules should not become instant-apply buttons. They should become confirmed Action Phase events.

## Temporary Pokemon Facilities

Daycare and Dragon's Den are temporary Pokemon facility systems. Pokemon should remain visible on the Player Sheet while unavailable, with a facility badge/status instead of being removed from the roster. Breeder remains a Trainer Class name, not the Daycare location name.

Daycare behavior:

- Placing a Pokemon in Daycare marks it unavailable with the legacy `breederStatus` save field until a future data migration renames the field.
- Deposited Pokémon have pending facility rewards: `+3 Levels` and `TM Move`.
- Gym Start returns eligible Pokémon automatically, clears the unavailable status, applies +3 Levels once, and creates a choice from the species' complete canonical TM learnset.
- `rewardApplied` makes repeated Gym Start processing idempotent.

Dragon's Den direction:

- Dragon's Den should use the same facility-status idea, but return automatically rather than through manual pickup.
- Placement marks the Pokémon unavailable and stores one generic reward choice.
- Cost scales by consolidated Battle Tier; every stay lasts one Gym.
- Gym Start returns the Pokémon idempotently and persists the unresolved legal move / AAA-approved Ability choice.

## Temporary Pokemon Grants

Temporary Pokemon granted by perks, Trainer Classes, rentals, or events are a separate system from facility-unavailable owned Pokemon. They should use one reusable grant contract instead of source-specific roster exceptions.

Conceptual grant shape:

```js
{
  sourceType: "Perk",
  sourceId: "Wildcard",
  playerId,
  quantity: 1,
  selectionMode: "chooseAny",
  maximumTierOffset: 2,
  minimumTierOffset: null,
  startWindow: "teamSubmission",
  expirationWindow: "endOfBattlePhase",
  countsAsRoster: true,
  countsAsPermanentOwnership: false,
  canTrade: false,
  canRelease: false,
  canEnterLegacy: false
}
```

Temporary selection and record lifecycle:

1. The Team Builder detects valid grants from active perks, Trainer Classes, events, or rentals.
2. A source-authorized action opens the shared Species Browser with that grant's pool and tier filters.
3. Before Team Lock, the choice remains a `PendingTemporary` entry in the private team draft. Searching or changing the choice must not create Pokemon records.
4. Team Lock revalidates the source, tier limit, quantity, timing window, and team legality.
5. A valid lock creates one normal Pokemon record with a real ID, `rosterType: "Temporary"`, source metadata, start/expiration windows, and `temporaryActive: true`.
6. The locked team replaces the pending choice with that record ID.
7. End of Battle Phase sets `temporaryActive: false`, removes future roster eligibility, returns any surviving held item, and preserves the record and battle history. Expiration is not a release.

While active, a Temporary Pokemon appears on the Player Sheet and in the Team Builder, can be configured normally, and records battle statistics. It does not count as permanently obtained, trigger catch/obtain effects by default, enter Legacy, become tradeable/releasable, or retain upgrades after expiration.

Wildcard uses this contract during Team Submission. It grants one choice from any Battle Tier at or below the current Battle Tier Cap plus two tier steps, with no lower bound, and expires at End of Battle Phase. The Species Browser can now place an explicitly unavailable database candidate into a draft, but source-authorized temporary legality and Team Lock commit remain deferred until perk timing implementation.

## Activity Log And Undo

Every confirmed event should create an Activity Log entry.

Undoable entries should store enough data to reverse the event:

```js
{
  id,
  type,
  message,
  timestamp,
  undoable,
  undone,
  undoData: {
    actionType,
    affectedIds,
    previousState,
    newState
  }
}
```

Undo flow:

1. Read `undoData`.
2. Reverse the original event.
3. Mark the original log entry as undone.
4. Add a new log entry saying the event was undone.
5. Re-render affected UI.

Priority undo coverage:

1. Save Battle Record
2. Clear Current Gym Battles
3. Add Pokemon
4. Release Pokemon
5. Move Pokemon Active/Legacy/Released
6. Add Buff/Nerf
7. Finalize Purchase
8. Activate Effect

Current undo support already covers saved battle records, cleared current-gym battle records, and added Pokemon.

## Source Of Truth Rules

Avoid disconnected manual systems.

Battle Phase is the source of truth for battle performance:
- KOs
- deaths
- battles won/lost
- brought/benched/on-roster
- differential
- winner

Shop/cart finalization is the source of truth for purchases:
- money changes
- inventory additions
- purchase log entries

Effect Activation should become the source of truth for activated effects:
- targets
- durations
- applied modifiers
- logs
- undo data

## Implementation Guidance For Now

Do not try to automate every game system at once.

For near-term work:

- Add comments/data structure foundations where useful.
- Keep battle save, purchase finalization, and effect activation as confirmed commit points.
- Avoid adding instant-apply buttons that bypass logs.
- Add undo data to new confirmed events when practical.
- Leave salary, perk, trainer class, token, bulletin board, and Victory Road automation as future rule modules until their values and edge cases are known.

The long-term goal is:

Enter data -> confirm event -> app updates connected systems -> log records action -> undo can reverse important actions.

## Acquisition Family Architecture

The base Pokemon data/sprite layer remains the source for Pokemon names, forms, and images. Rival Saga adds a separate custom metadata layer on top of that base data for game-specific rules such as Battle Tier, acquisition family, encounter eligibility, form policy, and future unlock behavior. Do not overwrite the base Pokemon/sprite database with Rival Saga tier data.

There is no separate Game Corner-specific Pokemon tier taxonomy. Tiered acquisition systems now use Battle Tier families as the canonical acquisition structure.

Battle Tier families:

- LC + LC Elite = LC acquisition family
- Safari + Safari Elite = Safari acquisition family
- Poke + Poke Elite = Poke acquisition family
- Great + Great Elite = Great acquisition family
- Ultra + Ultra Elite = Ultra acquisition family
- Master + Master Elite = Master acquisition family

Battle legality does not change. For example, a Safari Elite Pokemon remains Safari Elite for Battle Phase legality even though it belongs to the Safari acquisition family.

Acquisition family is used for systems such as Game Corner wheels, Game Corner Tickets, Rich Kid Rental Stable tier selection, tier-based random Pokemon acquisition, Dragon's Den/Pokemon Center-style family-scaled costs, and other reward pools that ask for a rarity band.

Use distinct names:

- `balanceTier` / Battle Tier: competitive tier and battle legality.
- `acquisitionTier` / acquisition family: which rarity family can obtain the Pokemon.
- `battleEligibilityTier`: future form-specific battle legality, when a current/evolved form differs from the family acquisition source.
- `unlockedBattleTiers`: which Battle Tiers are currently legal for the gym after modifiers.

The current code architecture for this layer is:

- `ACQUISITION_TIER_FAMILIES`: canonical acquisition family definitions and their Battle Tier members.
- `GAME_CORNER_TIERS`: compatibility definitions for older Game Corner Ticket/tier save data.
- `rivalSagaPokemonTierMap`: legacy imported source text for roll-pool entries. Its old Safari Zone/Pokeball/Greatball/Ultraball/Masterball ids normalize into acquisition families.
- `normalizeAcquisitionFamilyId(value)`: maps old and new text/ids into `lc`, `safari`, `poke`, `great`, `ultra`, or `master`.
- `acquisitionFamilyIdFromBattleTier(tier)`: converts a Battle Tier or Elite Battle Tier into its acquisition family.
- `getPokemonRollPoolTier(name)`: returns the Pokemon's acquisition family, preferring explicit overrides and then deriving from Battle Tier.
- `getPokemonFamilyAcquisitionTier(name)`: resolves evolved/alternate family members through aliases/cache before returning an acquisition family.
- `getPokemonAcquisitionTier(name)`: family acquisition helper used by cost/scaling systems.
- `pokemonFamilyTierCache`: stores resolved evolution-family acquisition families for evolved Pokemon looked up through the species/evolution-chain data.
- `getPokemonByGameCornerTier(tier)`: compatibility helper that returns Pokemon assigned to an acquisition family for Game Corner Ticket rolls.
- `getPokemonTierLabel(tier)`: converts acquisition family ids or legacy ticket text into player-facing family labels.

Game Corner Ticket placeholders:

- Safari GC Ticket
- Poke GC Ticket
- Great GC Ticket
- Ultra GC Ticket
- Master GC Ticket

Tickets are key-item-like reward/access resources, not normal single-use effect Tokens. Legacy Tickets and Game Corner Tickets should be typed/displayed as tickets even when old save data still calls them tokens.

Game Corner Tickets and Legacy Tickets belong in the Utility Shop, not the Token Shop. Insurance has been removed and should not appear as a shop entry, token effect, utility item, or Graveyard-destroyable token target.

### Series Evolution Locks

The normal acquisition rule remains: when a player obtains an evolved Pokemon, the lowest valid evolutionary stage is added to their roster.

If the obtained Pokemon comes from a branched evolution line, the owned Pokemon receives a Series Evolution Lock toward the originally obtained branch. The lock lasts only for the current Series and does not bypass Battle Tier restrictions.

Examples:

- Glaceon rolled -> Eevee received -> locked to the Glaceon branch for the current Series.
- Gallade rolled -> Ralts received -> Ralts/Kirlia remain usable, but the Pokemon cannot become Gardevoir during that Series.
- Politoed rolled -> Poliwag received -> the Pokemon cannot become Poliwrath during that Series.

Owned Pokemon records can store:

- `acquiredSpeciesId` / `acquiredSpeciesName`: the Pokemon originally rolled or obtained.
- `rosterSpeciesId` / `rosterSpeciesName`: the lowest valid stage actually added to the roster.
- `seriesEvolutionLockSpeciesId` / `seriesEvolutionLockSpeciesName`: the branch target for the current Series.
- `seriesEvolutionLockSeriesId`: the Series that created the lock.

When checking legal evolution options, active Series Evolution Locks restrict choices to species on the ancestry/path toward the locked species. At Series end, the app clears all locks for the ending Series and creates one summary notification per affected player.

Future Battle Phase team validation should eventually check:

- banned status
- restricted status
- Battle Tier legality for the current gym
- active Series Evolution Lock branch legality
- special modifiers from perks, trainer classes, tokens, and effects
- current Pokemon status: Active / Legacy / Released
- Daycare, Dragon's Den, or other unavailable statuses when implemented

Current Game Corner Ticket flow:

1. Player goes to Game Corner.
2. Player chooses Use Game Corner Tickets.
3. Player spends 1 Action to open or reuse a Game Corner session.
4. Player may use any number of owned Game Corner Tickets during that same visit/session.
5. Player selects an acquisition family ticket.
6. App rolls Pokemon from that acquisition family.
7. If the result is currently banned, the player gets a free reroll because that Pokemon cannot currently be used.
8. If an evolved branched Pokemon is confirmed, the lowest stage is added and a Series Evolution Lock notification is created.
9. Ticket is consumed only after the player confirms a Pokemon choice.

The current implementation rolls choices from acquisition-family pools, excludes banned Pokemon from final choices, consumes the ticket only after confirmation, adds the selected/lowest-stage Pokemon to the Active roster, and records the result in the grouped Game Corner Activity Log. Extra costs and requirements are displayed as notes and are not enforced yet.

## Pokemon Index And Form Policy

Rival Saga needs a Pokemon Index layer between raw Pokemon data and player-owned Pokemon records.

There are two different concepts:

- Global Pokemon/species/form entry: the Rival Saga Pokemon itself. This owns global statuses such as Ban, Restrict, Unban Protection, acquisition family, Battle Tier, type data, form policy, sprite policy, and future encounter source links.
- Player-owned Pokemon copy: one player's specific Pokemon record. This owns roster status, KOs, deaths, brought/benched stats, Daycare or Dragon's Den state, selected moves/abilities, copy-specific buffs/nerfs, and source history.

Do not blur those layers. A Ban or Restrict applies to the global Pokemon entry and should make every matching owned copy unusable without deleting those copies. Daycare, Dragon's Den, Silph Co, and battle stats apply to the player-owned copy.

### Form Policy

Rival Saga display names are the player-facing names for Pokemon Index entries.

Form families should generally exist only when the forms are random sprite variants for the same Rival Saga Pokemon. If a form has meaningfully different battle use, type, stats, or rules, it should be a separate Pokemon Index entry.

Current policy:

- Keldeo and Keldeo-Resolute are the same Pokemon.
- Basculin red, blue, and white-striped are one Basculin entry with random sprite variants.
- Minior colors are one Minior entry with random sprite variants.
- Squawkabilly colors are one Squawkabilly entry with random sprite variants and access to its form/ability flexibility.
- Giratina, Palkia, Dialga, Zacian, and Zamazenta item-form variants are treated as the same Pokemon entry with random sprite variants unless later rules say otherwise.
- Ogerpon masks are separate Pokemon Index entries.
- Deoxys forms are separate Pokemon Index entries.
- Rotom forms are separate Pokemon Index entries.
- Paldean Tauros breeds are separate Pokemon Index entries.
- Oricorio forms are separate Pokemon Index entries.
- Indeedee requires a gender choice when rolled; that choice is locked until the series resets.
- Regional forms are separate Pokemon Index entries.
- Cosmetic, stance, weather, season, color, and temporary battle-state forms are collapsed unless we explicitly decide they create a distinct Rival Saga Pokemon.

Currently collapsed examples include:

- Aegislash blade/shield forms
- Alcremie cream variants
- Arceus duplicate plate/form rows
- Burmy cloak variants
- Castform weather forms
- Cherrim overcast/sunshine forms
- Deerling and Sawsbuck seasonal forms
- Flabebe/Floette/Florges flower colors
- Furfrou trim rows
- Gastrodon/Shellos east-west rows
- Genesect drive rows
- Gimmighoul chest/roaming rows
- Maushold family-size rows
- Mimikyu disguised/busted rows
- Morpeko full-belly/hangry rows
- Tatsugiri color forms
- Unown form rows
- Vivillon pattern rows
- Wishiwashi solo/school rows
- Xerneas active/neutral rows

The code architecture for this layer is:

- `rivalSagaPokemonDisplayNameMap`: canonical Rival Saga display labels for special entries.
- `pokemonIndexCollapsedAliasMap`: maps cosmetic or same-use forms into one Pokemon Index key.
- `pokemonIndexSeparateFormKeys`: documents true separate battle-relevant form entries.
- `getPokemonIndexKey(name)`: resolves raw names, aliases, and sprite keys into the Rival Saga global Pokemon key.
- `getRivalSagaPokemonDisplayName(name)`: resolves the player-facing Rival Saga name for an index key.
- `getPokemonIndexFormPolicy(name)`: returns whether a name is collapsed, separate, random-sprite, and which sprite keys may be used.
- `getPokemonSpriteVariantPolicy(name)`: returns random sprite variant behavior for collapsed families.
- `buildPokemonIndexEntries()`: aggregates tier data, type data, owned copies, global rule status, and ban history into future Pokemon Index entries.

Future Pokemon Index surfaces should use these helpers instead of directly reading raw sprite aliases or tier-list names.

## Battle Tier Layer

Battle Tier and acquisition family are intentionally related but separate.

- `balanceTier` controls competitive balancing, Battle Phase legality, comparison filters, and other rules that care about power level.
- Acquisition family is derived from Battle Tier families for obtainability, Game Corner Tickets, reward bands, and family-scaled costs.

The first balance tier import comes from `rival_saga_tierlist_view (1).xlsx`, using the workbook's `Raw Data` sheet. Color coding and "Up Leaning" / "Down Leaning" review notes are intentionally ignored for app behavior.

The 12 balance tiers are:

- LC
- LC Elite
- Safari
- Safari Elite
- Poke
- Poke Elite
- Great
- Great Elite
- Ultra
- Ultra Elite
- Master
- Master Elite

Implementation notes:

- `pokemon-balance-tiers.js` is generated spreadsheet data and should not overwrite base Pokemon/sprite data.
- `RIVAL_SAGA_BALANCE_TIER_ROWS` stores imported Pokemon/form balance assignments.
- `RIVAL_SAGA_BALANCE_TIERS` stores tier labels, ordering, and counts.
- `getPokemonBalanceTierEntry(name)` resolves a Pokemon or form into its balance tier through the Pokemon Index key layer.
- `buildPokemonIndexEntries()` includes both Game Corner obtainability tier and balance tier so the Pokemon Index can filter by either one.

## Token Effect Contract

[`SAGA_TOKEN_RULES.md`](SAGA_TOKEN_RULES.md) is the current human-authored Saga design authority for Token timing and interaction semantics. Runtime behavior that contradicts that document is a defect, not an implicit rule change.

The implementation sources have narrower roles:

- `token-effect-contract.js` is the executable Token declaration contract.
- `TOKEN_EFFECT_MATRIX.md` is generated documentation derived from that contract.
- `app.js` contains the actual runtime resolvers and state mutations.
- The catalog and contract currently have 45/45 stable-ID parity, but parity does not prove that a resolver performs its complete Saga effect.

The declaration contract classifies Token resolution into three modes:

- `Automatic`: intended for effects whose full state mutation can be owned by the app.
- `Guided`: intended for effects that require a specific external result before a supported mutation can finish.
- `Host Confirmed`: intended for effects that require a host-completed external operation.

These labels describe the intended declaration contract. Thirty of the 45 catalog Tokens have effect-specific `verifiedComplete` evidence; the remaining Automatic and Guided resolvers include partial and text-only behavior. Protection enforcement is category-specific and several effect-specific timing/lifecycle paths remain incomplete. The Token system is under active implementation and is not functionally complete.

Runtime usability is a separate contract axis: `usable`, `guidedOnly`, `developmentOnly`, or `blocked`. Client timing checks, modern and legacy declaration paths, response recording, and prompt resolution consult the same fail-closed gate before consumption or mutation. `developmentOnly` and `blocked` effects cannot resolve through gameplay controls. Atomic completion checks enforce 7 Tools copy delivery and continue to protect incomplete Smokescreen and private Foresight outcomes from closing as successful resolutions.

The current backend has no authenticated player-scoped game-state delivery. Structured Foresight set fields are therefore stripped from shared storage and API/SSE delivery payloads. This is a containment boundary, not the future authorization model: a hosted implementation still needs a source-player-only channel and a separately authorized host view.

Consumption behavior for withdrawal, illegality, negation, protection blocks, no-effect resolution, host rejection, administrative cancellation, and Guided UI closure is not yet one approved universal Saga rule. See `SAGA_TOKEN_RULES.md` before changing lifecycle behavior.

The Token Scenario Launcher runs against an in-memory working clone and retains a read-only entry baseline, sandbox session ID, and captured real-state revision. Low-level gameplay persistence and inbound multiplayer merging are blocked while a sandbox is active. Discard reloads authoritative real state when possible. Commit requires a matching backend revision and keeps the sandbox recoverable until the server confirms persistence.

### Current Control-Slice Controller Boundary

`token-control-controller.js` is the shared controller boundary for the current Restrict, Unban, Arena Trap, Clear Smog, Rage Candy Bar, Extra Ban, Substitute, Incinerate, and Steal slice. It owns common declaration legality, response-window state, resolution revalidation, provisional consumption/refund, structured resolver dispatch, global-rule mirroring, exact Arena Trap validator requirements, Curse targeting, Sticky Hold, and the isolated scenario controller used by Integration/Browser QA. `app.js` delegates current-slice legality and automatic foundation mutation to this module while retaining the broader Live Referee prompt-chain, UI, logging, persistence, and announcement lifecycle.

`token-qa-harness.html` is isolated test infrastructure. It provides visible browser controls for the three required current-slice scenarios and saves every interaction to a temporary backend before real refresh assertions. It is not a second gameplay UI and does not replace Live Referee.

The evidence boundary is explicit:

- Unit tests exercise pure scope and resolver rules.
- Integration tests execute the shared controller, both Arena Trap team validators, exact Incinerate inventory destruction, exact Steal ownership/team cleanup, authoritative backend reload, controller undo, stale-declaration refunds, and structured history outcomes.
- Browser tests click visible controls, inspect rendered state, refresh from the authoritative backend, and fail on browser errors.
- Static Wiring only proves source registration or ordering.

Completion evidence is effect-specific. The first ordered completion slice adds production browser evidence for Follow Me, Ditto, Lingering Aroma, Move Deleter, Knock Off Curse, and Revenge; other Tokens remain `partial` or `textOnly` until their own end-to-end surfaces are proven. Full five-client multiplayer validation and unresolved effect-specific lifecycle rulings remain outside this QA hardening pass.

## Action Operation Lifecycle

Action visits still own the committed Action cost, but turn ownership no longer derives from the visit count alone. Each newly committed visit creates one persisted operation in the current Series/Gym Action state. The operation records its player, Action number, location/service, commit timestamp, linked feature session or pending situation, status, and completion reason/timestamp.

`actionTurnInfo()` gives an unfinished operation priority over visit-count rotation. Location flows explicitly complete that operation after their required session, choices, pending effects, response chains, manual work, and mandatory follow-ups finish. Immediate locations use the same completion function synchronously. Multi-service locations such as Daycare, Game Corner, Pokemon Center, Graveyard, PC, and Department Store expose an explicit Finish Action boundary; their Finish control sends a compact authoritative operation command instead of uploading the whole game merely to advance status. Encounter automatically completes its linked operation once every allowed roll has been obtained, including migration repair for already-obtained review sessions. Because the operation is stored with the gym Action state, reload restores the committed cost and the same resolving player without spending or advancing twice.

## Provisional Action Control Declarations

Ordinary Action Control Timing remains open while the current Action player is choosing a destination. An Action starts for Control-locking purposes only when the destination is authoritatively confirmed. That server reservation closes Control Timing for the entire location operation; completion or release of an unstarted reservation reopens it without advancing the interrupted Action.

`ordinaryControlTimingStatus()` is the shared non-response gate outside that race. It opens ordinary Control during idle Action decisions, Team Building, Shopping, and after Battle Payout has a terminal result. It fails closed for active interactions, required repairs/choices, Team Lock, Sabotage, Team Preview, Rival Battles, and unfinished payout. Phase-specific Sabotage or Team Preview effects use their own contract permissions and cannot leak through this gate.

The declaration lifecycle is deliberately split into five stages:

1. Control Timing is available.
2. A player claims it with one named, exact owned effect record.
3. The player completes persisted targets and choices while the Action destination is paused.
4. Final confirmation revalidates and consumes the exact effect once.
5. The normal response chain and resolver lifecycle begin.

`provisional-declaration-runtime.js` derives the current Action decision, Control-open state, provisional blocker, and destination reservation. The backend routes in `server.js` own claims, draft revisions, confirmation, withdrawal, host release, and destination reservations under the saved game version. The first accepted claim or destination reservation wins; stale clients receive current authoritative state and neither losing request consumes or mutates anything. A provisional Activity records `declarationStage: provisional`, exact inventory identity, interrupted continuation, draft selections, `notConsumed`, and `notStarted`. Withdrawal becomes terminal `withdrawn` with no refund because nothing was spent. Duplicate confirmation and stale revisions fail before a second consumption.

The Live Referee effect inventory uses a three-row bounded screen: persistent situation header, the only scrollable card collection, and persistent navigation footer. The HUD stage remains overflow-clipped so large inventories cannot expand the phase rail or place effect cards beneath the header/footer.

## Live Referee Player Context

Site Shell viewer identity, the trainer controlled by gameplay controls, and the current gameplay decision owner are distinct concepts. `getLiveRefereeControlledPlayerContext()` is the single Live Referee authority for those IDs. Normal multiplayer resolves the controlled trainer from the authenticated viewer's linked trainer slot and shows a waiting screen when another trainer owns the current decision. Free Testing is the explicit exception: it derives control from the current response-priority owner, pending Trade recipient, Action-operation owner, required task assignee, or Team Build/Lock owner.

Effect-source rendering, Token inventory, target forms, confirmation drafts, response submissions, Trade forms, Token consumption, pending-event actors, logs, announcements, and the player pentagon consume that same controlled-player ID. Submission paths revalidate it so a stale submenu cannot mutate the previous trainer after priority or Action ownership changes. Free Testing renders `CONTROLLED` on the gameplay-controlled pentagon node; normal multiplayer retains `YOU` on the viewer-linked trainer. Explicit Advanced Timing, repair, and scenario tools may still expose deliberate player selectors and do not inherit Live Referee impersonation.

## Effect Availability And Sabotage Revisions

`getUsableEffectsForContext` is the Live Referee availability boundary. It accepts player, Gym, phase/subwindow, active operation, pending revision, and viewer context. An owned effect is visible only when its canonical contract, runtime usability, timing permission, declaration/reaction role, required targets, and blockers all pass. Sabotage exceptions are declared by contract through `timingPermissions.sabotageCurseWindow`; the UI does not infer permission from a category label.

Set-changing effects resolved during Sabotage may create a persisted parent revision operation. Child tasks retain the affected player and exact roster instances, source effect, reason, required changes, allowed edit scope, and locked snapshot revision. The operation blocks proactive declarations and gameflow until every child is explicitly confirmed. Teambuilder remains the editor and validation authority; scope baselines prevent team membership, Badge assignments, or unrelated sets from changing unless the effect grants those permissions.
