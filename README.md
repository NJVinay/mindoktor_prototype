# Right Door Prototype (Min Doktor x Mindpark)

This is a functional prototype built for the Min Doktor hackathon. The goal is to provide a "Right Door" experience where patients are guided through an interactive 3D body map and a dynamic, anatomy-specific triage flow to connect them with the right specialist.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), React Three Fiber (3D), Zustand, Framer Motion
- **Backend:** Node.js, Express, PostgreSQL, Prisma, Redis
- **Data:** 44 highly specific clinical conditions mapped to human anatomy and tissue layers

## Features
1. **3D Body Model:** An interactive 360-degree rotating human model.
2. **Layer Switching:** Filter conditions by tissue layer (Skin, Muscles, Skeleton, Organs, Nervous system).
3. **Anatomy Triage Wizard:** A dynamic 4-step wizard at `/anatomy-triage`.
4. **Question Bank Engine:** Dynamically renders medical questions and options depending on the exact condition selected.
5. **Specialist Match:** Recommends a specific clinical specialist based on the condition.

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
# Start Docker (Postgres & Redis)
docker-compose up -d
# Push schema & Seed database
npm run db:push
npm run seed
# Start API
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Start development server
npm run dev
```

## Deployment
This repository is configured for deployment on **Netlify**.
- A `netlify.toml` file handles the configuration.
- The build targets the `frontend/` directory with `npm run build`.

## License
Min Doktor Hackathon 2026.
