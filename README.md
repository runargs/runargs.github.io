# Alexa Thoennes portfolio

Personal portfolio site for Alexa Thoennes, built as an editorial, archival-style civic publication. The site combines professional experience, engagements, community work, visual/art artifacts, notes, resume access, and contact paths in a single-page React application.

## Local development

Use npm; `package-lock.json` is committed.

```sh
npm install
npm run dev
```

The development server uses Vite and is configured in [`vite.config.ts`](./vite.config.ts).

## Commands

```sh
npm run dev       # local development server
npm run lint      # ESLint
npm test          # Vitest
npm run build     # production build
npm run preview   # preview the production build locally
```

Deployment is through the static output produced by `npm run build`. The build writes to `dist/`, which can be served by GitHub Pages or another static host.

## Application architecture

- `src/pages/` contains route-level pages. [`src/pages/Index.tsx`](./src/pages/Index.tsx) coordinates the portfolio sections, active-section state, scroll behavior, and shared navigation.
- `src/components/sections/` contains the major content bands: biography, work, engagements, community, art, notes, resume, and contact.
- `src/components/layout/` contains desktop and mobile navigation.
- `src/components/design-system/` contains reusable editorial primitives such as section headers, cards, badges, image frames, and the lights-off interaction.
- `src/components/ui/` contains shadcn/Radix primitives that are still used by the site.
- `src/lib/` contains shared utilities, including section scrolling.
- `src/test/` contains Vitest setup and tests.
- `public/images/` and `public/fonts/` contain the site imagery and local bitmap-style display font.

The `@/` alias resolves to `src/`.

## Design system

The site intentionally preserves a warm paper palette, square editorial geometry, Corben/Public Sans/bitmap typography, a pixel portrait, restrained early-computing references, real photography and artifacts, and a dark-mode candlelight interaction.

Shared design primitives live in [`src/components/design-system/Dossier.tsx`](./src/components/design-system/Dossier.tsx). Global visual contracts and CSS custom properties live in [`src/index.css`](./src/index.css). Changes should preserve reduced-motion support, accessible labels, mobile safe-area behavior, and the distinct desktop/mobile navigation patterns.

## Agentic development workflow

This repository uses role-specialized Codex agents for delegated repository tasks, staged review, and verification passes. The workflow is coordinated through shared repository instructions and human approval gates; it is not a fully autonomous development system.

```text
runargs.github.io/
├── AGENTS.md
└── .codex/
    ├── config.toml
    └── agents/
        ├── code-explorer.toml
        ├── code-reviewer.toml
        ├── commit-pusher.toml
        ├── copy-reviewer.toml
        ├── implementer.toml
        ├── quick-implementer.toml
        ├── test-runner.toml
        └── ui-reviewer.toml
```

[`AGENTS.md`](./AGENTS.md) is the repository-wide operating contract for agents. It defines project context, approval boundaries, coding conventions, testing expectations, commit strategy, rules for user-facing copy, and behavior that must be preserved during refactoring. Repository-wide rules belong there; role-specific instructions belong in the individual agent definitions.

[`.codex/config.toml`](./.codex/config.toml) is the project-scoped Codex configuration. It currently points readers to `AGENTS.md` and `.codex/agents/*.toml`, and intentionally does not override the user's default model, reasoning level, sandbox, or approval policy.

The current role files are:

- [`code-explorer.toml`](./.codex/agents/code-explorer.toml): read-only discovery, dependency tracing, impact mapping, and concise implementation context. This is the implemented explorer role; there is no separate `explorer.toml` file.
- [`implementer.toml`](./.codex/agents/implementer.toml): larger code-writing tasks, safe refactors, behavior preservation, focused tests, and validation.
- [`quick-implementer.toml`](./.codex/agents/quick-implementer.toml): small implementation changes confined to one or two files.
- [`ui-reviewer.toml`](./.codex/agents/ui-reviewer.toml): visual hierarchy, responsive behavior, interaction states, accessibility, reduced-motion behavior, and design-system consistency.
- [`copy-reviewer.toml`](./.codex/agents/copy-reviewer.toml): approval-gated editorial review of visible copy, terminology, tone, clarity, and consistency.
- [`code-reviewer.toml`](./.codex/agents/code-reviewer.toml): read-only diff review for correctness, regressions, accessibility effects, maintainability, and scope control.
- [`test-runner.toml`](./.codex/agents/test-runner.toml): verification-focused linting, tests, builds, and concise failure reporting.
- [`commit-pusher.toml`](./.codex/agents/commit-pusher.toml): staging and small local commits after primary-agent approval; remote pushes require explicit user instruction.

The typical workflow is:

```text
Request
  ↓
Code explorer maps the relevant code
  ↓
Copy and visible behavior changes are separated for approval
  ↓
Implementer performs approved work and safe cleanup
  ↓
UI reviewer checks visual and responsive quality
  ↓
Copy reviewer verifies approved language
  ↓
Test runner validates the final state
  ↓
Small commits preserve an auditable history
```

Agents may independently perform safe, behavior-preserving cleanup. User-facing copy requires approval before implementation, and material visual or interaction changes require approval before implementation. Reviewers can propose changes, but they should not silently expand scope. The human owner remains responsible for product, editorial, and design decisions.

This structure keeps exploration separate from implementation, editorial review separate from code review, and testing separate from feature work. Narrow roles reduce context pollution, shared instructions prevent each agent from reconstructing project constraints, and small commits make agent work easier to inspect and reverse.

## Repository structure

```text
.
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── design-system/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── lib/
│   ├── pages/
│   └── test/
└── public/
    ├── fonts/
    └── images/
```

## Change management

- Preserve the portfolio's existing identity rather than redesigning from scratch.
- Keep visible copy changes separate from refactors and implement them only after approval.
- Keep visual or interaction changes separate when they materially alter what visitors see or how the site behaves.
- Prefer small, typed, local changes over broad abstractions.
- Run the narrowest relevant validation first, then `npm run lint`, `npm test`, and `npm run build` for shared behavior, application code, dependency, or release-output changes.
- Keep commits small and grouped around a shared concern.
