import React from 'react';

function InvoiceItems({ 
  items, 
  onAddItem, 
  onAddNestedItem, 
  onRemoveItem, 
  onItemChange,
  subtotal,
  taxRate,
  taxAmount,
  total
}) {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Invoice Items</h2>
        <button className="btn btn-secondary" onClick={onAddItem}>Add Item</button>
      </div>
      
      <table className="table" id="itemsTable">
        <thead>
          <tr>
            <th width="20%">Item Name</th>
            <th width="40%">Item Description</th>
            <th width="20%">Amount (USD)</th>
            <th width="20%">Amount (INR)</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr 
              key={item.id} 
              className={item.isNested ? "nested-row" : "item-row"}
              style={item.isNested ? { paddingLeft: '20px' } : {}}
            >
              <td>
                {!item.isNested && (
                  <input
                    type="text"
                    placeholder="Item name"
                    className="item-name"
                    value={item.name}
                    onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                  />
                )}
                {!item.isNested && (
                  <button 
                    className="btn btn-secondary add-nested-row"
                    onClick={() => onAddNestedItem(item.id)}
                    style={{ marginTop: '5px', fontSize: '0.75rem' }}
                  >
                    Add Description
                  </button>
                )}
              </td>
              <td>
                <textarea
                  placeholder="Item description"
                  className="item-description"
                  value={item.description}
                  onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={parseFloat(item.amountUSD).toFixed(2)}
                  step="0.01"
                  min="0"
                  className="item-total-usd"
                  placeholder="Amount (USD)"
                  onChange={(e) => onItemChange(item.id, 'amountUSD', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={parseFloat(item.amountINR).toFixed(2)}
                  step="0.01"
                  min="0"
                  className="item-total-inr"
                  placeholder="Amount (INR)"
                  onChange={(e) => onItemChange(item.id, 'amountINR', e.target.value)}
                />
              </td>
              <td>
                <button 
                  className="btn-icon delete remove-item"
                  onClick={() => onRemoveItem(item.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="totals">
        <div className="total-row">
          <span className="total-label">Subtotal:</span>
          <span className="total-value">${subtotal}</span>
        </div>
        <div className="total-row">
          <span className="total-label">Tax (<span>{taxRate}</span>%):</span>
          <span className="total-value">${taxAmount}</span>
        </div>
        <div className="total-row grand-total">
          <span className="total-label">Total:</span>
          <span className="total-value">${total}</span>
        </div>
      </div>
    </>
  );
}

export default InvoiceItems;
