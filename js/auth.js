// Authentication management
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const validEmail = 'user@example.com';
  const validPassword = 'password123';

  if (email === validEmail && password === validPassword) {
    localStorage.setItem('isLoggedIn', 'true'); // Save login state
    
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
    }
  }
}

function handleSignOut() {
  localStorage.removeItem('isLoggedIn'); // Clear login state
  // Use direct assignment for more reliable redirection
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
});
