const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Debug: Starting server.js'); // Debug log

// Serve static files from the Frontend directory
app.use(express.static(path.join(__dirname, 'Frontend')));

// Route for the home page - serves index.html by default
app.get('/', (req, res) => {
  console.log('Debug: Handling GET /'); // Debug log
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err); // Log any errors
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'Frontend')}`);
});
