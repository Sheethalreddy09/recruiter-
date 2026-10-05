# Cleanup notes

## Scope

Reviewed the uploaded Recruiter portal and refactored its structure. Preserved the UI design, route URLs, existing business behavior, database schema and demo mode. No database migrations or external services were run.

## Removed

Confirmed unused source files:

- `src/services/api/recruiter.api.ts`: no callers; this was a simulated wrapper around the same store, not an HTTP client.
- `src/components/recruiter/AddCandidateModal.tsx`: never mounted or imported; called a nonexistent `addCandidate` action. No active screen was removed.
- `src/components/recruiter/JobCard.tsx`, `RecruiterCharts.tsx`, `RecruiterStats.tsx`: no active callers.
- `src/layouts/recruiter/RecruiterSidebar.tsx`: unused import in the layout; the live header navigation remains.
- `src/App.css`: not imported by the app.
- `src/assets/react.svg`, `vite.svg`, `hero.png`: no source/public references.

Removed unused imports, props, sidebar/search state, form state without controls, and a job-type filter permanently set to “all”. Removed seven unused direct frontend dependencies: `@hookform/resolvers`, `@tanstack/react-query`, `clsx`, `react-hook-form`, `recharts`, `tailwind-merge`, `zod`. The unused Query provider was removed with its dependency. Existing lockfiles were updated through npm.

## Organization

- Dedicated route module with lazy imports for all recruiter pages.
- Seven typed Zustand slices. Existing public store hook and storage key retained.
- Demo records separated from store actions; task/message demo data and types separated from screens.
- Candidate-search query helper and static form options extracted into feature folders.
- Whole-store component subscriptions replaced with individual field selectors.
- Active CSS moved to `src/styles/globals.css` and entry import updated.
- Nine injectable backend feature services behind the original `RecruiterService` facade. Controller endpoint contracts remain intact.
- Backend fallback fixture functions moved to a clearly labeled demo folder.
- Formatting configuration, editor settings, root check commands and accurate setup documentation added. Prettier is a development-only root dependency.

## Build fixes

The uploaded frontend failed its production build with three errors:

1. An unreachable candidate modal referenced an action missing from the store. Removed that unused module.
2. A Lucide icon received an unsupported `title` prop. Moved tooltip text to its wrapping element and gave the icon an accessible label.
3. Newly submitted candidates lacked fields required by their type/detail view. Added empty avatar/history/education/project/certification defaults.

Also replaced `__dirname` in the Vite ESM config with `import.meta.dirname` and enabled TypeScript unused-local/parameter checks in the frontend.

Candidate search now initializes query-derived tags in state initialization, rather than an effect that immediately changes state. Changing the URL query remounts the search form; its local filters reset for the new query. Search history recording remains in an effect.

Backend static-check scripts now work without relying on an uninstalled ESLint or Prettier executable. The backend `lint` command is a TypeScript unused-local/type check, not ESLint.

## Verified

- Frontend production build succeeds.
- Backend build and Prisma client generation succeed.
- Frontend lint: zero warnings/errors.
- Backend TypeScript static checks pass.
- Seven frontend regression tests pass: job persistence; candidate/application data; interview feedback and stage changes; offer acceptance; saved searches; query parsing; rendering all twenty recruiter screens.
- Nine existing backend Jest tests pass after provider registration changes.
- Prettier formatting check passes.

The render test uses server rendering to catch module/component failures. It is not a browser interaction or mobile layout test. The backend tests use mocked Prisma. No live PostgreSQL, payment, AI provider or authenticated end-to-end workflow was verified. The user's localhost was inaccessible from the remote browser, so this package carries no claimed browser timing or responsiveness score.

## Remaining work

The retained demo auth fallback, permissive CORS, hardcoded JWT fallback secret, fake-success database error handlers, incomplete tenant checks and fixed token balances still require a separate backend integration/security task. Removing these in a code-organization pass would change current demo behavior. The UI must not be treated as production authenticated until that work is completed.

Large form JSX remains in the relevant page files; routing, data fixtures, state mutations and backend domain logic have been separated. Further visual component extraction should follow a feature task and a browser regression pass.
