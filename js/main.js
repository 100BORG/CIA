// Main application initialization with improved error handling
document.addEventListener('DOMContentLoaded', function() {
  console.log("Main.js: DOM content loaded, checking login state at " + new Date().toISOString());
  
  // Ensure visibility first
  document.body.style.visibility = 'visible';
  
  try {
    // Try to continue initialization even if login check fails
    var continueInitialization = true;
    
    // Check login state
    if (!localStorage.getItem('isLoggedIn')) {
      console.log("Main.js: Not logged in, will redirect to login page");
      
      // Add redirect but don't return - try to initialize anyway to avoid white page
      setTimeout(function() {
        try {
          window.location.href = 'login.html';
        } catch(e) {
          console.error("Error redirecting:", e);
        }
      }, 500);
      
      // Don't initialize user-specific content
      continueInitialization = false;
    }
    
    if (continueInitialization) {
      console.log("Main.js: User is logged in, initializing app");
      
      // Rest of initialization code...
      try {
        initializeEmailJs();
        setupDefaultLogo();
        
        // Generate invoice number
        const invoiceNumber = generateInvoiceNumber();
        const invoiceNumberEl = document.getElementById('invoiceNumber');
        if (invoiceNumberEl) {
          invoiceNumberEl.value = invoiceNumber;
        }
        
        // Set invoice number in preview
        const previewInvoiceNumberEl = document.getElementById('previewInvoiceNumber');
        if (previewInvoiceNumberEl) {
          previewInvoiceNumberEl.textContent = invoiceNumber;
        }
        
        // Set dates
        const today = new Date();
        const invoiceDateEl = document.getElementById('invoiceDate');
        if (invoiceDateEl) {
          invoiceDateEl.value = formatDateForInput(today);
        }
        
        const previewInvoiceDateEl = document.getElementById('previewInvoiceDate');
        if (previewInvoiceDateEl) {
          previewInvoiceDateEl.textContent = formatDate(today);
        }
        
        // Setup event listeners
        setupEventListeners();
        
        // Initial calculations
        updateCalculations();
      } catch(e) {
        console.error("Error initializing application:", e);
      }
    }
  } catch(e) {
    console.error("Critical error in main.js:", e);
  }
  
  // Always hide loading overlay
  setTimeout(() => {
    try {
      const loadingOverlay = document.getElementById('loadingOverlay');
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      
      const initialLoading = document.getElementById('initialLoading');
      if (initialLoading) initialLoading.style.display = 'none';
    } catch(e) {
      console.error("Error hiding loading overlays:", e);
    }
  }, 500);
});

// Initialize EmailJS with enhanced error handling
function initializeEmailJs() {
  try {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('E6klVgu7C2hAkoxFM');
      console.log("EmailJS initialized successfully");
    } else {
      console.error('EmailJS not loaded, will try to initialize later');
      setTimeout(initializeEmailJs, 1000);
    }
  } catch (e) {
    console.error('Error initializing EmailJS:', e);
  }
}

function setupEventListeners() {
  // Sign out functionality is now handled in auth.js
  
  // Add item button
  const addItemBtn = document.getElementById('addItemBtn');
  if (addItemBtn) {
    addItemBtn.addEventListener('click', addNewItem);
  }

  // Remove item buttons - use event delegation for dynamically added elements
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      removeItem(e.target);
    }
    
    if (e.target.classList.contains('add-nested-row')) {
      e.preventDefault();
      const parentRow = e.target.closest('.item-row');
      if (parentRow) {
        addNestedRow(parentRow);
      }
    }
  });

  // Recalculate on input change - use event delegation
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
    const el = document.getElementById(field);
    if (el) {
      el.addEventListener('input', updatePreview);
    }
  });

  // Company logo upload handler
  const companyLogoInput = document.getElementById('companyLogo');
  if (companyLogoInput) {
    companyLogoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const logoElement = document.getElementById('previewLogo');
          if (logoElement) {
            logoElement.src = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Button actions
  const previewBtn = document.getElementById('previewBtn');
  if (previewBtn) previewBtn.addEventListener('click', showPreview);

  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) downloadBtn.addEventListener('click', downloadPDF);

  const newInvoiceBtn = document.getElementById('newInvoiceBtn');
  if (newInvoiceBtn) newInvoiceBtn.addEventListener('click', function() {
    resetForm();
    setupDefaultLogo();
  });

  const sendInvoiceBtn = document.getElementById('sendInvoiceBtn');
  if (sendInvoiceBtn) sendInvoiceBtn.addEventListener('click', sendInvoice);
}
