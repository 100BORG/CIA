import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePreview = ({ invoiceData, formatDate, onClose }) => {
  // Default logo if none is provided
  const defaultLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAADnVJREFUeJzt3XmUVNWdwPHvrarqBpruhm6gWWQHEVkUF1RABXdFE43RmMk4ZuKWOaqZnGMmmSWOmZjEzWSMccx4YuISUYlKokRc0LiAsgiyC0KzyNJssrV00911747mYIik6VdV9956Ve/3+Qc5/d5773fgnLp169Y7YIwxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYc5SZPn16eXV19bTR7ocJhgVyFJk2bVpJLBa7VUSWisjV1dXVE0e7T8YfFshRora2tkhVHxSRWZ1/vBKYV1NTkzOK3TI+sUCOAjNnzsx1XfcvwCmHfPkU4Kyqqqri0eiX8Y8FchQoLCz8FXBOH9+eLS0tNw9jE3GgJcvaY9KQOzAC7p49+/CviP7UcZyHhli/DTAdWAskB35zCtgCbByiviki8g0R2QIsjkajf503b17nYG2Yoe0LGAoR/wJxHEcLCgro6Oh+X4nozcXFxfcOUr7RcZzfA2eLyAKgEOjs442h/Pz8e1tbWxf11eLcuXOXvvnmmx2qOh84VUQeBKqBji7FmqqqqvLnzZt32H6bOXNm7uTJk4+dPXt227vvvhuZO3duPbBksFH1xHGco3p635w5c3Kqq6srganAtP32f7S5rptv+4JdY0ZHR0fvgThOKBQKLRukfFlxcfE1qnqlqp4JHF1eXl5aVFT0oqr+O7ChS9lYLBZ7CfgFsAt4pKys7GJVnQNcA1zu+/49Xdu65pprttbW1v4WuAt4DTgF2L5fkUbgfuB5oKNr/dmzZ7etX7/+HRH5QFWXisgi13X/CPxpsDH1xHGcaSJyiIEDSWlpaTuwrd9CNWt9iUhOVVVVMTBORIr3269j+76AXdXV1RNF5JC/L9XV1fsjIfIvoB/W1NQU+Vj6SuA24Iyuz9IOcc6cOTm1tbVFCxcu/Iq7QkTO9zzvURGZnf6aruv+8H93d9Lnn3++z507dwnQVFpa+hfgCxF5R1U7ReROETm5axs1NTW5b7zxxuequhwodhznAqCxvLz8t13bKioq+hBYDdSISL6qPg881t7ePn/JkiWH3AvpvBexGfhsKOPrwnNd98h6lEJk9uzZrc3NzR8DS4A6YJft16D26/4GDGTQh4aG2HhKRO5X1btEZKyFsQeRtWvXqohsA97pXkBERESWL1++asmSJUsHKp1IJNYBa7q30Vnz0a7vX7p06daun1dVVX1SVVX1SZcyg06aFJFmVf1AVVf2X7JPnud5LS0ttg9jlJ1iHeFEROLx+DXAvP0P8MYOkXnAz/wYq4jEnXRhMzQ2y2qME5FK3/f/FZgjIrePcneMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxgD/wM6gF7NxNP5fQAAAABJRU5ErkJggg==";
  
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
