# It's Fine – C Backend

HTTP API that responds `{"answer":"it's fine"}` to any question.

## Dependency

- **macOS**: `brew install libmicrohttpd`
- **Linux**: install `libmicrohttpd-dev` (e.g. `apt install libmicrohttpd-dev`)

## Build

```bash
make
```

## Run

```bash
./server
```

Server listens on **http://localhost:8080**.

- `GET /api/answer?q=anything` → `{"answer":"it's fine"}`
- `OPTIONS /api/answer` → CORS preflight (204)

Press Enter in the terminal to stop the server.
