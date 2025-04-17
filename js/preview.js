// Invoice preview and PDF functions
function updatePreview() {
  document.getElementById('previewInvoiceNumber').textContent =
    document.getElementById('invoiceNumber').value || 'INV-001';

  const invoiceDate = document.getElementById('invoiceDate').value;
  document.getElementById('previewInvoiceDate').textContent = invoiceDate
    ? formatDate(new Date(invoiceDate))
    : '';

  document.getElementById('previewSenderName').textContent =
    document.getElementById('senderName').value || 'Your Company Name';
  document.getElementById('previewSenderAddress').innerHTML = (
    document.getElementById('senderAddress').value || 'Your Address'
  ).replace(/\n/g, '<br>');
  document.getElementById('previewSenderGSTIN').textContent =
    document.getElementById('senderGSTIN').value || 'Your GSTIN';

  document.getElementById('previewRecipientName').textContent =
    document.getElementById('recipientName').value || 'Client/Customer Name';
  document.getElementById('previewRecipientEmail').textContent =
    document.getElementById('recipientEmail').value || 'Client Email';

  document.getElementById('previewRecipientAddress').innerHTML = (
    document.getElementById('recipientAddress').value || 'Client Address'
  ).replace(/\n/g, '<br>');
  document.getElementById('previewRecipientPhone').textContent =
    document.getElementById('recipientPhone').value || 'Client Phone Number';

  document.getElementById('previewRecipientGSTIN').textContent =
    document.getElementById('recipientGSTIN').value || 'Client GSTIN';

  document.getElementById('previewRecipientPAN').textContent =
    document.getElementById('recipientPAN').value || 'Client PAN No';

  const notes = document.getElementById('notes').value || '';
  const formattedNotes = notes
    .replace(/Account Name:/g, '<b>Account Name:</b>')
    .replace(/Bank Name:/g, '<b>Bank Name:</b>')
    .replace(/Account Number:/g, '<b>Account Number:</b>')
    .replace(/IFSC Code:/g, '<b>IFSC Code:</b>');

  document.getElementById('previewNotes').innerHTML = formattedNotes.replace(/\n/g, '<br>');

  updatePreviewItems();
  updateCalculations();
}

function updatePreviewItems() {
  const tbody = document.getElementById('previewItems');
  tbody.innerHTML = '';

  const rows = document.querySelectorAll('#itemsTableBody .item-row, #itemsTableBody .nested-row');

  rows.forEach((row) => {
    const name = row.querySelector('.item-name')?.value || '';
    const description = row.querySelector('.item-description')?.value || 'No description';
    const usdAmount = parseFloat(row.querySelector('.item-total-usd')?.value) || 0;
    const inrAmount = parseFloat(row.querySelector('.item-total-inr')?.value) || 0;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${description}</td>
      <td class="text-right">${usdAmount ? `$${usdAmount.toFixed(2)}` : ''}</td>
      <td class="text-right">${inrAmount ? `₹${inrAmount.toFixed(2)}` : ''}</td>
    `;

    tbody.appendChild(newRow);
  });
}

function showPreview() {
  updatePreview();
  const preview = document.getElementById('invoicePreview');
  preview.style.display = 'block';
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.print();
    preview.style.display = 'none';
  }, 100);
}

function downloadPDF() {
  updatePreview();
  const preview = document.getElementById('invoicePreview');
  if (!preview) {
    console.error('Preview element not found');
    alert('Error: Could not find the preview element.');
    return;
  }
  
  preview.style.display = 'block';
  
  // Show loading indicator
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) loadingOverlay.classList.add('active');

  console.log('Starting PDF generation');
  
  // Double check libraries before proceeding
  if (typeof html2canvas === 'undefined') {
    console.error('html2canvas library not loaded');
    alert('Required library (html2canvas) is not loaded. Please refresh the page and try again.');
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    preview.style.display = 'none';
    return;
  }

  // Fix for jsPDF initialization - simplified approach using common CDN version
  html2canvas(preview, {
    scale: 2,
    useCORS: true,
    scrollY: 0,
    logging: false,
    allowTaint: true,
    backgroundColor: '#ffffff'
  }).then((canvas) => {
    console.log('Canvas generated successfully');
    const imgData = canvas.toDataURL('image/png');
    
    try {
      console.log('Initializing jsPDF');
      
      // Try multiple ways to initialize jsPDF
      let pdf;
      
      // Try direct import first (ESM style)
      if (typeof jsPDF === 'function') {
        console.log('Using direct jsPDF constructor');
        pdf = new jsPDF('p', 'mm', 'a4');
      } 
      // Try UMD style import (window.jspdf.jsPDF)
      else if (typeof window.jspdf !== 'undefined' && typeof window.jspdf.jsPDF === 'function') {
        console.log('Using window.jspdf.jsPDF constructor');
        const { jsPDF } = window.jspdf;
        pdf = new jsPDF('p', 'mm', 'a4');
      }
      // Try alternative global
      else if (typeof window.jsPDF === 'function') {
        console.log('Using window.jsPDF constructor');
        pdf = new window.jsPDF('p', 'mm', 'a4');
      }
      else {
        throw new Error('jsPDF library not found. Make sure the library is properly loaded.');
      }
      
      console.log('jsPDF initialized successfully');
      
      // Continue with PDF generation
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      console.log('Adding image to PDF');
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      console.log('Saving PDF');
      const fileName = `Invoice-${document.getElementById('invoiceNumber').value || 'new'}.pdf`;
      pdf.save(fileName);
      console.log(`PDF saved as ${fileName}`);
      
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      preview.style.display = 'none';
      
    } catch (err) {
      console.error('Error creating PDF:', err);
      alert('Error creating PDF: ' + err.message + '. Please check console for details.');
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      preview.style.display = 'none';
    }
  }).catch(err => {
    console.error('Error generating canvas:', err);
    alert('Failed to generate PDF: ' + err.message);
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    preview.style.display = 'none';
  });
}
