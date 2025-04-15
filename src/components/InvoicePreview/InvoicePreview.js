import React, { forwardRef } from 'react';
import './InvoicePreview.css';

const InvoicePreview = forwardRef(({ invoiceData, formatDate }, ref) => {
  return (
    <div id="invoicePreview" className="invoice-preview" ref={ref} style={{ display: 'block' }}>
      <div className="invoice-header">
        <div className="invoice-branding">
          {invoiceData.companyLogo && (
            <img 
              src={invoiceData.companyLogo} 
              alt="Company Logo" 
              style={{ maxWidth: '150px', maxHeight: '100px', marginBottom: '1rem' }} 
            />
          )}
          <h3>{invoiceData.senderName || 'Your Company Name'}</h3>
          <div dangerouslySetInnerHTML={{ __html: (invoiceData.senderAddress || 'Your Address').replace(/\n/g, '<br>') }} />
          <div>{invoiceData.senderGSTIN || 'Your GSTIN'}</div>
        </div>
        <div className="invoice-info">
          <h2>INVOICE</h2>
          <div><strong>Invoice #:</strong> <span>{invoiceData.invoiceNumber || 'INV-001'}</span></div>
          <div><strong>Date:</strong> <span>
            {invoiceData.invoiceDate ? formatDate(new Date(invoiceData.invoiceDate)) : ''}
          </span></div>
        </div>
      </div>
      
      <div className="invoice-addresses">
        <div className="address-block">
          <h3>BILL TO</h3>
          <h3>{invoiceData.recipientName || 'Client/Customer Name'}</h3>
          <div dangerouslySetInnerHTML={{ __html: (invoiceData.recipientAddress || 'Client Address').replace(/\n/g, '<br>') }} />
          <div>{invoiceData.recipientEmail || 'Client Email'}</div>
          <div>{invoiceData.recipientPhone || 'Client Phone Number'}</div>
          <div>{invoiceData.recipientGSTIN || 'Client GSTIN'}</div>
          <div>{invoiceData.recipientPAN || 'Client PAN No'}</div>
        </div>
      </div>
      
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Invoice Summary</h2>  
      <div className="invoice-items">
        <table>
          <thead>
            <tr>
              <th width="20%">Item Name</th>
              <th width="40%">Description</th>
              <th width="20%">Amount (USD)</th>
              <th width="20%">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id}>
                <td>{!item.isNested ? item.name : ''}</td>
                <td>{item.description}</td>
                <td className="text-right">
                  {parseFloat(item.amountUSD) ? `$${parseFloat(item.amountUSD).toFixed(2)}` : ''}
                </td>
                <td className="text-right">
                  {parseFloat(item.amountINR) ? `₹${parseFloat(item.amountINR).toFixed(2)}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="invoice-totals">
        <div className="total-row">
          <span className="total-label">Subtotal:</span>
          <span className="total-value">${invoiceData.subtotalUSD.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span className="total-label">Tax ({invoiceData.taxRate}%):</span>
          <span className="total-value">${invoiceData.taxAmountUSD.toFixed(2)}</span>
        </div>
        <div className="total-row grand-total">
          <span className="total-label">Total (USD):</span>
          <span className="total-value">${invoiceData.totalUSD.toFixed(2)}</span>
        </div>
        <div className="total-row grand-total">
          <span className="total-label">Total (INR):</span>
          <span className="total-value">₹{invoiceData.totalINR.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="invoice-notes">
        <h3>Note</h3>
        <div dangerouslySetInnerHTML={{ 
          __html: invoiceData.notes
            .replace(/Account Name:/g, '<b>Account Name:</b>')
            .replace(/Bank Name:/g, '<b>Bank Name:</b>')
            .replace(/Account Number:/g, '<b>Account Number:</b>')
            .replace(/IFSC Code:/g, '<b>IFSC Code:</b>')
            .replace(/\n/g, '<br>')
        }} />
      </div>
      
      <div className="invoice-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p><i>Thank you for your business!</i></p>
      </div>
    </div>
  );
});

export default InvoicePreview;
