// Invoice actions (reset, send email)
function resetForm() {
  if (confirm('Are you sure you want to create a new invoice? All current data will be lost.')) {
    const currentYear = new Date().getFullYear();
    let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
    lastInvoiceNumber += 1;
    localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
    const invoiceNumberInput = document.getElementById('invoiceNumber');
    if (invoiceNumberInput) invoiceNumberInput.value = `${currentYear}-${lastInvoiceNumber}`;

    const today = new Date();
    const invoiceDateInput = document.getElementById('invoiceDate');
    if (invoiceDateInput) invoiceDateInput.valueAsDate = today;

    const fields = [
      'taxRate', 'senderName', 'senderAddress', 'senderGSTIN',
      'recipientName', 'recipientEmail', 'recipientAddress',
      'recipientPhone', 'recipientGSTIN', 'recipientPAN', 'notes'
    ];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Reset notes field with default banking template
    const notesField = document.getElementById('notes');
    if (notesField) {
      notesField.value = `Account Name:
Bank Name:
Account Number:
IFSC Code:`;
    }

    const tbody = document.getElementById('itemsTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr class="item-row">
          <td rowspan="1">
            <input type="text" placeholder="Item name" class="item-name" />
            <button class="btn btn-secondary add-nested-row">Add Description</button>
          </td>
          <td>
            <textarea placeholder="Item description" class="item-description"></textarea>
          </td>
          <td>
            <input type="number" value="0.00" step="0.01" min="0" class="item-total-usd" placeholder="Amount (USD)" />
          </td>
          <td>
            <input type="number" value="0.00" step="0.01" min="0" class="item-total-inr" placeholder="Amount (INR)" />
          </td>
          <td>
            <button class="btn-icon delete remove-item">×</button>
          </td>
        </tr>
      `;

      // Re-attach event listeners for the new row
      const usdInput = tbody.querySelector('.item-total-usd');
      const inrInput = tbody.querySelector('.item-total-inr');
      if (usdInput) usdInput.addEventListener('input', updateCalculations);
      if (inrInput) inrInput.addEventListener('input', updateCalculations);

      const addNestedRowButton = tbody.querySelector('.add-nested-row');
      if (addNestedRowButton) {
        addNestedRowButton.addEventListener('click', function (e) {
          e.preventDefault();
          addNestedRow(tbody.querySelector('.item-row'));
        });
      }
    }

    updateCalculations();
    updatePreview();
  }
}

function sendInvoice() {
  updatePreview();

  const recipientEmail = document.getElementById('recipientEmail').value;
  if (!recipientEmail) {
    alert('Please enter the recipient\'s email address.');
    return;
  }
  
  // Show loading indicator before sending
  document.getElementById('loadingOverlay').classList.add('active');

  try {
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS library not loaded');
    }
    
    // First generate PDF content
    html2canvas(document.getElementById('invoicePreview'), {
      scale: 1,
      useCORS: true,
      scrollY: 0,
    }).then((canvas) => {
      // Convert to base64 for email attachment
      const imgData = canvas.toDataURL('image/png');
      
      const emailParams = {
        to_email: recipientEmail,
        subject: `Invoice - ${document.getElementById('invoiceNumber').value}`,
        message: `Please find attached the invoice ${document.getElementById('invoiceNumber').value} from ${document.getElementById('senderName').value || 'Your Company'}.`,
        attachment: imgData
      };

      emailjs.send('service_y4713fo', 'template_fadjy8l', emailParams)
        .then(() => {
          document.getElementById('loadingOverlay').classList.remove('active');
          alert('Invoice sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          document.getElementById('loadingOverlay').classList.remove('active');
          alert('Failed to send the invoice. Please try again. Error: ' + error.message);
        });
    }).catch(err => {
      document.getElementById('loadingOverlay').classList.remove('active');
      console.error('Error generating invoice preview:', err);
      alert('Failed to prepare invoice for sending. Please try again.');
    });
  } catch (e) {
    document.getElementById('loadingOverlay').classList.remove('active');
    console.error('Error sending invoice:', e);
    alert('Email service not available. Please check your connection and try again.');
  }
}
