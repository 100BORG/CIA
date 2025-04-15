#!/bin/bash
echo "Cleaning up npm installation issues..."

# Remove the problematic node_modules directory
rm -rf node_modules/

# Remove package-lock.json to ensure a fresh installation
rm -f package-lock.json

# Clear npm cache completely
npm cache clean --force

# Install dependencies with legacy peer deps enabled
npm install --legacy-peer-deps

echo "Cleanup complete. Now run 'npm start' to start the application."
