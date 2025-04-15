#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('Attempting to start the React application...');

// Path to node_modules/.bin/react-scripts
const scriptPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');

// Spawn the process
const child = spawn(scriptPath, ['start'], { 
  stdio: 'inherit',
  shell: true 
});

// Handle process exit
child.on('close', (code) => {
  if (code !== 0) {
    console.log(`React scripts exited with code ${code}`);
    console.log('Trying alternative method...');
    
    // Try alternative method with npx
    const npxChild = spawn('npx', ['react-scripts', 'start'], { 
      stdio: 'inherit',
      shell: true 
    });
    
    npxChild.on('close', (npxCode) => {
      if (npxCode !== 0) {
        console.error(`Failed to start application. Exit code: ${npxCode}`);
      }
    });
  }
});
