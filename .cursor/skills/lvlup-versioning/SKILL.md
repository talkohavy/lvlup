---
name: lvlup-versioning
description: >-
  Bumps package version using the global lvlup CLI (lvlup add, lvlup bump) from
  git diff. Agent must infer semver level and changelog summary itself and run
  lvlup add non-interactively. Use when the user asks to version, bump the
  version, prepare a release, run lvlup, add an experience, or update
  package.json version before publish.
---

# lvlup versioning (lucky-server)

## Scope

- Use **lvlup** to record release intent and bump **`package.json`** (and changelog per project config).
- **Do not** run `lvlup publish`; the user publishes manually.

## Prerequisites

- Run all commands from the **repository root** (`lucky-server`).
- Invoke the CLI as **`lvlup`** (global install; no `npx`).

## Agent rules (mandatory)

1. **Never ask the user** for semver level (`major` / `minor` / `patch`) or for a changelog summary. Infer both from **`git diff`** (and **`git diff --staged`** when relevant) plus any paths or context the user already gave in the request.
2. **Always run `lvlup add` non-interactively:** pass **`--level`** and exactly one of **`--message`** or **`--message-file`**. Do not run bare `lvlup add`, partial flags, or interactive flows.
3. **Do not hand-write** `.lvlup/*.md` experience files.
4. After `add`, run **`lvlup bump`** when the user wants the package version bumped (or when the workflow implies bumping).

## Workflow

### 1. Inspect changes

From repo root:

```bash
git diff
git diff --staged
```

Read the full diff. If the user named specific paths, include those in your analysis.

### 2. Decide semver level

| Level | When to use |
|-------|-------------|
| **patch** | Bug fixes, internal refactors, docs-only, dependency bumps, non-breaking tweaks |
| **minor** | New backward-compatible features, new public APIs, new optional behavior |
| **major** | Breaking changes to public API, removed exports, behavior changes that break consumers |

When unsure between patch and minor, prefer **patch** unless users gain new capability. Use **major** only when consumers must change their code.

### 3. Write the summary

- One clear sentence (or short bullet list) describing **what changed for consumers**, based on the diff—not generic text.
- Use the same tone as a CHANGELOG entry.
- Prefer **`--message`** for short summaries. Use **`--message-file`** when the summary is long, multiline, or shell-quoting is awkward (write a temp file, pass `-f`, delete after if needed).

### 4. Record experience (non-interactive `add`)

```bash
lvlup add --level <major|minor|patch> --message "<summary>"
# or
lvlup add -l <major|minor|patch> -m "<summary>"
# or
lvlup add --level <major|minor|patch> --message-file /path/to/summary.md
```

Both `--level` and a summary flag are **required** so the command never prompts.

### 5. Bump version

```bash
lvlup bump
```

If `.lvlup/config.json` has `commit.afterAdd` / `commit.afterBump` enabled, lvlup may create git commits; ensure git state is acceptable before running.

### 6. Optional verify

```bash
lvlup status
```

Use before `bump` if you need to confirm pending experiences.

## Anti-goals

- Do not run `lvlup publish`.
- Do not ask the user to choose **major / minor / patch** or to type a summary.
- Do not run interactive `lvlup add` or hybrid flags (e.g. only `--level`).
