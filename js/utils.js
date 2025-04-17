// Utility functions
function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatDateForInput(date) {
  return date.toISOString().split('T')[0];
}

function setupDefaultLogo() {
  try {
    // Base64 encoded fallback logo
    const fallbackLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UwN2ZhOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI5MCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0id2hpdGUiPkNJQTwvdGV4dD48L3N2Zz4=';
    
    const logoElement = document.getElementById('previewLogo');
    if (!logoElement) return;
    
    // First set the fallback logo
    logoElement.src = fallbackLogo;
    logoElement.alt = 'Company Logo';
    
    // Then try to load the actual logo
    const defaultLogoPath = './images/default-logo.png';
    
    const img = new Image();
    img.onload = function() {
      logoElement.src = defaultLogoPath;
    };
    img.onerror = function() {
      console.warn('Default logo not found, using fallback');
      // Already using fallback, no action needed
    };
    img.src = defaultLogoPath;
  } catch (e) {
    console.error('Error setting up logo:', e);
  }
}

function generateInvoiceNumber() {
  const currentYear = new Date().getFullYear();
  try {
    let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
    lastInvoiceNumber += 1;
    localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
    return `${currentYear}-${lastInvoiceNumber}`;
  } catch (e) {
    console.error('Error accessing localStorage for invoice number:', e);
    return `${currentYear}-${Math.floor(Math.random() * 1000) + 1}`;
  }
}
