# Installation Guide for Invoice Generator

This guide will help you install the Invoice Generator application while addressing any security vulnerabilities in dependencies.

## Standard Installation

1. Clone the repository and navigate to project directory:
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Troubleshooting Security Vulnerabilities

If you encounter security vulnerabilities during installation, follow these steps:

### Option 1: Update EmailJS Library

The application has been updated to use `@emailjs/browser` instead of `emailjs-com`:

```bash
# Remove old library
npm uninstall emailjs-com

# Install new library
npm install @emailjs/browser
```

### Option 2: Force-fix Security Vulnerabilities

To fix vulnerabilities without breaking the application:

```bash
# Create a .npmrc file to handle peer dependency issues
echo "legacy-peer-deps=true" > .npmrc

# Install dependencies
npm install

# Fix basic vulnerabilities
npm audit fix

# If you want to force fix all vulnerabilities (may cause breaking changes)
npm audit fix --force
```

### Option 3: Clean Installation

If you continue to have issues:

```bash
# Remove node_modules and lock files
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force  

# Reinstall dependencies
npm install
```

## Security Note

This is a development application and should not be used in production without addressing all security vulnerabilities.
