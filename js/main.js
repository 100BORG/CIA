// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log("Main.js: DOM content loaded, checking login state");
  
  // First immediate check - do not continue initializing if not logged in
  if (!localStorage.getItem('isLoggedIn')) {
    console.log("Main.js: Not logged in, redirecting to login page");
    window.location.href = 'login.html';
    return; // Stop executing the rest of the function
  }
  
  console.log("Main.js: User is logged in, initializing app");
  
  // Initialize EmailJS
  emailjs.init('E6klVgu7C2hAkoxFM');
  
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
  // Sign out functionality is now handled in auth.js
  
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
