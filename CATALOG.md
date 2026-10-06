# Skill catalog

Generated from `catalog.json` by `node scripts/build-catalog.mjs`; edit the JSON, not this file.

**Tier:** core = useful in almost any software project; recommended = install when the signals match; optional = only when clearly needed.

## Workflow and session management

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`ai-todo`](skills/ai-todo/SKILL.md) | core | Keeps AI-TODO.md: Claude's plan and log (in progress, next, blocked, done) so any session can resume. | multi-session project; owner wants to see what Claude is doing | MoSbeaa/claude-skills |
| [`human-todo`](skills/human-todo/SKILL.md) | core | Keeps HUMAN-TODO.md: the owner's checklist of manual steps (logins, secrets, decisions, merges) with exact instructions. | external accounts or services to set up; owner does manual steps | MoSbeaa/claude-skills |
| [`handoff`](skills/handoff/SKILL.md) | core | On 'handoff', writes handoff.md (goal, state, active files, changes, failed attempts, next steps) so a fresh session continues. | long-running project; sessions get cleared | MoSbeaa/claude-skills |
| [`using-agent-skills`](skills/using-agent-skills/SKILL.md) | core | Meta-skill: how to discover and pick the right skill for the task at hand. Install whenever several addyosmani skills are installed. | installing 4+ of the engineering-practice skills | addyosmani/agent-skills |
| [`context-engineering`](skills/context-engineering/SKILL.md) | recommended | Sets up rules files (CLAUDE.md) and context for a project; fixes degraded agent output. | new project with no CLAUDE.md; large codebase | addyosmani/agent-skills |

## Planning and ideas

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`idea-refine`](skills/idea-refine/SKILL.md) | recommended | Turns a vague idea into a sharp concept through divergent then convergent thinking; writes to docs/ideas/. | greenfield project; product idea not yet defined | addyosmani/agent-skills |
| [`interview-me`](skills/interview-me/SKILL.md) | recommended | One-question-at-a-time interview to find what the user actually wants before any plan or code. | underspecified request; greenfield project | addyosmani/agent-skills |
| [`planning-and-task-breakdown`](skills/planning-and-task-breakdown/SKILL.md) | core | Breaks a spec or requirements into ordered, implementable tasks; spots parallel work. | any project with multi-step features | addyosmani/agent-skills |
| [`constraint-driven-development`](skills/constraint-driven-development/SKILL.md) | recommended | Writes the quality bar to CONSTRAINTS.md (coverage, perf, a11y thresholds) and catches agents lowering it (skipped tests, ts-ignore). | production project; no written quality bar; agents silencing checks | addyosmani/agent-skills |

## Engineering practice (any stack)

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`test-driven-development`](skills/test-driven-development/SKILL.md) | core | Red-green-refactor loop for any logic change or bug fix. | any codebase with tests, or that should have them | addyosmani/agent-skills |
| [`debugging-and-error-recovery`](skills/debugging-and-error-recovery/SKILL.md) | core | Systematic root-cause debugging when tests fail, builds break, or behaviour is unexpected. | any codebase | addyosmani/agent-skills |
| [`code-review-and-quality`](skills/code-review-and-quality/SKILL.md) | core | Multi-axis review of a diff or PR before merging. | any codebase; PR workflow | addyosmani/agent-skills |
| [`git-workflow-and-versioning`](skills/git-workflow-and-versioning/SKILL.md) | core | Branching, atomic commits, PRs, conflicts, releases, semver and changelogs. | git repository | addyosmani/agent-skills |
| [`source-driven-development`](skills/source-driven-development/SKILL.md) | recommended | Checks implementation decisions against official framework/library docs; avoids outdated patterns. | fast-moving frameworks (Next.js, Expo, new major versions) | addyosmani/agent-skills |
| [`api-and-interface-design`](skills/api-and-interface-design/SKILL.md) | recommended | Stable REST/GraphQL APIs, module boundaries and type contracts between frontend and backend. | backend or API; monorepo with shared packages; multiple clients | addyosmani/agent-skills |
| [`security-and-hardening`](skills/security-and-hardening/SKILL.md) | recommended | OWASP Top Ten, auth/session safety, input handling, dependency audits, privacy (GDPR/CCPA). | user accounts or auth; personal data; payments; public endpoints | addyosmani/agent-skills |
| [`performance-optimization`](skills/performance-optimization/SKILL.md) | optional | Frontend, backend and database performance: Core Web Vitals, N+1 queries, profiling. | performance requirements; reported slowness; web app in production | addyosmani/agent-skills |
| [`observability-and-instrumentation`](skills/observability-and-instrumentation/SKILL.md) | recommended | Logging, metrics, tracing and alerting so production behaviour is diagnosable. | deployed service; Sentry/OpenTelemetry/logging setup | addyosmani/agent-skills |
| [`deprecation-and-migration`](skills/deprecation-and-migration/SKILL.md) | optional | Removing or replacing systems and APIs; zero-downtime schema changes (expand/contract). | existing production system being changed; framework or database migration | addyosmani/agent-skills |
| [`ci-cd-and-automation`](skills/ci-cd-and-automation/SKILL.md) | recommended | Build and deploy pipelines, quality gates, test runners in CI, deployment strategies (any CI provider). | CI config exists or is planned | addyosmani/agent-skills |

## Frontend and web

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`frontend-ui-engineering`](skills/frontend-ui-engineering/SKILL.md) | recommended | Accessible (WCAG), responsive, production-quality UI: components, layouts, state. | any web or app UI | addyosmani/agent-skills |
| [`browser-testing-with-devtools`](skills/browser-testing-with-devtools/SKILL.md) | optional | Inspects DOM, console, network and performance in a real browser via Chrome DevTools MCP. | web app; chrome-devtools MCP server configured (needs chrome-devtools MCP server) | addyosmani/agent-skills |
| [`vercel-react-best-practices`](skills/vercel-react-best-practices/SKILL.md) | recommended | Vercel's React/Next.js performance rules (waterfalls, bundle size, server components, data fetching). | package.json depends on react or next | vercel-labs/agent-skills |
| [`vercel-composition-patterns`](skills/vercel-composition-patterns/SKILL.md) | recommended | React composition patterns: compound components, no boolean-prop sprawl, React 19 APIs. | package.json depends on react; component library or design system | vercel-labs/agent-skills |

## Mobile (React Native / Expo)

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`vercel-react-native-skills`](skills/vercel-react-native-skills/SKILL.md) | recommended | React Native/Expo performance: lists, animations, native modules, fonts, imports. | package.json depends on react-native or expo | vercel-labs/agent-skills |
| [`expo-router`](skills/expo-router/SKILL.md) | recommended | Expo Router navigation: file-based routes, stacks, tabs, modals, sheets, headers, search. | package.json depends on expo-router; app/ directory in an Expo app | expo/skills |
| [`expo-native-ui`](skills/expo-native-ui/SKILL.md) | recommended | Native-feeling Expo screens: Apple HIG, semantic colors, native controls, SF Symbols, media, effects. | package.json depends on expo | expo/skills |
| [`expo-dev-client`](skills/expo-dev-client/SKILL.md) | optional | Build and distribute Expo development clients (local or TestFlight) when Expo Go isn't enough. | expo app with native modules; eas.json | expo/skills |

## Infrastructure and services

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`github-actions-templates`](skills/github-actions-templates/SKILL.md) | recommended | Ready GitHub Actions workflows for test, build and deploy. | .github/workflows/; GitHub-hosted repo | wshobson/agents |
| [`neon`](skills/neon/SKILL.md) | recommended | Neon overview: Postgres, Auth, object storage, functions, AI gateway; CLI/MCP setup; branch-first workflow. | neon.tech in DATABASE_URL; @neondatabase/* dependency; .neon or neon.ts file; owner chose Neon | neondatabase/agent-skills |
| [`neon-postgres`](skills/neon-postgres/SKILL.md) | recommended | Neon Postgres: pooled vs direct connections, migrations, branching, autoscaling, replicas, search. | same as neon | neondatabase/agent-skills |
| [`neon-postgres-branches`](skills/neon-postgres-branches/SKILL.md) | optional | Choosing and creating Neon branches for testing migrations, per-PR branches, schema-only branches. | Neon plus CI or preview environments | neondatabase/agent-skills |
| [`stripe-best-practices`](skills/stripe-best-practices/SKILL.md) | recommended | Stripe integration decisions: Checkout vs PaymentIntents, billing/subscriptions, Connect, tax, webhooks, key security. | stripe dependency; payments or subscriptions planned | stripe/ai |

## Finding more skills

| Skill | Tier | What it does | Install when | Source |
|---|---|---|---|---|
| [`find-skills`](skills/find-skills/SKILL.md) | optional | Searches the public skills ecosystem (npx skills, skills.sh) for skills this repo doesn't have. | project needs a technology none of these skills cover | vercel-labs/skills |

## Templates (filled in per project)

These need the project's own spec documents. Claude copies them, replaces the `{{placeholders}}` with the project's real documents and rules, and renames them.

| Template | Installs as | What it does | Install when |
|---|---|---|---|
| [`project-specs`](templates/project-specs/SKILL.md) | `<project-slug>-specs` | Maps the project's spec documents (PRD, architecture, data model, API, security) and its non-negotiable rules, so Claude reads them before coding. | project has a docs/ or specs folder with product/architecture documents |
| [`plan-feature`](templates/plan-feature/SKILL.md) | `plan-feature` | /plan-feature <description>: writes a spec-backed plan (scope, data, API, security, tests, slices) to docs/plans/. | project has spec documents; feature work planned in slices |
| [`spec-review`](templates/spec-review/SKILL.md) | `spec-review` | /spec-review [branch\|PR\|path]: reviews changes against the project's security and definition-of-done rules and writes the completion report. | project has a security or rules document |

## External (installed from the author, not copied here)

| Collection | What it does | Skills | Install |
|---|---|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | Emil Kowalski's design-engineering skills: UI design, animations (web and Expo), Apple-style design, animation reviews. Not copied here; installed from the author. See Frontend.md. | `emil-design-eng`, `animate`, `animate-expo`, `review-animations`, `improve-animations`, `apple-design`, `pick-ui-library` | `npx skills add emilkowalski/skills --skill <name>` |
