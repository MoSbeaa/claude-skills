---
name: plan-feature
description: Turns a {{Project Name}} feature request into a spec-backed implementation plan saved to docs/plans/. Use when the user runs /plan-feature, or asks to plan, scope, break down, or design a feature, epic, or backlog item before coding.
argument-hint: <feature description>
---

<!--
TEMPLATE. Claude fills this in when installing it into a project:
- Replace every {{placeholder}} with the project's real document names and rules.
- Drop any step the project has no source for (for example no backlog document, no ADRs).
- Install it together with the project-specs template (`{{project-slug}}-specs`).
- Delete this comment block when done.
-->

# Plan a Feature

Produce a plan grounded in `{{SPEC_DIR}}/`. Write no application code.

## Steps

1. **Read the docs.** Read the agent rules (`{{rules doc, if any}}`) and every document relevant to the feature: at least the product requirements, architecture, data model, API spec, security and testing documents. Inspect any existing implementation in the repo.
2. **Classify** the feature as {{MVP / POST-MVP / FUTURE}}, citing the roadmap or backlog section. If a current-stage request pulls in later-stage complexity, say so and propose the smaller version.
3. **Map to the backlog.** Name the epics or items in `{{backlog doc}}` it covers, and any prerequisites that aren't built yet.
4. **Define the surface.**
   - Modules affected.
   - Entities and fields, using the exact names from `{{data model doc}}`. Mark anything new as **PROPOSED DOC CHANGE**.
   - Endpoints, using the exact paths from `{{API doc}}`. Mark anything new as **PROPOSED DOC CHANGE**.
   - Events emitted, background jobs added.
   - Migrations required, and whether any are destructive (those need explicit approval).
5. **Security check.** For each protected operation, answer: actor, account/tenant, role or permission, resource ownership, allowed state. Note rate limits, audit-log entries, consent rules and idempotency requirements.
6. **Tests.** List the unit, integration, authorization (user of account A can't reach account B's data), idempotency and abuse tests that apply (`{{testing doc}}`).
7. **Slices.** Break the work into small vertical slices, in order. Give each an objective, the files or modules affected, acceptance criteria and tests.
8. **Architecture conformance.** Compare the plan with the architecture (`{{architecture doc}}`) and the ADR index (`{{docs/adr/README.md}}`). List every deviation with its ADR number and status. A deviation with no ADR gets a new **Proposed** ADR in the same change, and the work that depends on it is marked blocked until the owner accepts it.
9. **Assumptions and open questions.** List every assumption. If the feature depends on an undecided technology choice, raise it as an open question instead of choosing.

## Output

Write the plan to `docs/plans/YYYY-MM-DD-<kebab-slug>.md` (create `docs/plans/` if it's missing), using today's date and these sections:

```markdown
# <Feature name>
Classification: <stage> — <reason>
Backlog: <epics/items>
## Scope
## Data model
## API
## Security & compliance
## Tests
## Slices
## Architecture conformance (ADRs)
## Assumptions & open questions
## Proposed doc changes
```

Then give a short chat summary: the classification, the number of slices, the proposed doc changes, and any open questions that block starting.
