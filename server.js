const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create a server instance without using deprecated properties
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] "${req.method} ${req.url}" "${req.headers['user-agent']}"`);
  
  // Handle the favicon.ico request directly
  if (req.url === '/favicon.ico') {
    const faviconPath = path.join(__dirname, 'favicon.ico');
    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(data);
    });
    return;
  }
  
  // Parse URL to get the file path
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Check if the path exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If the path doesn't exist, try with .html extension
      if (path.extname(filePath) === '') {
        filePath += '.html';
        fs.stat(filePath, (innerErr, innerStats) => {
          if (innerErr) {
            res.writeHead(404);
            res.end('Not found');
            return;
          }
          serveFile(filePath, res);
        });
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
      return;
    }
    
    // If the path is a directory, serve index.html
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      serveFile(filePath, res);
      return;
    }
    
    // Serve the file
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      return;
    }
    
    // Use setHeader instead of directly setting _headers
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${__dirname}`);
});
