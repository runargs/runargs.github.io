# Alexa Thoennes portfolio

This portfolio is designed as an editorial record rather than a conventional personal homepage. It brings professional experience, talks, community work, art, side projects, and contact paths into one continuous narrative, using the visual language of a warm civic publication and an archival dossier.

The repository also documents how the site was made: through a human-directed, role-specialized agent workflow with explicit context, bounded responsibilities, approval gates, and verification.

## Project intent

The central product challenge was not simply to place a resume on the web. It was to make a wide range of work feel coherent without flattening it into a generic portfolio template.

The narrative spine is a working method: sample broadly, test in practice, follow evidence, and use AI to expand human agency. Professional work shows that method across research, product, engineering, and communication; public engagements, service, creative practice, and marginalia show where it travels next.

That led to a few guiding decisions:

- Use a single-page reading experience so the work accumulates as a narrative rather than feeling like a set of disconnected destinations.
- Pair persistent section navigation with scroll-aware state so visitors can move deliberately while retaining a sense of place.
- Treat photographs, artifacts, talks, and side projects as evidence, not decoration.
- Build a reusable visual system around paper, ink, civic color, square geometry, and restrained early-computing references.
- Keep moments of personality—such as the lights-off interaction and Clippy contact prompt—purposeful and subordinate to the work.
- Preserve access needs through semantic labels, reduced-motion behavior, visible navigation state, and mobile safe-area handling.

## Product and design decisions

The main page moves from a statement of method into work across the stack, public engagements, service, creative practice, marginalia, and a guided contact flow. Résumé access and credentials sit inside the work chapter instead of creating a second résumé-like section. A separate creative-practice route at `/art` provides a motion-led Haruhay Studio story, project browser, media viewer, and commission or booking inquiry flow.

Desktop and mobile navigation use distinct interaction patterns rather than forcing one layout across screen sizes. Active-section tracking is coordinated at the page level, while section content remains modular. This keeps the experience continuous for visitors and the implementation legible for future changes.

The visual system is similarly structured. Shared editorial primitives, typography, color tokens, image treatments, and interaction states create consistency without making each section identical. The result aims to feel collected over time, but still governed by a coherent system.

## Technical shape

The site is a Vite, React, and TypeScript application styled with Tailwind CSS and selected shadcn/Radix primitives. [`src/pages/Index.tsx`](./src/pages/Index.tsx) owns the main one-page document shell, active-section state, and scroll-fed behavior; [`src/pages/ArtPage.tsx`](./src/pages/ArtPage.tsx) owns the creative-practice experience. Major content bands live in [`src/components/sections/`](./src/components/sections/); navigation lives in [`src/components/layout/`](./src/components/layout/); reusable editorial and contact elements live in [`src/components/design-system/`](./src/components/design-system/) and [`src/components/contact/`](./src/components/contact/).

Both contact experiences use progressive, in-page forms with a final review state. The static site sends submissions through FormSubmit's AJAX endpoint, so visitors remain on the page and submitted fields stay visible but locked. Local images and videos live under `public/media/art/`; Instagram projects use local posters or video previews and retain their canonical external links.

The main and creative-practice pages also share a lightweight guestbook. A visitor can leave a bare kudos in one click or optionally add their reason for visiting, whether they found what they needed, and a short note. Raw entries are delivered to Gmail through the same accountless FormSubmit path as contact inquiries. Each submission includes a stable schema version, page identifier, path, timestamp, and build commit when available.

Public guestbook totals and approved notes are deliberately separate from raw submissions. [`src/data/guestbook.ts`](./src/data/guestbook.ts) is the curated, version-controlled snapshot used by the site. This keeps private feedback out of the bundle, prevents deployments from erasing entries, and allows published metrics to be reviewed before they appear. Until the snapshot contains data, no empty counter is rendered. Percentages should be published only once the snapshot has at least 20 structured responses; smaller samples should use raw counts.

To publish a guestbook update:

1. Review or summarize guestbook emails in Gmail.
2. Approve any quote before making it public.
3. Update the totals, date, and approved notes in `src/data/guestbook.ts`.
4. Run the normal lint, test, and production build checks before publishing.

Future pages should reuse [`src/components/feedback/Guestbook.tsx`](./src/components/feedback/Guestbook.tsx) with a new stable `page` value rather than creating another submission flow. If live aggregation is added later, the curated snapshot can be replaced by a read-only endpoint without changing the visitor-facing form or its field names.

That separation reflects product boundaries as much as code boundaries: page-level orchestration, reusable interaction patterns, content modules, and visual primitives can evolve independently while preserving a consistent visitor experience. Shared utilities handle behavior such as reduced-motion-aware scrolling, and the repository includes linting, tests, and a production build as separate validation signals.

## Agentic development workflow

The site was developed through a coordinated set of role-specialized Codex agents. The workflow treats agents as collaborators operating inside an explicit product and engineering system—not as a single prompt-to-code step and not as a fully autonomous development process.

[`AGENTS.md`](./AGENTS.md) is the shared operating contract. It gives every role the same project context, defines approval boundaries, separates discovery from implementation, protects user-facing copy, sets validation expectations, and prevents agents from silently expanding scope. [`.codex/config.toml`](./.codex/config.toml) connects that repository-level context to the specialized role definitions in [`.codex/agents/`](./.codex/agents/).

| Stage | Product question | Workflow control |
| --- | --- | --- |
| Frame | What outcome is being requested, and what must remain unchanged? | The primary agent clarifies scope, identifies approval gates, and assigns explicit ownership. |
| Explore | Where does the behavior live, and what else could the change affect? | A read-only explorer maps relevant code, dependencies, and risks before implementation. |
| Decide | Does the change alter language, interaction, or visual meaning? | Copy and material UI changes are separated and held for human approval. |
| Implement | What is the smallest coherent change that satisfies the intent? | A quick implementer handles narrow edits; a broader implementer owns cross-cutting work and focused tests. |
| Review | Did the implementation preserve behavior, accessibility, and design-system consistency? | Read-only code and UI reviewers inspect the result from distinct perspectives. |
| Verify | What evidence supports calling the work complete? | A test runner executes the narrowest relevant checks, followed by broader lint, test, and build validation when warranted. |
| Record | Can the change be understood and reversed later? | Small, logically grouped commits preserve an auditable history; remote actions remain explicitly authorized. |

The role boundaries are deliberate. Exploration does not mutate code. Review is independent from implementation. Copy review can propose language but cannot approve it. Test execution is separated from feature construction. The primary agent remains responsible for integrating evidence, resolving conflicts, and deciding whether the requested outcome has actually been met.

## What the workflow optimizes for

This setup is designed around a few practical principles:

- **Context quality over prompt volume.** Durable project rules are written once and shared across roles instead of being reconstructed for every task.
- **Bounded autonomy.** Agents can make progress within a defined scope, while product, editorial, and material experience decisions remain human-controlled.
- **Risk-matched review.** Copy, UI, code, and validation are treated as different problem types with different failure modes.
- **Reversible progress.** Narrow ownership and small commits make changes easier to inspect, understand, and undo.
- **Evidence-based completion.** A plausible implementation is not considered complete until it has been reviewed and validated in proportion to its risk.

## Outcome

The finished site is both the portfolio and a record of the system used to shape it. Its content and visual language remain personal, while the repository makes the surrounding decision process inspectable: how intent became constraints, how work was decomposed, where autonomy was bounded, and how quality was evaluated before completion.
