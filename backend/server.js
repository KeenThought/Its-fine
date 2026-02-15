/**
 * "It's Fine" API – same behavior as the C server.
 * Run: node server.js
 * Listens on http://localhost:8080
 */

const http = require('http');

const PORT = 8080;
const ANSWER_JSON = JSON.stringify({ answer: "it's fine" });

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const method = req.method;

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (pathname !== '/api/answer') {
    res.writeHead(404);
    res.end();
    return;
  }

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (method !== 'GET') {
    res.writeHead(405);
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(ANSWER_JSON);
});

server.listen(PORT, () => {
  console.log(`It's Fine API listening on http://localhost:${PORT}`);
  console.log('GET /api/answer?q=... -> {"answer":"it\'s fine"}');
  console.log('Press Ctrl+C to stop.');
});
