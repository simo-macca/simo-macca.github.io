# Decisions Log

Newest first. One entry per significant change or decision.

## 2026-11-25: Agent instructions moved to Claude Code layout

- `AGENTS.md` → `CLAUDE.md`; `.agents/rules/` → `.claude/rules/` (`paths:` frontmatter); architecture section → `.claude/context/overview.md`.
- General workflow rules (act directly, branches, commits, pushing, formatters, imports, UI) now live in the global `~/.claude/CLAUDE.md`.
- `npm run fix` is no longer run after every change; the pre-commit hook formats staged files.
- `.claude/` is now tracked by git (removed from `.git/info/exclude`).
- `AGENTS.md` kept as a one-line pointer for other AI tools. Originals backed up in `~/dev/agent-config-backup-2026-11-25/`.
- Schema comment in `src/data/projects.js` now points to `.claude/rules/state-logic.md`.
