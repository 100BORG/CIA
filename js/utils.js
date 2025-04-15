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
  const defaultLogoPath = './images/default-logo.png';
  const logoElement = document.getElementById('previewLogo');
  logoElement.src = defaultLogoPath;
  logoElement.alt = 'Company Logo';
}

function generateInvoiceNumber() {
  const currentYear = new Date().getFullYear();
  let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
  lastInvoiceNumber += 1;
  localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
  return `${currentYear}-${lastInvoiceNumber}`;
}
