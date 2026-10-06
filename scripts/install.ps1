# Copy skills (or templates) from this repo into a project's .claude\skills\.
# Usage: install.ps1 -Project <project-dir> -Skills name1,name2
# Names are folder names under skills\ or templates\. Existing folders are skipped, never overwritten.
param(
  [Parameter(Mandatory = $true)][string]$Project,
  [Parameter(Mandatory = $true)][string[]]$Skills
)
$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $Project '.claude\skills'
New-Item -ItemType Directory -Force $dest | Out-Null

foreach ($name in $Skills) {
  $src = Join-Path $repo "skills\$name"
  if (-not (Test-Path $src)) {
    $src = Join-Path $repo "templates\$name"
    if (Test-Path $src) {
      Write-Warning "$name is a template; fill in its {{placeholders}} after copying"
    } else {
      Write-Warning "skip: $name (not found in skills\ or templates\)"
      continue
    }
  }
  $target = Join-Path $dest $name
  if (Test-Path $target) {
    Write-Warning "skip: $name (already in $dest)"
    continue
  }
  Copy-Item -Recurse $src $target
  "installed: $name"
}
