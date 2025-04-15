import React from 'react';

const InvoiceForm = ({
  invoiceData,
  onInputChange,
  onLogoChange,
  onAddItem,
  onAddNestedItem,
  onRemoveItem,
  onItemChange,
  updateCalculations
}) => {
  const handleInputChange = (e) => {
    if (onInputChange) {
      onInputChange(e);
    }
    
    // For backwards compatibility
    if (typeof updateCalculations === 'function') {
      setTimeout(updateCalculations, 0);
    }
  };
  
  const usdToInrRate = 82; // Fixed exchange rate
  
  // Helper for formatting currency values
  const formatCurrency = (value, currency = '$') => {
    return `${currency}${parseFloat(value).toFixed(2)}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Invoice Details Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow border border-white/30">
        <h2 className="text-lg font-semibold text-dark-bg mb-4">Invoice Details</h2>
        
        <div className="mb-4">
          <label htmlFor="companyLogo" className="block text-sm font-medium mb-1">
            Company Logo
          </label>
          <input
            type="file"
            id="companyLogo"
            onChange={onLogoChange || (() => {})}
            accept="image/*"
            className="w-full px-3 py-2 text-sm border border-secondary rounded-md"
          />
          {invoiceData.companyLogo && (
            <div className="mt-2">
              <img 
                src={invoiceData.companyLogo} 
                alt="Company Logo" 
                className="h-16 object-contain"
              />
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="invoiceNumber" className="block text-sm font-medium mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            id="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="invoiceDate" className="block text-sm font-medium mb-1">
            Invoice Date
          </label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium mb-1">
            Currency
          </label>
          <input
            type="text"
            id="currency"
            value={invoiceData.currency}
            readOnly
            className="w-full px-3 py-2 bg-light-bg border-none text-text rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="taxRate" className="block text-sm font-medium mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            id="taxRate"
            value={invoiceData.taxRate}
            onChange={handleInputChange}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
      </div>
      
      {/* Sender & Recipient Information */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow border border-white/30">
        <h2 className="text-lg font-semibold text-dark-bg mb-4">Sender & Recipient</h2>
        
        <div className="mb-4">
          <label htmlFor="senderName" className="block text-sm font-medium mb-1">
            Your Company Name
          </label>
          <input
            type="text"
            id="senderName"
            value={invoiceData.senderName}
            onChange={handleInputChange}
            placeholder="Your Company Name"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="senderEmail" className="block text-sm font-medium mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="senderEmail"
            value={invoiceData.senderEmail}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="senderAddress" className="block text-sm font-medium mb-1">
            Your Address
          </label>
          <textarea
            id="senderAddress"
            value={invoiceData.senderAddress}
            onChange={handleInputChange}
            rows="3"
            placeholder="Your Full Address"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="senderPhone" className="block text-sm font-medium mb-1">
            Your Phone
          </label>
          <input
            type="text"
            id="senderPhone"
            value={invoiceData.senderPhone}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="senderGSTIN" className="block text-sm font-medium mb-1">
            Your GSTIN
          </label>
          <textarea
            id="senderGSTIN"
            value={invoiceData.senderGSTIN}
            onChange={handleInputChange}
            rows="1"
            placeholder="Your GSTIN"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientName" className="block text-sm font-medium mb-1">
            Bill To
          </label>
          <input
            type="text"
            id="recipientName"
            value={invoiceData.recipientName}
            onChange={handleInputChange}
            placeholder="Client/Customer Name"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientEmail" className="block text-sm font-medium mb-1">
            Recipient Email
          </label>
          <input
            type="email"
            id="recipientEmail"
            value={invoiceData.recipientEmail}
            onChange={handleInputChange}
            placeholder="Client's Email Address"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientAddress" className="block text-sm font-medium mb-1">
            Recipient Address
          </label>
          <textarea
            id="recipientAddress"
            value={invoiceData.recipientAddress}
            onChange={handleInputChange}
            rows="3"
            placeholder="Client's Full Address"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientPhone" className="block text-sm font-medium mb-1">
            Recipient Phone
          </label>
          <input
            type="text"
            id="recipientPhone"
            value={invoiceData.recipientPhone}
            onChange={handleInputChange}
            placeholder="Client's Phone Number"
            className="w-full px-3 py-2 border border-secondary rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientGSTIN" className="block text-sm font-medium mb-1">
            Client GSTIN
          </label>
          <textarea
            id="recipientGSTIN"
            value={invoiceData.recipientGSTIN}
            onChange={handleInputChange}
            rows="1"
            placeholder="Client's GSTIN"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="recipientPAN" className="block text-sm font-medium mb-1">
            Client PAN No
          </label>
          <textarea
            id="recipientPAN"
            value={invoiceData.recipientPAN}
            onChange={handleInputChange}
            rows="1"
            placeholder="Client's PAN Number"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
        </div>
      </div>
      
      {/* Invoice Items Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow border border-white/30 md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-dark-bg">Items</h2>
          <button 
            onClick={onAddItem || (() => {})}
            className="px-3 py-1 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Item
          </button>
        </div>
        
        {/* Item Headers */}
        <div className="hidden md:grid md:grid-cols-12 gap-2 text-sm font-medium text-dark-bg mb-2 px-3">
          <div className="md:col-span-4">Description</div>
          <div className="md:col-span-3">Details</div>
          <div className="md:col-span-2">USD</div>
          <div className="md:col-span-2">INR</div>
          <div className="md:col-span-1">Actions</div>
        </div>
        
        {/* Items List */}
        {invoiceData.items.map((item, index) => (
          <div 
            key={item.id}
            className={`mb-4 bg-white/10 rounded-md p-3 border border-white/20 ${
              item.isNested ? 'ml-8 border-l-4 border-l-blue-300' : ''
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 gap-x-2">
              {/* Item Description */}
              <div className="md:col-span-4">
                <label className="md:hidden block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onItemChange && onItemChange(item.id, 'name', e.target.value)}
                  placeholder="Item name"
                  className="w-full px-3 py-2 border border-secondary rounded-md"
                />
              </div>
              
              {/* Item Details */}
              <div className="md:col-span-3">
                <label className="md:hidden block text-sm font-medium mb-1">
                  Details
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => onItemChange && onItemChange(item.id, 'description', e.target.value)}
                  rows="1"
                  placeholder="Item description"
                  className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
                />
              </div>
              
              {/* USD Amount */}
              <div className="md:col-span-2">
                <label className="md:hidden block text-sm font-medium mb-1">
                  USD
                </label>
                <input
                  type="number"
                  value={item.amountUSD}
                  onChange={(e) => onItemChange && onItemChange(item.id, 'amountUSD', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-secondary rounded-md"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* INR Amount */}
              <div className="md:col-span-2">
                <label className="md:hidden block text-sm font-medium mb-1">
                  INR
                </label>
                <input
                  type="number"
                  value={item.amountINR}
                  onChange={(e) => onItemChange && onItemChange(item.id, 'amountINR', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-secondary rounded-md"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* Actions */}
              <div className="md:col-span-1 flex items-center space-x-2">
                <button 
                  onClick={() => onAddNestedItem && onAddNestedItem(item.id)}
                  className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                  title="Add Sub-Item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                </button>
                <button 
                  onClick={() => onRemoveItem && onRemoveItem(item.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  title="Remove Item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Totals Section */}
        <div className="mt-6 border-t border-secondary pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-dark-bg">Subtotal:</span>
            <div>
              <span className="text-dark-bg mr-4">{formatCurrency(invoiceData.subtotalUSD)}</span>
              <span className="text-dark-bg">₹{formatCurrency(invoiceData.subtotalINR, '')}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-dark-bg">Tax ({invoiceData.taxRate}%):</span>
            <div>
              <span className="text-dark-bg mr-4">{formatCurrency(invoiceData.taxAmountUSD)}</span>
              <span className="text-dark-bg">₹{formatCurrency(invoiceData.taxAmountINR, '')}</span>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-dark-bg">Total:</span>
            <div>
              <span className="text-dark-bg mr-4">{formatCurrency(invoiceData.totalUSD)}</span>
              <span className="text-dark-bg">₹{formatCurrency(invoiceData.totalINR, '')}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow border border-white/30 md:col-span-2">
        <h2 className="text-lg font-semibold text-dark-bg mb-4">Bank & Additional Information</h2>
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes & Payment Details
          </label>
          <textarea
            id="notes"
            value={invoiceData.notes}
            onChange={handleInputChange}
            rows="6"
            placeholder="Enter your bank details and any additional notes here"
            className="w-full px-3 py-2 border border-secondary rounded-md resize-none"
          />
          <p className="text-xs text-dark-bg mt-1">
            Tip: Use "Account Name:", "Bank Name:", "Account Number:", "IFSC Code:" prefixes for better formatting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
