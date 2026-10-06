# Installing skills from this repo (instructions for Claude)

You've been pointed at this repo to choose and install the skills that fit the project you're working in. Follow these steps in order. The project you're installing into is "the project"; this repo is "the skills repo".

## 1. Get the skills repo

Clone it into a temporary folder outside the project (your scratchpad directory if you have one):

```bash
git clone --depth 1 https://github.com/MoSbeaa/claude-skills.git <temp>/claude-skills
```

If the clone fails with "Repository not found", the repo is private and this machine's git login has no access to it. Stop and tell the user: they can make the repo public, give this machine's GitHub account read access, or sign in as the repo owner (for example `! gh auth login`). Don't guess skill contents from memory.

Record the commit you cloned (`git -C <temp>/claude-skills rev-parse --short HEAD`); you'll write it down in step 6.

## 2. Read the catalog

Read `catalog.json`. Each skill has a `tier`, a `summary`, the `signals` that suggest the project needs it, and `pairs_with`. `CATALOG.md` has the same list grouped for humans. Read a skill's own `SKILL.md` only when the summary isn't enough to decide.

## 3. Survey the project

Look, don't assume. Check:

- manifests and lockfiles: `package.json` (dependencies and devDependencies, in every workspace package), `pyproject.toml`, `requirements.txt`, `go.mod`, `Cargo.toml`, `Gemfile`, `composer.json`;
- framework config: `next.config.*`, `app.json` / `app.config.*` / `eas.json` (Expo), `vite.config.*`, `nest-cli.json`, and so on;
- infrastructure: `.github/workflows/`, `vercel.json`, `Dockerfile`, `.neon` or `neon.ts`, database URLs in `.env.example` (host names only; never print secret values), ORM folders;
- docs: a `docs/`, `specs/` or similar folder with a PRD, architecture, data model, API or security documents;
- agent setup: `CLAUDE.md`, `.mcp.json` (which MCP servers exist), and `.claude/skills/` (skills already installed).

If the project is empty or new, the files won't tell you much. Ask the user in one short message what they're building (product type, web/mobile/backend, planned services like a database, payments, auth). If the user doesn't know yet, recommend `idea-refine` and `interview-me` first.

## 4. Choose

- **core**: include by default, unless the project clearly isn't a software project or the user says no.
- **recommended**: include when at least one of its `signals` matches what you found (or what the user said they plan to use).
- **optional**: include only with a concrete reason (for example `browser-testing-with-devtools` only if a chrome-devtools MCP server is configured or the user will add one).
- When you include a skill, look at its `pairs_with` and include those that also match.
- **Templates** (`templates/`): include `project-specs`, `plan-feature` and `spec-review` only if the project has real spec documents to point them at. Without specs they'd be empty shells.
- **External** entries (`external` in `catalog.json`) aren't copied in this repo. Offer one only when its signals match, and install the specific skills the user picks with its `install` command.
- Skip skills the project already has in `.claude/skills/` unless the user wants them replaced.
- If the project needs something this repo doesn't cover (a technology with no matching skill), say so, and suggest `find-skills` to search the public ecosystem.

## 5. Confirm with the user

Show one table: each chosen skill, its tier, and the reason in a few words (the signal you matched). Below it, list notable skills you left out and why, in one line each. Ask the user to confirm or change the list. One confirmation; don't ask about each skill separately.

## 6. Install

For each confirmed skill, copy the whole folder (not just `SKILL.md`; some have `references/`, `rules/` or `scripts/`):

```bash
# from the project root
mkdir -p .claude/skills
cp -r <temp>/claude-skills/skills/<name> .claude/skills/<name>
```

Or use the helper, which skips folders that already exist: `bash <temp>/claude-skills/scripts/install.sh . <name> <name> ...` (PowerShell: `scripts/install.ps1 -Project . -Skills <name>,<name>`).

Never overwrite an existing `.claude/skills/<name>` folder without asking.

For each **template**:

1. Copy `templates/<name>/` to `.claude/skills/<install_as>/` (`project-specs` becomes `<project-slug>-specs`, for example `shop-specs`).
2. Read the project's spec documents and replace every `{{placeholder}}` with real document names, rules and roles. Delete rows and checklist items the project has no source for. Never invent rules.
3. Delete the `<!-- TEMPLATE ... -->` comment block.
4. Check that the `name:` in the front matter matches the folder name.

Then update the project:

- **`CLAUDE.md`** (create it if missing): add a short "Project skills" section listing the installed skills, the source (`MoSbeaa/claude-skills` at commit `<hash>`), and how to update them (re-run these instructions).
- If `ai-todo` / `human-todo` were installed, add to `CLAUDE.md`: "`AI-TODO.md` is Claude's plan and log, `HUMAN-TODO.md` lists the owner's manual steps. Read both at session start and keep them current with the `ai-todo` and `human-todo` skills."
- If `handoff` was installed: add `handoff.md` to `.gitignore`, and add to `CLAUDE.md`: "If `handoff.md` exists at session start, read it first."
- If `idea-refine` was installed, nothing else is needed; it creates `docs/ideas/` when first used.

Don't commit unless the user asks. Delete the temporary clone when you're done.

## 7. Report

Tell the user, briefly: the skills installed (one line each), the templates you filled in and what you based them on, the `CLAUDE.md` / `.gitignore` changes, and anything they need to do (for example add a chrome-devtools MCP server). New skills normally appear right away; if one doesn't show up when they type `/`, they should restart the Claude Code session.

## Updating later

- To pick up changes from this repo: run these instructions again; in step 6, replace (after asking) the folders that changed.
- To get a third-party skill's newest version straight from its author, use `upstream` in `catalog.json`, for example `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices`. That tool installs into `.agents/skills/` and links from `.claude/skills/`; that's fine, but don't keep two copies of the same skill.
