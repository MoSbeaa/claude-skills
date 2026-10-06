---
name: handoff
description: Writes handoff.md at the repository root, a six-section snapshot (goal, current state, active files, changes made, failed attempts, next steps) that lets a fresh session continue exactly where this one stopped. Use when the owner says "handoff" (or "hand off", "wrap up so I can clear the session"), before they clear or end the session.
---

# Handoff

The owner says "handoff", clears the session, and starts a new one from `handoff.md`. The file must stand on its own: a session with no chat history reads it (plus `CLAUDE.md`, which should point to it) and continues without asking what was going on.

## One-time setup

The first time this skill runs in a project:

- add `handoff.md` to `.gitignore` (it's a local snapshot, not a committed record);
- add this line to the project's `CLAUDE.md` (create the file if it's missing): "If `handoff.md` exists at session start, read it first. It's the previous session's snapshot."

## Steps

1. **Gather facts.** Don't rely on memory alone:
   - `git branch --show-current`, `git status --short`, `git log --oneline origin/main..HEAD` (or the last few commits), and any open PR for the branch;
   - background agents, worktrees (`git worktree list`) and anything still running (a dev server on a port, watch scripts);
   - `AI-TODO.md` and `HUMAN-TODO.md`, if the project uses them (what's in progress, what waits on the owner);
   - the current task in this conversation, including anything the owner asked for that isn't done yet, and approvals still pending (for example a production deploy or migration that may run only after the owner says so).
2. **Bring the task lists up to date first** (skills `ai-todo` and `human-todo`, if installed), so they agree with the handoff.
3. **Write `handoff.md`** at the repository root, replacing any old one, with exactly the six sections below.
4. **Don't commit it.** Tell the owner the file is ready and that the new session can start with "read handoff.md".

## Format

```markdown
# Handoff

_Written: <YYYY-MM-DD HH:MM, local time zone> · Branch: `<branch>` · Last commit: `<hash> <subject>`_

## 1. Goal

What the owner wants from this piece of work, in their terms, plus the acceptance criteria. Link the plan and the owner's decisions instead of copying them.

## 2. Current state

Where things stand: what's built and verified (tests, build, live check), what's half done and exactly where it stopped, open PRs and their CI state, database migrations (applied where?), and anything running (agents, servers, worktrees) with how to stop or resume it.

## 3. Active files

The files that matter for the next step, each with one line on why: the plan, the files being edited, the tests that cover them. Paths relative to the repo root.

## 4. Changes made

What this session changed, grouped by commit (hash + subject), then uncommitted changes. One line each, about behaviour rather than diffs.

## 5. Failed attempts

What was tried and didn't work, and why, so the next session doesn't repeat it: errors with their real cause, dead ends, tool or environment quirks. Write "None." if there were none.

## 6. Next steps

An ordered list of what to do next, each concrete enough to start without questions: commands to run, what to build, what to verify. Mark what needs the owner first (approvals, decisions, manual steps with their HUMAN-TODO number).
```

## Rules

- **Facts only.** Every "done" or "passing" claim must have been checked in this session. If something wasn't verified, say so.
- **No secrets:** never tokens, passwords, connection strings, `.env` contents or keys. Name the variable or host instead.
- **Dates and references:** use absolute dates, commit hashes, PR numbers and file paths, not "yesterday" or "the earlier fix".
- **Size:** about 150 lines at most. Link to plans, `AI-TODO.md` and PRs for detail rather than copying them.
- **Pending approvals:** say which owner approvals are still pending, so the next session never treats them as given.
