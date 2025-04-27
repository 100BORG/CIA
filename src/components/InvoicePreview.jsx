import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePreview = ({ invoiceData, formatDate, onClose }) => {
  // Default logo if none is provided
  const defaultLogo = "data:image/png;base64,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";

  // Extract exchange rate from the invoiceData or use default
  const exchangeRate = invoiceData.exchangeRate || 82;
  
  // Generate PDF function
  const downloadPDF = async () => {
    try {
      const previewElement = document.getElementById('invoicePreviewContent');
      
      if (!previewElement) {
        throw new Error('Preview element not found');
      }
      
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowWidth: 794, // A4 width in px (about)
        windowHeight: 1123, // A4 height in px (about)
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;
      
      // If content is taller than a single page, add new pages
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;
      
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        pageNumber++;
      }
      
      pdf.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="invoice-preview">
      {/* Action buttons outside the preview content */}
      <div className="actions" style={{ marginBottom: '20px' }}>
        <button className="btn" onClick={downloadPDF}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          Download PDF
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Invoice
        </button>
      </div>
      
      {/* A4 Size Content for PDF Generation */}
      <div id="invoicePreviewContent" className="a4-preview-container">
        {/* 1. Top Header Section with Company Logo and Invoice Title */}
        <div className="preview-header">
          <div className="company-info">
            <img 
              className="preview-logo" 
              src={invoiceData.logoUrl || defaultLogo} 
              alt="Company Logo" 
            />
            <div className="company-name-header">
              <h1>{invoiceData.senderName || 'Your Company'}</h1>
            </div>
          </div>
          <div className="invoice-title">
            <h2>INVOICE</h2>
          </div>
        </div>
        
        {/* 2. Company and Invoice Details Section */}
        <div className="details-section">
          <div className="company-details">
            <p>{invoiceData.senderAddress || 'Company Address'}</p>
            <p>GSTIN: {invoiceData.senderGSTIN || 'N/A'}</p>
          </div>
          <div className="invoice-details">
            <div className="invoice-number">
              <p><strong>Invoice #:</strong> {invoiceData.invoiceNumber}</p>
            </div>
            <div className="invoice-date">
              <p><strong>Date:</strong> {formatDate(invoiceData.invoiceDate)}</p>
            </div>
          </div>
        </div>
        
        {/* 3. Client Information Section */}
        <div className="bill-to-section">
          <h3>Bill To:</h3>
          <div className="customer-info">
            <div className="info-row full-width">
              <p><strong>{invoiceData.recipientName || 'Client Name'}</strong></p>
            </div>
            <div className="info-row full-width">
              <p>{invoiceData.recipientAddress || 'Client Address'}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>Phone:</strong> {invoiceData.recipientPhone || 'N/A'}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>Email:</strong> {invoiceData.recipientEmail || 'N/A'}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>GSTIN:</strong> {invoiceData.recipientGSTIN || 'N/A'}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>PAN:</strong> {invoiceData.recipientPAN || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* 4. Invoice Rate Information */}
        <div className="invoice-summary">
          <div className="rate-info">
            <p><strong>USD to INR Rate:</strong> {exchangeRate}</p>
            <p><strong>GST Rate:</strong> {invoiceData.taxRate || 5}%</p>
          </div>
        </div>
        
        {/* 5. Service Items Table */}
        <div className="service-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '70%' }}>Description</th>
                <th style={{ width: '15%' }}>Amount (USD)</th>
                <th style={{ width: '15%' }}>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <strong>{item.name || 'Service'}</strong>
                      <p>{item.description || 'Description'}</p>
                    </td>
                    <td className="text-right">${parseFloat(item.amountUSD || 0).toFixed(2)}</td>
                    <td className="text-right">₹{parseFloat(item.amountINR || 0).toFixed(2)}</td>
                  </tr>
                  {item.nestedRows?.map((nestedRow, rowIndex) => (
                    <tr key={`${index}-${rowIndex}`} className="nested-row">
                      <td>
                        <p className="indented">{nestedRow.description}</p>
                      </td>
                      <td className="text-right">${parseFloat(nestedRow.amountUSD || 0).toFixed(2)}</td>
                      <td className="text-right">₹{parseFloat(nestedRow.amountINR || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 6. Totals Section */}
        <div className="totals-section">
          <table>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td className="text-right">
                  ${invoiceData.subtotalUSD.toFixed(2)} / 
                  ₹{invoiceData.subtotalINR.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>GST ({invoiceData.taxRate}%):</td>
                <td className="text-right">
                  ${invoiceData.taxAmountUSD.toFixed(2)} / 
                  ₹{invoiceData.taxAmountINR.toFixed(2)}
                </td>
              </tr>
              <tr className="grand-total">
                <td>Grand Total:</td>
                <td className="text-right">
                  ${invoiceData.totalUSD.toFixed(2)} / 
                  ₹{invoiceData.totalINR.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 7. Beneficiary Bank Details */}
        <div className="bank-details">
          <h3>Beneficiary Account Details</h3>
          <div className="account-info">
            <div className="info-row full-width">
              <p><strong>Account Name:</strong> {invoiceData.accountName || extractAccountName(invoiceData.notes)}</p>
            </div>
            <div className="info-row full-width">
              <p><strong>Bank Name:</strong> {invoiceData.bankName || extractBankName(invoiceData.notes)}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>Account Number:</strong> {invoiceData.accountNumber || extractAccountNumber(invoiceData.notes)}</p>
            </div>
            <div className="info-row half-width">
              <p><strong>IFSC Code:</strong> {invoiceData.ifscCode || extractIFSCCode(invoiceData.notes)}</p>
            </div>
          </div>
        </div>
        
        {/* 8. Footer Section */}
        <div className="invoice-footer">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

// Helper functions to extract payment details from notes
const extractAccountName = (notes) => {
  if (!notes) return 'N/A';
  const match = notes.match(/Account Name:?\s*([^\n]*)/i);
  return match ? match[1].trim() : 'N/A';
};

const extractBankName = (notes) => {
  if (!notes) return 'N/A';
  const match = notes.match(/Bank Name:?\s*([^\n]*)/i);
  return match ? match[1].trim() : 'N/A';
};

const extractAccountNumber = (notes) => {
  if (!notes) return 'N/A';
  const match = notes.match(/Account Number:?\s*([^\n]*)/i);
  return match ? match[1].trim() : 'N/A';
};

const extractIFSCCode = (notes) => {
  if (!notes) return 'N/A';
  const match = notes.match(/IFSC Code:?\s*([^\n]*)/i);
  return match ? match[1].trim() : 'N/A';
};

export default InvoicePreview;
