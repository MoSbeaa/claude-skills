---
name: ai-todo
description: Maintains AI-TODO.md at the repository root — Claude's own work log and plan for this project: what Claude is doing now, what it will do next (in order), what is blocked and on what, and what it has already completed. Use at the start of a work session to pick up where things left off, whenever a task starts, finishes, or gets blocked, when plans or priorities change, when the owner asks "what are you working on?" / "what's next?" / "what have you done?", and before ending a session.
---

# AI TODO

`AI-TODO.md` at the repository root is the single source of truth for Claude's own work on this project. Any later session, or a teammate, can pick up from it without reading the chat history. Its counterpart is `HUMAN-TODO.md` (skill `human-todo`), which lists what only the owner can do.

## When to update

- **Session start:** read `AI-TODO.md` (and `HUMAN-TODO.md`) before choosing what to work on. Check whether a finished human task has unblocked any **Blocked** item.
- **Starting a task:** move it to **In progress** (one or two at a time at most).
- **Finishing a task:** move it to **Done** with the date, branch/commit or PR, and a one-line outcome. Mark it done only after verification: the tests, type checks and build have run and passed.
- **Blocked:** move it to **Blocked** and name exactly what it waits on. If the blocker is the owner, reference the matching `HUMAN-TODO.md` task number. If the blocker is a new manual step, add it to `HUMAN-TODO.md` too (skill `human-todo`).
- **Plans change:** reorder **Next**, add newly found work (follow-ups, tech debt, known limitations from reviews or completion reports), and remove items that no longer apply (record them in Done as "Dropped — <why>").
- **Session end:** make sure In progress reflects reality. Unfinished work stays In progress with a note on where it stopped.

After editing, mention the change in one line (for example "AI TODO: auth slice done, next is the billing plan").

## Task format

```markdown
### <Short title>
- **Goal:** what "done" means (acceptance criteria in one or two lines).
- **Source:** the spec, plan or backlog item it comes from (for example `docs/plans/…`).
- **Depends on:** other AI tasks or `HUMAN-TODO.md` #N (omit if none).
- **Notes:** key decisions, files, or where work stopped (optional, keep short).
```

Rules:

- **Next** is ordered: the top item is what Claude will do next.
- Keep entries short. Link to plans instead of copying them here.
- If the project has release stages (MVP, later), don't queue later-stage work ahead of the current stage.
- Done entries: date, title, branch/commit/PR, one-line outcome. Collapse entries older than about 30 days into one summary line per stage or month.
- Never include secrets.

## File skeleton

```markdown
# AI TODO

Claude's work plan and log for this project. Maintained by Claude (`ai-todo` skill). Owner tasks live in `HUMAN-TODO.md`.

_Last updated: YYYY-MM-DD_

## In progress

## Next

## Blocked

## Known limitations / tech debt

## Done
```
