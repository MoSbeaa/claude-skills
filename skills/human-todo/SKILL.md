---
name: human-todo
description: Maintains HUMAN-TODO.md at the repository root — the owner's checklist of manual tasks Claude cannot do (logins, account setup, secrets, dashboard settings, purchases, business decisions, reviews/merges, real-world tests). Use whenever Claude asks the owner to do something manually, when a task is blocked on a login/credential/decision, when the owner says they finished a manual step (e.g. "I set up the database", "done", "merged it"), when the owner asks "what do I need to do?", and at the end of any work session that produced new manual steps.
---

# Human TODO

`HUMAN-TODO.md` at the repository root is the single, always-current list of what the owner must do by hand. Keep it accurate: the owner relies on it instead of scrolling back through the chat.

## When to update

- **Adding:** whenever you ask the owner to do something you can't do yourself (sign in somewhere, create an account or project, copy a secret, click through a dashboard, choose a vendor, make a business decision, review or merge a PR, test on a real device). Add it in the same turn you ask. Never leave a manual request only in the chat.
- **Completing:** when the owner says a step is done, or you can verify it (for example `.env` now exists, `git ls-remote` works, a PR shows as merged, a deployment is ready), move it to **Done** with the date. Verify with read-only checks where you can. If you can't, mark it done on the owner's word and say so.
- **Changing:** if a task's steps change (new information, a different provider, a newly found blocker), edit it in place. Don't add a duplicate.
- **Removing:** only when a task no longer matters. Record why in Done ("Dropped — <why>").

Read the current file before editing. Afterwards, tell the owner in one line what changed (for example "Human TODO: added 'Create the Stripe account', marked 'Set up the database' done").

## Task format

Each open task must make sense without the chat history:

```markdown
### <Number>. <Short imperative title>
- **Why:** one sentence on what it unblocks.
- **Priority:** Blocking | Soon | Later, and what it blocks (for example "blocks running the app locally").
- **Time:** rough estimate (for example ~10 min).
- **Steps:**
  1. Exact, numbered actions: URLs to open, buttons to click, names and values to enter.
  2. Commands in code blocks, prefixed with `!` when they should be typed into Claude Code.
  3. Where each secret goes (file or setting name). Never paste real secret values into this file.
- **Done when:** an observable check (a command's output, a page loading, a status in a dashboard).
- **Then tell Claude:** what to say or paste back so Claude can continue.
```

Rules:

- Order open tasks by priority (Blocking first), then by dependency (prerequisites before the tasks that need them).
- Number open tasks sequentially, and renumber after changes.
- Never include secret values, tokens, passwords or one-time codes, only where they go.
- Business decisions are tasks too: list the options and Claude's recommendation.
- Keep Done short: title, date, one-line outcome. Trim entries older than about 30 days.

## File skeleton

```markdown
# Human TODO

Manual tasks for the project owner. Maintained by Claude (`human-todo` skill). Tell Claude when you finish something and it will update this list.

_Last updated: YYYY-MM-DD_

## Open

### 1. ...

## Waiting on Claude
- What Claude will do once an open task is done, so the owner sees what each task unblocks.

## Done
- YYYY-MM-DD — <title>: <outcome>
```
