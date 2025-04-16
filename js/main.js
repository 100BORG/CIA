// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init('E6klVgu7C2hAkoxFM'); // Replace with your EmailJS user ID

  // Check login state
  checkLoginState();
  
  // Setup default logo
  setupDefaultLogo();

  // Generate and set the invoice number
  const invoiceNumber = generateInvoiceNumber();
  document.getElementById('invoiceNumber').value = invoiceNumber;
  document.getElementById('previewInvoiceNumber').textContent = invoiceNumber;

  // Set default dates
  const today = new Date();
  document.getElementById('invoiceDate').value = formatDateForInput(today);
  document.getElementById('previewInvoiceDate').textContent = formatDate(today);

  // Setup event listeners
  setupEventListeners();
  
  // Initial calculations
  updateCalculations();
});

function setupEventListeners() {
  // Login functionality
  document.getElementById('loginBtn').addEventListener('click', handleLogin);

  // Sign out functionality
  document.getElementById('signOutBtn').addEventListener('click', handleSignOut);

  // Add item button
  document.getElementById('addItemBtn').addEventListener('click', addNewItem);

  // Remove item buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      removeItem(e.target);
    }
  });

  // Recalculate on input change
  document.addEventListener('input', function(e) {
    if (
      e.target.classList.contains('item-total-usd') ||
      e.target.classList.contains('item-total-inr') ||
      e.target.id === 'taxRate'
    ) {
      updateCalculations();
    }
  });

  // Preview changes
  const fields = [
    'invoiceNumber',
    'invoiceDate',
    'senderName',
    'senderAddress',
    'senderGSTIN',
    'recipientName',
    'recipientEmail',
    'recipientAddress',
    'recipientPhone',
    'recipientGSTIN',
    'recipientPAN',
    'notes',
  ];
  
  fields.forEach((field) => {
    document.getElementById(field).addEventListener('input', updatePreview);
  });

  // Company logo upload handler
  document.getElementById('companyLogo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById('previewLogo').src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Button actions
  document.getElementById('previewBtn').addEventListener('click', showPreview);
  document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
  document.getElementById('newInvoiceBtn').addEventListener('click', resetForm);
  document.getElementById('sendInvoiceBtn').addEventListener('click', sendInvoice);
}
