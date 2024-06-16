// server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificate.key'),
  cert: fs.readFileSync('./certificate.crt')
};

app.prepare().then(() => {
  const server = createServer(httpsOptions, (req, res) => {
    // Enable CORS for all origins
    cors()(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
    
  })
  server.timeout = 60 * 1000; // 60 seconds
  server.keepAliveTimeout = 60 * 1000; // 60 seconds
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
