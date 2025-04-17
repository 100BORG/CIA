// Immediate login check
(function() {
  try {
    // Get the current page name - account for various path formats
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    // Simple filename check - more robust handling
    const isIndexPage = filename === 'index.html' || filename === '' || path.endsWith('/');
    const isLoginPage = filename === 'login.html';
    
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    console.log("Redirect.js: Page check: " + filename + ", Path: " + path + ", Login state: " + (isLoggedIn ? "logged in" : "not logged in"));
    
    // Redirect logic - this runs immediately before DOM is ready
    if (isIndexPage && !isLoggedIn) {
      console.log("Redirect.js: Not logged in on index page, redirecting to login");
      window.location.href = 'login.html';
    } else if (isLoginPage && isLoggedIn) {
      console.log("Redirect.js: Already logged in on login page, redirecting to index");
      window.location.href = 'index.html';
    }
  } catch (e) {
    console.error("Error in redirect script: " + e);
  }
})();
