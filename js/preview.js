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
  const { jsPDF } = window.jspdf;
  const preview = document.getElementById('invoicePreview');
  preview.style.display = 'block';

  html2canvas(preview, {
    scale: 2,
    useCORS: true,
    scrollY: 0,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`Invoice-${document.getElementById('invoiceNumber').value}.pdf`);

    preview.style.display = 'none';
  });
}
