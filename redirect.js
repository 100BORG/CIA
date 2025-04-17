// Ultra-simplified redirect script to prevent white page errors
console.log("Redirect script loaded at " + new Date().toISOString());

// Ensure content is visible immediately
if (document.body) {
    document.body.style.visibility = "visible";
    console.log("Body visibility set to visible immediately");
} else {
    // If body isn't ready yet, wait for it
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.visibility = "visible";
        console.log("Body visibility set to visible on DOMContentLoaded");
    });
}

// Simple login check without any redirects on first load
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log("DOM loaded, checking login state");
        
        // Handle the loading overlay regardless of anything else
        setTimeout(function() {
            try {
                var loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                    console.log("Loading overlay hidden");
                }
                
                var initialLoading = document.getElementById('initialLoading');
                if (initialLoading) {
                    initialLoading.style.display = 'none';
                    console.log("Initial loading hidden");
                }
            } catch(e) {
                console.error("Error hiding loading overlays:", e);
            }
        }, 800);
        
        // Simple login check
        try {
            var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            var path = window.location.pathname;
            var filename = path.split('/').pop() || '';
            
            // Check for explicit login page
            var isLoginPage = filename === 'login.html';
            var isIndexOrRoot = filename === 'index.html' || filename === '' || path.endsWith('/');
            
            console.log("Path: " + path + ", Login state: " + (isLoggedIn ? "logged in" : "not logged in"));
            
            // Add auto login param for testing
            if (window.location.search.includes('autologin=true')) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', 'user@example.com');
                console.log("Auto-login parameter detected, login state set");
                isLoggedIn = true;
            }
            
            // Only redirect if needed and not within first 100ms (prevent white page)
            setTimeout(function() {
                // Very specific redirect conditions to avoid loops
                if (isIndexOrRoot && !isLoggedIn && !window.location.href.includes('login.html')) {
                    console.log("Not logged in, redirecting to login page");
                    window.location.href = 'login.html';
                } else if (isLoginPage && isLoggedIn) {
                    console.log("Already logged in, redirecting to index page");
                    window.location.href = 'index.html';
                } else {
                    console.log("No redirection needed");
                }
            }, 1000);
        } catch(e) {
            console.error("Error in login check:", e);
        }
    } catch(e) {
        console.error("Critical error in redirect script:", e);
        // Ensure all content is visible despite errors
        document.body.style.visibility = 'visible';
    }
});
