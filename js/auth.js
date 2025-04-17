// Authentication management
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Show loading state
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
  }

  const validEmail = 'user@example.com';
  const validPassword = 'password123';

  if (email === validEmail && password === validPassword) {
    // Save login state and user information
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('lastLogin', new Date().toString());
    
    // Always redirect to index.html after successful login
    window.location.href = 'index.html';
  } else {
    // Show error message
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.style.display = 'block';
      
      // Shake animation for error feedback
      const loginForm = document.querySelector('.login-container');
      if (loginForm) {
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 500);
      }
      
      // Reset login button
      if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'LOGIN <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
      }
    }
  }
}

function handleSignOut() {
  // Show confirmation if there are unsaved changes
  const hasUnsavedChanges = document.getElementById('senderName')?.value || 
                           document.getElementById('recipientName')?.value;
  
  if (hasUnsavedChanges) {
    if (!confirm('You have unsaved data. Are you sure you want to sign out?')) {
      return;
    }
  }
  
  // Clear all authentication data
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  
  // Redirect to login page
  window.location.href = 'login.html';
}

// This function will help check login state on every page
function checkLoginState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Get current page name
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.endsWith('login.html');
  const isIndexPage = currentPath.endsWith('index.html') || 
                      currentPath.endsWith('/') || 
                      currentPath.split('/').pop() === '';
  
  console.log(`Auth.js: Current path: ${currentPath}, Login page: ${isLoginPage}, Index page: ${isIndexPage}, Logged in: ${isLoggedIn}`);
  
  if (isLoginPage && isLoggedIn) {
    // On login page but already logged in
    window.location.href = 'index.html';
    return;
  } else if (isIndexPage && !isLoggedIn) {
    // On main page but not logged in
    window.location.href = 'login.html';
    return;
  }
}

// Session timeout handling
function setupSessionTimeout() {
  // Check session every minute
  setInterval(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;
    
    const lastLogin = new Date(localStorage.getItem('lastLogin') || Date.now());
    const currentTime = new Date();
    const sessionTimeMs = currentTime - lastLogin;
    
    // Log out after 30 minutes of inactivity (1800000 ms)
    if (sessionTimeMs > 1800000) {
      alert('Your session has expired. Please log in again.');
      handleSignOut();
    }
  }, 60000); // Check every minute
  
  // Update last active time on user interaction
  document.addEventListener('click', updateLastLoginTime);
  document.addEventListener('keypress', updateLastLoginTime);
}

function updateLastLoginTime() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    localStorage.setItem('lastLogin', new Date().toString());
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("Auth.js: DOM content loaded");
  
  // Setup login button on login page
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
    console.log("Auth.js: Login button listener set up");
  }
  
  // Setup Enter key functionality on login inputs
  if (document.getElementById('email')) {
    document.getElementById('email').addEventListener('keyup', function(event) {
      if (event.key === 'Enter') handleLogin();
    });
  }
  
  if (document.getElementById('password')) {
    document.getElementById('password').addEventListener('keyup', function(event) {
      if (event.key === 'Enter') handleLogin();
    });
  }
  
  // Setup sign out button on main page
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', handleSignOut);
    console.log("Auth.js: Sign out button listener set up");
  }
  
  // Check login state on every page load
  checkLoginState();
  
  // Setup session timeout handler
  setupSessionTimeout();
});
