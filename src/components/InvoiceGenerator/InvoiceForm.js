import React from 'react';
import InvoiceItems from './InvoiceItems';

function InvoiceForm({ 
  invoiceData, 
  onInputChange, 
  onLogoChange, 
  onAddItem, 
  onAddNestedItem, 
  onRemoveItem, 
  onItemChange 
}) {
  return (
    <div className="invoice-grid">
      <div className="card">
        <h2 className="card-title">Invoice Information</h2>
        <div className="form-group">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            type="text"
            id="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={onInputChange}
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                type="date"
                id="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            id="currency"
            value={invoiceData.currency}
            readOnly
            style={{ backgroundColor: '#f8fafc', border: 'none' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxRate">Tax Rate (%)</label>
          <input
            type="number"
            id="taxRate"
            value={invoiceData.taxRate}
            min="0"
            max="100"
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <div className="card">
        <h2 className="card-title">Sender & Recipient</h2>
        <div className="form-group">
          <label htmlFor="senderName">Your Company Name</label>
          <input
            type="text"
            id="senderName"
            value={invoiceData.senderName}
            placeholder="Your Company Name"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyLogo">Company Logo</label>
          <input
            type="file"
            id="companyLogo"
            accept="image/*"
            onChange={onLogoChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senderAddress">Your Address</label>
          <textarea
            id="senderAddress"
            rows="5"
            className="multi-line"
            placeholder="Your Company Address"
            value={invoiceData.senderAddress}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senderGSTIN">Your GSTIN</label>
          <textarea
            id="senderGSTIN"
            rows="2"
            placeholder="Your GSTIN"
            value={invoiceData.senderGSTIN}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientName">Bill To</label>
          <input
            type="text"
            id="recipientName"
            placeholder="Client/Customer Name"
            value={invoiceData.recipientName}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientEmail">Recipient Email</label>
          <input
            type="email"
            id="recipientEmail"
            placeholder="Client's Email Address"
            value={invoiceData.recipientEmail}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientAddress">Client Address</label>
          <textarea
            id="recipientAddress"
            rows="5"
            className="multi-line"
            placeholder="Client/Customer Address"
            value={invoiceData.recipientAddress}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientPhone">Client Phone Number</label>
          <input
            type="tel"
            id="recipientPhone"
            placeholder="Client's Phone Number"
            value={invoiceData.recipientPhone}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientGSTIN">Client GSTIN</label>
          <textarea
            id="recipientGSTIN"
            rows="2"
            placeholder="Client's GSTIN"
            value={invoiceData.recipientGSTIN}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipientPAN">Client PAN No</label>
          <textarea
            id="recipientPAN"
            rows="2"
            placeholder="Client's PAN Number"
            value={invoiceData.recipientPAN}
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <div className="card items-section" style={{ gridColumn: 'span 2' }}>
        <InvoiceItems
          items={invoiceData.items}
          onAddItem={onAddItem}
          onAddNestedItem={onAddNestedItem}
          onRemoveItem={onRemoveItem}
          onItemChange={onItemChange}
          subtotal={invoiceData.subtotalUSD.toFixed(2)}
          taxRate={invoiceData.taxRate}
          taxAmount={invoiceData.taxAmountUSD.toFixed(2)}
          total={invoiceData.totalUSD.toFixed(2)}
        />
      </div>
      
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h2 className="card-title">Additional Information</h2>
        <div className="form-group">
          <label htmlFor="notes">Notes / Terms</label>
          <textarea
            id="notes"
            rows="5"
            className="multi-line"
            placeholder="Payment terms, bank details, or other notes for the client"
            value={invoiceData.notes}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
