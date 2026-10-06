// Regenerates CATALOG.md from catalog.json and checks that every catalog entry
// has a folder with a SKILL.md, and every folder has a catalog entry.
// Usage: node scripts/build-catalog.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const catalog = JSON.parse(readFileSync(join(root, "catalog.json"), "utf8"));

const problems = [];
for (const [list, dir] of [[catalog.skills, "skills"], [catalog.templates, "templates"]]) {
  const names = new Set(list.map((s) => s.name));
  for (const s of list) {
    if (!existsSync(join(root, s.path, "SKILL.md"))) problems.push(`${s.path}/SKILL.md is missing`);
  }
  for (const folder of readdirSync(join(root, dir))) {
    if (!names.has(folder)) problems.push(`${dir}/${folder} has no entry in catalog.json`);
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const categories = [
  ["workflow", "Workflow and session management"],
  ["planning", "Planning and ideas"],
  ["engineering", "Engineering practice (any stack)"],
  ["frontend", "Frontend and web"],
  ["mobile", "Mobile (React Native / Expo)"],
  ["infrastructure", "Infrastructure and services"],
  ["meta", "Finding more skills"],
];

const cell = (text) => text.replace(/\|/g, "\\|");
let md = `# Skill catalog

Generated from \`catalog.json\` by \`node scripts/build-catalog.mjs\`; edit the JSON, not this file.

**Tier:** core = useful in almost any software project; recommended = install when the signals match; optional = only when clearly needed.
`;

for (const [key, title] of categories) {
  const rows = catalog.skills.filter((s) => s.category === key);
  if (!rows.length) continue;
  md += `\n## ${title}\n\n| Skill | Tier | What it does | Install when | Source |\n|---|---|---|---|---|\n`;
  for (const s of rows) {
    const signals = s.signals.join("; ") + (s.requires ? ` (needs ${s.requires.join(", ")})` : "");
    md += `| [\`${s.name}\`](${s.path}/SKILL.md) | ${s.tier} | ${cell(s.summary)} | ${cell(signals)} | ${s.upstream.repo} |\n`;
  }
}

md += `\n## Templates (filled in per project)\n\nThese need the project's own spec documents. Claude copies them, replaces the \`{{placeholders}}\` with the project's real documents and rules, and renames them.\n\n| Template | Installs as | What it does | Install when |\n|---|---|---|---|\n`;
for (const t of catalog.templates) {
  md += `| [\`${t.name}\`](${t.path}/SKILL.md) | \`${t.install_as}\` | ${cell(t.summary)} | ${cell(t.signals.join("; "))} |\n`;
}

if (catalog.external?.length) {
  md += `\n## External (installed from the author, not copied here)\n\n| Collection | What it does | Skills | Install |\n|---|---|---|---|\n`;
  for (const e of catalog.external) {
    md += `| [${e.name}](https://github.com/${e.upstream.repo}) | ${cell(e.summary)} | ${e.skills.map((s) => `\`${s}\``).join(", ")} | \`${e.install}\` |\n`;
  }
}

writeFileSync(join(root, "CATALOG.md"), md);
console.log(`CATALOG.md: ${catalog.skills.length} skills, ${catalog.templates.length} templates`);
