# claude-skills

My Claude Code skills, collected from the projects I've built, ready to drop into a new project.

> **Claude:** if you were given this link to set up skills for a project, read [`INSTALL.md`](INSTALL.md) and follow it. It tells you how to survey the project, choose from [`catalog.json`](catalog.json), confirm with the user, and install.

## Use it in a new project

Open Claude Code in the new project and paste:

```text
Read https://github.com/MoSbeaa/claude-skills and follow its INSTALL.md: look at this project, pick the skills that fit, show me the list, and install them.
```

Claude clones this repo, checks the project's stack (package.json, Expo or Next.js config, CI, database, spec documents), proposes a list with a reason for each skill, waits for your OK, and copies the chosen skills into `.claude/skills/`. For a brand-new empty folder it first asks what you're building.

While this repo is private, the machine needs GitHub access to it (signed in as `MoSbeaa`, or with read access granted to that machine's account). If the repo is public, no login is needed.

## What's inside

| Folder | Contents |
|---|---|
| [`skills/`](skills/) | 34 ready-to-use skills, one folder each (`SKILL.md` plus any `references/`, `rules/` or `scripts/`). |
| [`templates/`](templates/) | 3 project-specific skills (`project-specs`, `plan-feature`, `spec-review`) with `{{placeholders}}`. Claude fills them in from the new project's own spec documents. |
| [`catalog.json`](catalog.json) | The index Claude reads: tier, summary, the signals that mean a project needs it, which skills pair with it, and the upstream source. |
| [`CATALOG.md`](CATALOG.md) | The same list as tables, for reading. |
| [`INSTALL.md`](INSTALL.md) | The step-by-step instructions Claude follows. |
| [`scripts/`](scripts/) | `install.sh` / `install.ps1` (copy chosen skills into a project) and `build-catalog.mjs` (regenerate `CATALOG.md`). |
| [`licenses/`](licenses/) | License files of the upstream repos. |

### The skills, by group

- **Workflow** (mine): `ai-todo`, `human-todo`, `handoff`, plus `using-agent-skills` and `context-engineering`.
- **Planning:** `idea-refine`, `interview-me`, `planning-and-task-breakdown`, `constraint-driven-development`.
- **Engineering practice:** `test-driven-development`, `debugging-and-error-recovery`, `code-review-and-quality`, `git-workflow-and-versioning`, `source-driven-development`, `api-and-interface-design`, `security-and-hardening`, `performance-optimization`, `observability-and-instrumentation`, `deprecation-and-migration`, `ci-cd-and-automation`.
- **Frontend:** `frontend-ui-engineering`, `browser-testing-with-devtools`, `vercel-react-best-practices`, `vercel-composition-patterns`.
- **Mobile:** `vercel-react-native-skills`, `expo-router`, `expo-native-ui`, `expo-dev-client`.
- **Infrastructure:** `neon`, `neon-postgres`, `neon-postgres-branches`, `stripe-best-practices`, `github-actions-templates`.
- **More skills:** `find-skills` searches the public skills ecosystem for anything not covered here.

See [`CATALOG.md`](CATALOG.md) for what each one does and when it's picked.

## My notes

- [`Commends.md`](Commends.md): Claude Code commands I use (`/init`, `/statusline`, `/compact`, …).
- [`Frontend.md`](Frontend.md): Emil Kowalski's design skills. They're listed in the catalog under "External", so Claude can offer them for UI-heavy projects.

## Install by hand

```bash
git clone --depth 1 https://github.com/MoSbeaa/claude-skills.git /tmp/claude-skills
bash /tmp/claude-skills/scripts/install.sh /path/to/project ai-todo human-todo handoff test-driven-development
```

PowerShell: `.\scripts\install.ps1 -Project C:\path\to\project -Skills ai-todo,human-todo,handoff`

Both scripts skip a skill the project already has instead of overwriting it.

## Add or update a skill

1. Put the folder in `skills/<name>/` (the folder name must match `name:` in its `SKILL.md`).
2. Add an entry to `catalog.json`: tier, category, summary, signals, pairs_with, upstream.
3. Run `node scripts/build-catalog.mjs`. It regenerates `CATALOG.md` and fails if a folder and the catalog disagree.
4. Commit and push.

To refresh a third-party skill from its author, copy the newer folder from the repo and path listed under `upstream` in `catalog.json`.

## Sources and licenses

The workflow skills (`ai-todo`, `human-todo`, `handoff`) and the templates are my own, written for the NAND Loyalty Program and made generic here. The rest are unmodified copies of open-source skills; their licenses are in [`licenses/`](licenses/):

| Upstream | Skills | License |
|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 19 engineering, planning and workflow skills | MIT |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `vercel-react-best-practices`, `vercel-composition-patterns`, `vercel-react-native-skills` | MIT (stated in each `SKILL.md`) |
| [expo/skills](https://github.com/expo/skills) | `expo-router`, `expo-native-ui`, `expo-dev-client` | MIT |
| [neondatabase/agent-skills](https://github.com/neondatabase/agent-skills) | `neon`, `neon-postgres`, `neon-postgres-branches` | Apache-2.0 |
| [stripe/ai](https://github.com/stripe/ai) | `stripe-best-practices` | MIT |
| [wshobson/agents](https://github.com/wshobson/agents) | `github-actions-templates` | MIT |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | `find-skills` | MIT |
