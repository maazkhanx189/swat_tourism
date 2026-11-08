# Swat Tourism API

NestJS REST API for the Swat Tourism frontend. It uses PostgreSQL, Prisma, JWT bearer authentication, and local image uploads.

## Requirements

- Node.js 24.15+ (NestJS 12 requirement)
- Docker Desktop, or a PostgreSQL 16 database

## Run locally

From this directory in PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up -d postgres
npm install
npm run db:generate
npm run db:migrate -- --name init
```

Set a private, random `JWT_SECRET` of at least 32 characters in `.env`. To create the first administrator, set `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` (8–72 bytes), then run:

```powershell
npm run db:seed
npm run start:dev
```

The API listens on `http://localhost:3001`; uploaded images are served under `/uploads/`. The default CORS origin is the frontend at `http://localhost:3000`; set `CORS_ORIGIN` to a comma-separated allowlist when needed.

## API

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a regular user |
| POST | `/auth/login` | Public | Get a JWT access token |
| GET | `/tours` | Public | List tour packages |
| GET | `/tours/:id` | Public | Get a tour and its gallery |
| POST, PATCH, DELETE | `/tours` and `/tours/:id` | Admin | Manage tour packages |
| POST | `/tours/upload` | Admin | Upload one JPEG, PNG, or WebP (5 MB max); returns an `/uploads/...` path |
| GET, POST, PATCH, DELETE | `/destinations` and `/destinations/:id` | Public reads; admin writes | Manage destinations |
| GET, POST, PATCH, DELETE | `/gallery` and `/gallery/:id` | Public reads; admin writes | Manage gallery images |
| POST | `/bookings` | Authenticated | Book a tour; amount is calculated from its stored price |
| GET | `/bookings` | Authenticated | List the caller's bookings (admins see all) |
| PATCH | `/bookings/:id/cancel` | Owner or admin | Cancel a booking |
| PATCH | `/bookings/:id/status` | Admin | Set booking status |

Send protected requests with `Authorization: Bearer <accessToken>`. Registration always creates a `USER`; only the seed command provisions an `ADMIN`.

Tour prices are stored as display strings, for example `$23 per person` or `$195 per family of 4`. Booking totals use the leading amount; per-person prices are multiplied by guest count, family prices by the number of families needed, and other prices are treated as a flat package price.

## Useful commands

```powershell
npm run start:dev
npm run build
npm run lint
npm run test
npm run db:generate
npm run db:migrate -- --name describe_change
npm run db:deploy
npm run db:seed
```

For a new NestJS project, the equivalent CLI setup and module generation commands are:

```powershell
npm install -g @nestjs/cli
nest new backend --package-manager npm
cd backend
nest g module auth
nest g controller auth
nest g service auth
nest g module tours
nest g controller tours
nest g service tours
nest g module bookings
nest g controller bookings
nest g service bookings
nest g module prisma
nest g service prisma
```
