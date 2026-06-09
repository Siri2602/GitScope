# GitScope – GitHub Profile Analytics Platform

A full-stack analytics platform that analyzes any GitHub profile and presents performance insights through a modern dashboard.

## Tech Stack

**Backend:** Node.js · Express.js · MySQL · Axios  
**Frontend:** React · Vite · Tailwind CSS · Framer Motion · Recharts · Lucide React

## Project Structure

```
gitscope/
├── backend/
│   ├── config/db.js          # MySQL connection pool + auto-init
│   ├── controllers/          # Business logic
│   ├── routes/api.js         # All API routes
│   ├── utils/
│   │   ├── analytics.js      # Score engine
│   │   └── github.js         # GitHub API client
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/      # Hero, particles
│   │   │   ├── dashboard/    # All dashboard cards
│   │   │   ├── charts/       # Recharts wrappers
│   │   │   └── ui/           # Navbar, Skeleton, Error
│   │   ├── hooks/            # useAnalyze, useCountUp
│   │   ├── pages/            # Landing, Analytics, Profiles
│   │   ├── services/api.js   # Axios service layer
│   │   └── utils/helpers.js
│   └── vite.config.js
└── schema.sql
```

## Setup

### 1. MySQL

```sql
CREATE DATABASE gitscope;
```

Or run `schema.sql` directly.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MySQL credentials and optionally a GitHub token
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` to `http://localhost:5000`.

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze/:username` | Analyze and store a GitHub profile |
| GET | `/api/profiles` | All analyzed profiles (recent first) |
| GET | `/api/profile/:username` | Single profile by username |
| GET | `/api/top-developers` | Profiles sorted by developer score |
| GET | `/api/search?language=Go` | Filter profiles by primary language |

## Developer Score

Scoring algorithm (0–100):

| Factor | Weight |
|--------|--------|
| Followers | 25% |
| Repositories | 15% |
| Stars | 25% |
| Forks | 10% |
| Account Age | 15% |
| Recent Activity | 10% |

**Levels:** Beginner (0–24) · Intermediate (25–49) · Advanced (50–74) · Expert (75–100)

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gitscope
GITHUB_TOKEN=ghp_...   # Optional but recommended (higher rate limits)
```
