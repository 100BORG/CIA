import React, { forwardRef } from 'react';

const InvoicePreview = forwardRef(({ invoiceData, formatDate, onClose }, ref) => {
  // Helper for formatting currency values
  const formatCurrency = (value, currency = '$') => {
    return `${currency}${parseFloat(value).toFixed(2)}`;
  };
  
  return (
    <div 
      ref={ref}
      className="invoice-preview bg-white p-8 shadow-lg max-w-4xl mx-auto print:shadow-none"
    >
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {invoiceData.companyLogo && (
            <img 
              src={invoiceData.companyLogo} 
              alt="Company Logo" 
              className="h-16 mb-4 object-contain"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800">{invoiceData.senderName}</p>
          <p className="text-gray-600">{invoiceData.senderAddress}</p>
          <p className="text-gray-600">{invoiceData.senderEmail}</p>
          <p className="text-gray-600">{invoiceData.senderPhone}</p>
          <p className="text-gray-600">{invoiceData.senderGSTIN}</p>
        </div>
      </div>
      
      {/* Client Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-gray-600 font-semibold mb-1">Bill To:</h3>
          <p className="font-bold">{invoiceData.recipientName}</p>
          <p>{invoiceData.recipientAddress}</p>
          <p>{invoiceData.recipientPhone}</p>
          <p>{invoiceData.recipientEmail}</p>
          <p>{invoiceData.recipientGSTIN}</p>
          <p>{invoiceData.recipientPAN}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Invoice Date:</span>
            <span className="ml-2">{formatDate(invoiceData.invoiceDate)}</span>
          </div>
          {invoiceData.dueDate && (
            <div className="mb-2">
              <span className="text-gray-600 font-semibold">Due Date:</span>
              <span className="ml-2">{formatDate(invoiceData.dueDate)}</span>
            </div>
          )}
          <div>
            <span className="text-gray-600 font-semibold">Currency:</span>
            <span className="ml-2">{invoiceData.currency}</span>
          </div>
        </div>
      </div>
      
      {/* Invoice Items */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2 text-right">USD</th>
              <th className="px-4 py-2 text-right">INR</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr 
                key={item.id}
                className={`border-t border-gray-200 ${item.isNested ? 'pl-8 bg-gray-50' : ''}`}
              >
                <td className={`px-4 py-2 ${item.isNested ? 'pl-8' : ''}`}>
                  {item.name}
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 text-right">{formatCurrency(item.amountUSD)}</td>
                <td className="px-4 py-2 text-right">₹{formatCurrency(item.amountINR, '')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-4 py-2" colSpan="2"><b>Subtotal</b></td>
              <td className="px-4 py-2 text-right">{formatCurrency(invoiceData.subtotalUSD)}</td>
              <td className="px-4 py-2 text-right">₹{formatCurrency(invoiceData.subtotalINR, '')}</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-4 py-2" colSpan="2"><b>Tax ({invoiceData.taxRate}%)</b></td>
              <td className="px-4 py-2 text-right">{formatCurrency(invoiceData.taxAmountUSD)}</td>
              <td className="px-4 py-2 text-right">₹{formatCurrency(invoiceData.taxAmountINR, '')}</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-100 font-bold">
              <td className="px-4 py-2" colSpan="2"><b>Total</b></td>
              <td className="px-4 py-2 text-right">{formatCurrency(invoiceData.totalUSD)}</td>
              <td className="px-4 py-2 text-right">₹{formatCurrency(invoiceData.totalINR, '')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="border-t border-secondary pt-4 mb-8">
        <h3 className="font-semibold mb-2">Note</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: invoiceData.notes
              .replace(/Account Name:/g, '<b>Account Name:</b>')
              .replace(/Bank Name:/g, '<b>Bank Name:</b>')
              .replace(/Account Number:/g, '<b>Account Number:</b>')
              .replace(/IFSC Code:/g, '<b>IFSC Code:</b>')
              .replace(/\n/g, '<br />')
          }}
        />
      </div>
      
      <div className="text-center text-sm italic mt-8">
        <p>Thank you for your business!</p>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white"
          style={{ display: 'print-none' }}
        >
          ×
        </button>
      )}
    </div>
  );
});

// Add display name to avoid React warnings with forwardRef
InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
