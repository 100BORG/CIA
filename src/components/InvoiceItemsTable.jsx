import React, { useState } from 'react';

const InvoiceItemsTable = ({ items, setItems, exchangeRate, currency }) => {
  const [inputValues, setInputValues] = useState({});

  // Add a new empty item to the list
  const addItem = () => {
    setItems([
      ...items,
      {
        name: '',
        description: '',
        amountUSD: 0,
        amountINR: 0
      }
    ]);
  };

  // Remove an item at the specified index
  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    
    // Clean up inputValues for the removed item
    const newInputValues = { ...inputValues };
    delete newInputValues[`${index}-amountUSD`];
    delete newInputValues[`${index}-amountINR`];
    setInputValues(newInputValues);
  };

  // Handle focus on amount input fields
  const handleAmountFocus = (index, field) => {
    const key = `${index}-${field}`;
    setInputValues({
      ...inputValues,
      [key]: items[index][field].toString()
    });
  };

  // Handle blur on amount input fields
  const handleAmountBlur = (index, field) => {
    const key = `${index}-${field}`;
    const value = inputValues[key] || '0';
    handleItemChange(index, field, value);
    
    const newInputValues = { ...inputValues };
    delete newInputValues[key];
    setInputValues(newInputValues);
  };

  // Handle change in amount input fields during typing
  const handleAmountInputChange = (index, field, value) => {
    setInputValues({
      ...inputValues,
      [`${index}-${field}`]: value
    });
  };

  // Handle change of item fields
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    
    if (field === 'name' || field === 'description') {
      updatedItems[index][field] = value;
    } else {
      const numericValue = parseFloat(value) || 0;
      updatedItems[index][field] = numericValue;

      // Calculate the other currency equivalent
      if (field === 'amountUSD') {
        updatedItems[index].amountINR = numericValue * exchangeRate;
      } else if (field === 'amountINR') {
        updatedItems[index].amountUSD = numericValue / exchangeRate;
      }
    }

    setItems(updatedItems);
  };

  // Get the display value for an amount field
  const getAmountDisplayValue = (index, field) => {
    const key = `${index}-${field}`;
    if (key in inputValues) {
      return inputValues[key];
    } else {
      return items[index][field].toFixed(2);
    }
  };

  return (
    <div className="service-items-table">
      <table>
        <thead>
          <tr>
            <th style={{ width: '70%' }}>Description</th>
            <th style={{ width: '15%' }}>Amount (USD)</th>
            <th style={{ width: '15%' }}>Amount (INR)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="item-row">
              <td>
                <div className="description-field">
                  <input
                    type="text"
                    className="item-name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="Service name"
                  />
                  <textarea
                    className="item-description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Service description"
                  ></textarea>
                </div>
              </td>
              <td>
                <input
                  type="text"
                  className="item-total-usd"
                  value={getAmountDisplayValue(index, 'amountUSD')}
                  onChange={(e) => handleAmountInputChange(index, 'amountUSD', e.target.value)}
                  onFocus={() => handleAmountFocus(index, 'amountUSD')}
                  onBlur={() => handleAmountBlur(index, 'amountUSD')}
                  placeholder="Amount (USD)"
                  disabled={currency === 'INR'}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="item-total-inr"
                  value={getAmountDisplayValue(index, 'amountINR')}
                  onChange={(e) => handleAmountInputChange(index, 'amountINR', e.target.value)}
                  onFocus={() => handleAmountFocus(index, 'amountINR')}
                  onBlur={() => handleAmountBlur(index, 'amountINR')}
                  placeholder="Amount (INR)"
                  disabled={currency === 'USD'}
                />
              </td>
              <td>
                <button
                  className="btn-icon"
                  onClick={() => removeItem(index)}
                  title="Remove item"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="table-actions">
        <button onClick={addItem} className="btn btn-secondary add-item-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add Service Item
        </button>
      </div>
    </div>
  );
};

export default InvoiceItemsTable;