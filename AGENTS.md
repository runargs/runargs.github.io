# Codex Collaboration Guide

## Project Context

- Stack: Vite 5, React 18, TypeScript, Tailwind CSS, and shadcn-ui.
- Application source: `src/`, with route pages in `src/pages/`, reusable UI in `src/components/`, and test setup in `src/test/`.
- Path alias: `@/` resolves to `src/`.
- Package manager: npm (`package-lock.json` is committed).

## Commands

- Development server: `npm run dev`
- Lint: `npm run lint`
- Tests: `npm test`
- Production build: `npm run build`

Run the narrowest relevant validation first. Use `npm run lint`, `npm test`, and `npm run build` for changes that affect shared behavior, application code, or release output.

## Primary Agent Responsibilities

The primary Codex agent owns requirements clarification, task decomposition, delegation, approval gates, conflict resolution, integration, and the final response. It must verify each delegated result rather than treating it as an automatic approval.

Read the matching profile in `.codex/agents/` before delegating work. Profiles describe role boundaries; they do not replace this guide or the primary agent's judgment.

## Delegation Rules

- Run read-only discovery and review agents in parallel when their scopes do not depend on one another.
- Assign explicit file ownership before any agent edits. Never run two editing agents against overlapping files or directories at the same time.
- Keep discovery, UI review, copy review, test execution, and code review read-only.
- Use `quick-implementer` only for a small, well-defined change confined to one or two files. The primary agent confirms the scope first.
- Use `implementer` for features, bug fixes, refactors, cross-cutting changes, or work that needs tests and broader validation.
- For substantial implementation work, request targeted validation from `test-runner` and a diff review from `code-reviewer` before completion. Request `ui-reviewer` when the change affects rendered UI, interaction, responsive behavior, or accessibility.
- Merge or apply one editing result before assigning the next overlapping change. The primary agent resolves conflicts and preserves user changes.

## Copy Approval Gate

Visible, user-facing copy includes headings, labels, buttons, helper text, errors, empty states, onboarding text, and meaningful alternative text. `copy-reviewer` may inspect and propose changes, but the primary agent must obtain explicit user approval before implementing any visible-copy change.

Approval is not required for refactoring, documentation, comments, tests, or code reuse when they do not alter visible behavior or user-facing copy. Do not treat code identifiers, internal logs, or developer documentation as visible copy.

## Git Rules

- Keep commits small and logically grouped around a shared concern. Do not split commits mechanically by task, page, or file.
- `commit-pusher` may stage and commit only completed, primary-agent-approved work.
- Never push, create a remote branch, open a pull request, or otherwise change remote Git state without explicit user instruction.
- Do not revert, discard, or overwrite pre-existing user changes.
