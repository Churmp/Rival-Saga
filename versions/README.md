# Rival Saga Versions

This folder separates rule-model experiments from the currently playable website.

## Supported Action Phase Versions

The website now treats Action Phase rules as a versioned game contract.

- `action-phase-v1-current-series`: archived/maintenance-only Action Phase for explicitly persisted legacy saves.
- `action-phase-v2-real-series`: current/default Action Phase ruleset for newly created Rival Saga games and lobbies.

The repository root currently serves the normal website behavior:

```powershell
npm.cmd run dev
```

Use `versions/current-action-phase/` for notes about V1 compatibility constraints and maintenance fixes.

## Next Action Phase Version

Use `versions/next-action-phase/` for V2 design notes, contracts, fixtures, and isolated implementation slices that support the mounted V2 website path.
