# Rival Saga Versioning

Rival Saga has one supported playable ruleset: the current Route-era implementation in the repository root and its current supporting modules.

Historical Action Phase implementations are archived in Git history and archival branches. They are not production compatibility targets and must not be preserved, restored, or consulted as authoritative gameplay behavior unless a task explicitly asks for historical archaeology.

## Current architecture rule

- Root runtime code is authoritative for the playable game.
- `versions/next-action-phase/` contains Route-era implementation modules and historical migration/design material that may still be referenced by the current root runtime. Do not delete implementation modules merely because the folder name is outdated.
- There is no supported V1 runtime and no requirement to load or continue V1 saves.
- Do not add new V1/V2 runtime forks. New work should extend the single current ruleset.
- Names such as `state.v2` and existing `v2` Route identifiers may remain until a separate naming cleanup; this V1 purge is not a broad architecture rename.

## Historical reference

The final pre-purge snapshot is preserved on `archive/pre-v1-removal-final-2026-08-25`. Older behavior should be recovered from Git rather than retained in production code.
