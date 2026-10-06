---
name: spec-review
description: Reviews {{Project Name}} code changes against the project's security, authorization, data-model, idempotency and definition-of-done rules, then produces the required completion report. Use when the user runs /spec-review, or asks to review, check, audit, or verify changes, a branch, or a PR against the specs before committing or merging.
argument-hint: "[branch | PR number | path]  (default: uncommitted changes)"
---

<!--
TEMPLATE. Claude fills this in when installing it into a project:
- Replace every {{placeholder}} and turn the checklist into the project's real rules (security doc, data-model doc, API doc).
- Delete checklist sections that don't apply (for example "Consent and messaging" for a project without messaging).
- Install it together with the project-specs template (`{{project-slug}}-specs`).
- Delete this comment block when done.
-->

# Spec Review

## Determine the target

- No argument: review uncommitted work, meaning `git diff HEAD` plus untracked files (`git status --porcelain`). If there are no commits yet, review all untracked and staged files.
- Branch name: `git diff main...<branch>`.
- PR number: `gh pr diff <n>` (if `gh` isn't available, ask for the branch instead).
- Path: review the files under that path.

Read the relevant parts of `{{SPEC_DIR}}/` (always the security doc, the agent rules and the definition of done; add others based on what changed). Read enough surrounding code to confirm each finding. Don't report guesses.

## Checklist

**Authorization and data isolation**
- A client-supplied account/tenant ID, role, status or permission flag used for authorization.
- Queries on account-owned data that aren't scoped to the session's account.
- Protected operations missing any part of the check: actor, account, role, ownership, state.
- Missing or wrong role enforcement ({{roles}}).

**Business rules placement**
- Balances, eligibility, permissions or validity computed authoritatively in client code.
- Web-only assumptions in domain code that would block another client (for example a mobile app).

**Data**
- Edits or deletes of history that must be append-only (corrections must be compensating records).
- New account-owned tables without a clear ownership path.
- Fields, enums or entities not in `{{data model doc}}` and not proposed as doc changes.
- Schema changes outside migrations, or destructive migrations without approval.

**API**
- Endpoints that don't match `{{API doc}}` or its versioning.
- Missing input validation at the boundary.
- Responses that leak database models, stack traces or unnecessary personal data.
- Errors not in the `{{error envelope}}` shape.

**Integrity and abuse**
- Payment-like or reward-like mutations without idempotency keys.
- Missing rate limits on sign-in, one-time codes, public endpoints and other abuse-prone routes.
- Public identifiers that are sequential or contain secrets.

**Consent and messaging** (if the project sends messages)
- Audiences that don't exclude people without the required consent, or any override path.
- Marketing consent implied by account creation.
- Bulk sends inside synchronous requests instead of background jobs.

**Audit and logging**
- Audit-sensitive actions without an audit-log entry.
- Secrets or unnecessary personal information in logs.

**Architecture conformance** (`{{architecture doc}}`, `{{docs/adr/}}`)
- Any material deviation from the architecture without an **Accepted** ADR is a **high** finding, even if the code is otherwise correct.

**Definition of done** (`{{definition-of-done doc}}`): tests for the business rules, handled errors, accessibility and responsiveness for UI changes, updated docs.

## Output

1. **Findings**, most severe first. For each: severity (critical / high / medium / low), `file:line`, the rule broken (with the doc reference), a concrete failure scenario, and a suggested fix. If there are none, say so plainly.
2. **Verification actually run.** Run the project's test, type-check and build commands (see `CLAUDE.md`) and report the real results. Never say a change is complete or successful when these weren't run or failed.
3. **Completion report:** files changed, behaviour added, tests run, migrations added, known limitations, security considerations.

Don't modify code during the review unless the user asks for fixes.
