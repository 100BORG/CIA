// Invoice actions (reset, send email)
function resetForm() {
  if (confirm('Are you sure you want to create a new invoice? All current data will be lost.')) {
    const currentYear = new Date().getFullYear();
    let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
    lastInvoiceNumber += 1;
    localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
    document.getElementById('invoiceNumber').value = `${currentYear}-${lastInvoiceNumber}`;

    const today = new Date();
    document.getElementById('invoiceDate').valueAsDate = today;

    document.getElementById('taxRate').value = '0';
    document.getElementById('senderName').value = '';
    document.getElementById('senderAddress').value = '';
    document.getElementById('recipientName').value = '';
    document.getElementById('recipientAddress').value = '';
    document.getElementById('notes').value = '';

    const tbody = document.getElementById('itemsTableBody');
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

  const invoiceHTML = document.getElementById('invoicePreview').outerHTML;

  const emailParams = {
    to_email: recipientEmail,
    subject: `Invoice - ${document.getElementById('invoiceNumber').value}`,
    message: invoiceHTML,
  };

  emailjs.send('service_y4713fo', 'template_fadjy8l', emailParams)
    .then(() => {
      alert('Invoice sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send the invoice. Please try again.');
    });
}
