/**
 * Oracle of God API
 * Run: node server.js
 * Listens on http://localhost:8080
 */

const http = require('http');
const { getDailyOracle, getConsultOracle, FIRST_PRINCIPLES } = require('./oracle-data');

const PORT = process.env.PORT || 8080;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function sendJson(res, status, data) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(status);
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathname = url.pathname;
  const method = req.method;

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (pathname === '/api/health' && method === 'GET') {
      sendJson(res, 200, { status: 'ok', name: 'Oracle of God API' });
      return;
    }

    if (pathname === '/api/oracle/daily' && method === 'GET') {
      const dateParam = url.searchParams.get('date');
      const date = dateParam ? new Date(dateParam) : new Date();
      sendJson(res, 200, getDailyOracle(date));
      return;
    }

    if (pathname === '/api/oracle/principles' && method === 'GET') {
      sendJson(res, 200, { principles: FIRST_PRINCIPLES });
      return;
    }

    if (pathname === '/api/oracle/consult' && method === 'POST') {
      const body = await readBody(req);
      let question = '';
      try {
        const parsed = JSON.parse(body || '{}');
        question = typeof parsed.question === 'string' ? parsed.question : '';
      } catch {
        sendJson(res, 400, { error: 'Invalid JSON body' });
        return;
      }
      if (!question.trim()) {
        sendJson(res, 400, { error: 'Question is required' });
        return;
      }
      sendJson(res, 200, getConsultOracle(question));
      return;
    }

    // Legacy endpoint
    if (pathname === '/api/answer' && method === 'GET') {
      sendJson(res, 200, { answer: "it's fine" });
      return;
    }

    res.writeHead(404);
    res.end();
  } catch (err) {
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Oracle of God API listening on http://localhost:${PORT}`);
  console.log('  GET  /api/oracle/daily');
  console.log('  GET  /api/oracle/principles');
  console.log('  POST /api/oracle/consult  { "question": "..." }');
  console.log('Press Ctrl+C to stop.');
});
