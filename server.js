const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8085;
const MIME_TYPES = {
     '.html': 'text/html',
     '.css': 'text/css',
     '.js': 'application/javascript',
     '.json': 'application/json',
     '.png': 'image/png',
     '.jpg': 'image/jpeg',
     '.gif': 'image/gif',
     '.svg': 'image/svg+xml',
     '.ico': 'image/x-icon',
     '.woff': 'font/woff',
     '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
     let filePath = '.' + req.url;
     if (filePath === './') {
          filePath = './index.html';
     }

     const extname = path.extname(filePath).toLowerCase();
     const contentType = MIME_TYPES[extname] || 'application/octet-stream';

     fs.readFile(filePath, (error, content) => {
          if (error) {
               if (error.code === 'ENOENT') {
                    // Try serving index.html for SPA routing
                    fs.readFile('./index.html', (err, indexContent) => {
                         if (err) {
                              res.writeHead(404);
                              res.end('Page not found');
                         } else {
                              res.writeHead(200, { 'Content-Type': 'text/html' });
                              res.end(indexContent, 'utf-8');
                         }
                    });
               } else {
                    res.writeHead(500);
                    res.end('Server error: ' + error.code);
               }
          } else {
               res.writeHead(200, {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
               });
               res.end(content, 'utf-8');
          }
     });
});

server.listen(PORT, '0.0.0.0', () => {
     console.log(`DentistPro server running at http://0.0.0.0:${PORT}`);
     console.log('Press Ctrl+C to stop');
});
