# SolarSmart India — PRD

## Original Problem Statement
"I have this SolarSmart-India Project, I need a preview of it and then deploy it."

## Architecture
- **Frontend + API:** Next.js 15 (React 18) full-stack at `/app/frontend` (UI + API routes under `/api/[[...path]]/route.js`)
- **Backend (proxy):** FastAPI in `/app/backend/server.py` — forwards `/api/*` from port 8001 → Next.js on port 3000
- **Database:** MongoDB local (DB `solarsmart_india`) restored from provided `mongo_backup`
- **Auth:** JWT (bcryptjs) — admin auto-seeded from env, demo customer seeded

## Implemented (already shipped in uploaded project)
- Landing page, customer/admin auth (login + register)
- Assessment wizard (property/energy/roof → recommendation)
- Roof visualizer, EMI calculator, panel comparison, share buttons, PDF export
- Customer dashboard (home, assessments, installations, notifications, schemes, profile)
- Admin dashboard (users, stats, schemes CRUD, panel/state edits, notifications)
- MongoDB seeding (states, panels, schemes, admin, demo user)

## Deployment Setup Done (this session)
- Extracted Next.js zip into `/app/frontend`
- Wrote `/app/frontend/.env` with MONGO_URL, DB_NAME, JWT_SECRET, admin creds
- Replaced `/app/backend/server.py` with FastAPI proxy → forwards `/api/*` to `localhost:3000`
- Restored Mongo backup via `mongorestore`
- `yarn install` + `yarn build` (Next.js production build)
- Added `prestart: next build` to `package.json` so `yarn start` is always deploy-ready
- Verified via external URL: landing UI loads, /api/states returns data, admin + demo login succeed

## Next Action Items
- User to click "Deploy" on Emergent platform when ready
