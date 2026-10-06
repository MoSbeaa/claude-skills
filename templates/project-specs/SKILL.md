---
name: {{project-slug}}-specs
description: Authoritative product, architecture, data-model, API and security rules for {{Project Name}}. Use before any coding, schema, migration, API, UI, or architecture work in this repository, and whenever the task mentions {{comma-separated domain terms, e.g. tenants, orders, invoices, rewards}}.
---

<!--
TEMPLATE. Claude fills this in when installing it into a project:
- Replace every {{placeholder}}. Delete any row or bullet the project has no source for.
- Rename the folder to match `name` (for example `.claude/skills/shop-specs/`).
- Build the table from the project's real spec documents. Never invent documents, fields or rules.
- If the project has no spec documents yet, don't install this template. Suggest writing specs first.
- Delete this comment block when done.
-->

# {{Project Name}} Specifications

The specifications live in `{{SPEC_DIR}}/`. They are the source of truth: read the relevant documents before acting. Do not invent database fields, endpoints, roles, permissions or business rules that the documents already define. When a task needs something they don't define, state the assumption explicitly and propose a doc update in the same change.

## Which document answers which question

| Question | Document |
|---|---|
| Product scope, actors, definition of done | `{{doc}}` |
| Features, user journeys, explicit non-goals | `{{doc}}` |
| Stages / roadmap and their exit criteria | `{{doc}}` |
| Architecture, modules, boundaries | `{{doc}}` |
| Entities, fields, enums, ownership | `{{doc}}` |
| API endpoints and the error format | `{{doc}}` |
| Roles, permissions, privacy, audit, rate limits | `{{doc}}` |
| UX and accessibility requirements | `{{doc}}` |
| Testing requirements | `{{doc}}` |
| Environments, migrations, CI/CD | `{{doc}}` |
| Decisions made and open questions | `{{doc}}` |
| Architecture decision records | `{{docs/adr/}}` |

## Non-negotiables

<!-- Copy the hard rules from the security and architecture docs, one bullet each, short. Examples of the kind of rule that belongs here: -->

- **Authorization on the server.** {{e.g. Tenant/account context comes only from the authenticated session, never from a client-sent ID.}}
- **Business rules live in the domain/API layer.** {{Clients only render server-returned state.}}
- **Data integrity.** {{e.g. append-only event history; idempotency keys on payment-like mutations.}}
- **Database changes only through migrations.** No destructive migration without the owner's explicit approval.
- **Errors:** {{the error envelope}}. Never leak stack traces or database models.
- **Authorization check** for every protected operation: who is the actor, which account/tenant, which role or permission, does that account own the resource, and is the operation allowed in its current state.
- **Roles:** {{list}} (least privilege).
- **Audit-log** {{the sensitive actions the security doc lists}}.

## Source-of-truth order when documents conflict

{{e.g. Security > architecture > data model > API contracts > product requirements > UI > AI assumptions.}}

## Stack

{{The chosen stack, and anything still undecided. For undecided items: ask the owner or record the assumption; never choose silently.}}

## Scope discipline

Classify each feature as {{MVP / POST-MVP / FUTURE}} (see `{{roadmap doc}}`). Don't pull later-stage complexity into the current stage. Explicit non-goals: {{list}}.
