# Clyptus Recruiter Portal

Recruiter frontend and partial NestJS backend, organized for team development. The current UI is a **demo backed by browser state**, not an authenticated, database-connected application.

## Run locally

Use Node.js 24 LTS and npm. Install from the included lockfiles:

```powershell
npm ci
npm --prefix frontend ci
npm --prefix backend ci
npm --prefix backend run prisma:generate
```

The root install provides the formatter. Frontend and backend keep their own dependencies.

Start the frontend in one terminal:

```powershell
cd frontend
npm run dev
```

Open the localhost URL printed by Vite (normally port 5173). The frontend demo works independently of the backend. The login form is simulated; it does not verify a real account.

Start the backend in a second terminal:

```powershell
cd backend
npm run start:dev
```

The backend defaults to port 3000. Swagger is served at `/api/docs`; recruiter endpoints start with `/api/v1/org/:organizationId/recruiter`.

For database development, create `backend/.env` with your local `DATABASE_URL`, `JWT_SECRET` and optional `PORT`. Use a **separate development database**, rather than reusing the admin portal database without first reconciling the schemas. This upload does not include a migration history or seed script. On a new development database, generate the initial migration with `npm run prisma:migrate -- --name init` inside `backend`.

No private environment files, installed dependencies, generated database client or build output are included in the archive.

## Where code belongs

| Location                                                 | Responsibility                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `frontend/src/App.tsx`                                   | App/router bootstrap                                                                          |
| `frontend/src/routes/RecruiterRoutes.tsx`                | Existing route URLs and lazy page imports                                                     |
| `frontend/src/pages/auth`                                | Demo login screen                                                                             |
| `frontend/src/pages/recruiter`                           | Page presentation and page-local interaction                                                  |
| `frontend/src/components/recruiter`                      | Shared tables, cards and dialogs                                                              |
| `frontend/src/layouts/recruiter`                         | Header and workspace layout                                                                   |
| `frontend/src/features`                                  | Feature-specific types, option lists and query helpers                                        |
| `frontend/src/store/recruiterStore.ts`                   | Zustand slice composition and persistence                                                     |
| `frontend/src/store/recruiter.types.ts`                  | Shared store state/action contract                                                            |
| `frontend/src/store/slices`                              | Account, jobs, applications, interviews, offers, search and UI actions                        |
| `frontend/src/demo`                                      | Sample records and legacy browser integration                                                 |
| `frontend/src/styles/globals.css`                        | Active Tailwind/global stylesheet                                                             |
| `frontend/src/types/recruiter.types.ts`                  | Shared frontend domain types                                                                  |
| `backend/src/modules/recruiters/recruiter.controller.ts` | Existing HTTP route contracts                                                                 |
| `backend/src/modules/recruiters/recruiter.service.ts`    | Facade delegating to feature services                                                         |
| `backend/src/modules/recruiters/services`                | Dashboard, jobs, candidates, applications, interviews, offers, workspace, tokens and AI logic |
| `backend/src/modules/recruiters/dto`                     | Request DTOs                                                                                  |
| `backend/src/modules/recruiters/demo`                    | Existing backend fallback records                                                             |
| `backend/src/common`                                     | Guards, decorators and request context                                                        |
| `backend/src/infrastructure/database`                    | Prisma connection                                                                             |
| `backend/prisma/schema.prisma`                           | Current database models                                                                       |

Existing routes and styling are retained. The main workspace is `/org/:organizationId/recruiter`; `/`, `/login` and `/recruiter/login` still open the demo login.

## Validation and formatting

From the project root, after installation and Prisma generation:

```powershell
npm run build
npm run lint
npm test
npm run format:check
```

- `build`: TypeScript/Vite frontend build, then NestJS backend build.
- `lint`: frontend Oxlint with warnings treated as failures; backend TypeScript validation with unused-local checks. It does not modify files.
- `test`: frontend state/persistence/render regression tests, followed by the existing Jest backend tests.
- `format:check`: consistent Prettier formatting. Use `npm run format` to apply formatting.

Frontend tests use Vite's module loader and Node's test runner; no additional test framework dependency is needed. Backend tests use mocked Prisma, so a running database is not required for tests.

For a production-bundle preview (not a production hosting service):

```powershell
cd frontend
npm run build
npm run preview
```

## Current implementation boundaries

- **Authentication:** frontend login is simulated. The backend JWT guard falls back to a mock recruiter when a token is absent or invalid. Real session management, permission checks and tenant membership enforcement remain to be implemented.
- **Data:** frontend workflows use Zustand/local component state. No frontend-to-backend HTTP connection exists. Zustand retains the existing `clyptus_recruiter_store_v2` storage key so this cleanup does not intentionally reset saved data.
- **Demo bridge:** `src/demo/portalBridge.ts` preserves `window.ClyptusPortalAPI`, initialized explicitly in `main.tsx`. The original demo startup reseeding behavior is retained. It is not a cross-portal production API.
- **Persistence:** task/message state is local to the page. Many backend methods still return sample or success-shaped results when database operations fail.
- **Tokens/AI:** token accounting and AI outputs contain hardcoded demo behavior. They are not production billing or live model integrations.
- **Search:** keyword/location/experience filtering is local. Other advanced controls do not all affect results; tokenizing a query is not a complete Boolean-search engine.
- **Remaining integration work:** database migrations, frontend/backend field and enum mapping, real notifications/messaging, authorization and error handling.

See [Cleanup notes](docs/CLEANUP.md) for changes and verification limits. This cleanup does not make these unfinished areas production-ready.
