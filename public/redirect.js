// Redirect script to handle initial routing
// This script runs before React takes over routing

(function() {
  // Get current path
  const currentPath = window.location.pathname;
  
  // Non-protected routes
  const publicRoutes = [
    '/login',
    '/debug',
    '/diagnostic',
    '/demo'
  ];
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Redirect logic
  if (!isLoggedIn && !publicRoutes.includes(currentPath) && currentPath !== '/') {
    // Not logged in and trying to access protected route - redirect to login
    window.location.href = '/login';
  } else if (isLoggedIn && currentPath === '/login') {
    // Already logged in and trying to access login page - redirect to app
    window.location.href = '/';
  }
  
  // Check for session timeout
  const lastActivity = localStorage.getItem('lastActivity');
  if (isLoggedIn && lastActivity) {
    const now = new Date().getTime();
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    
    if (now - parseInt(lastActivity) > SESSION_TIMEOUT) {
      // Session timed out - log out and redirect
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      
      if (currentPath !== '/login') {
        window.location.href = '/login?timeout=true';
      }
    } else {
      // Update activity timestamp
      localStorage.setItem('lastActivity', now.toString());
    }
  }
})();