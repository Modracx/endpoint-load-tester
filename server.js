import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8787;

// The load-test engine runs in the BROWSER (so traffic uses the browser VPN's
// exit IP). This server only serves the static page.
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    try {
      const html = await readFile(join(__dirname, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch {
      res.writeHead(500); return res.end('index.html missing');
    }
  }
  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Load tester UI at http://localhost:${PORT}`);
});
