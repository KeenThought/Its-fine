# Oracle of God

Daily Scripture oracle — the living Word, spoken daily. Built on the first principles of the oracles of God (Hebrews 5:12–6:2).

## What it does

- **Daily Oracle** — receive today's Scripture with reflection and first-principle tag
- **Consult** — ask a question; the oracle responds with curated Scripture
- **First Principles** — six foundational truths from Hebrews 6
- **Animated oracle** — flame awakening → scroll reveal → word spoken
- **Share** — copy or share today's word

## Quick start

### Backend

```bash
cd backend
npm start
# API at http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App at http://localhost:5173
```

The Vite dev server proxies `/api` to the backend.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/oracle/daily` | Today's oracle (verse, reflection, principle) |
| GET | `/api/oracle/principles` | Six first principles |
| POST | `/api/oracle/consult` | `{ "question": "..." }` → Scripture response |
| GET | `/api/health` | Health check |

## Stack

- **Frontend:** Vite, TypeScript
- **Backend:** Node.js (also C server in `main.c` for legacy)

## Scripture

All verses are curated from the King James Version (KJV), mapped to first principles from Hebrews 6:1–2.
