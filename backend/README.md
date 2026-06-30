# Oracle of God – Backend

HTTP API serving daily Scripture oracles and first principles (Hebrews 6).

## Run (Node.js)

```bash
npm start
```

Server listens on **http://localhost:8080**.

## Endpoints

- `GET /api/oracle/daily` — today's oracle
- `GET /api/oracle/principles` — six first principles
- `POST /api/oracle/consult` — `{ "question": "..." }`
- `GET /api/health` — health check

## C backend (optional)

```bash
make
./server
```

The C server provides the legacy `/api/answer` endpoint only. Use Node.js for the full oracle API.
