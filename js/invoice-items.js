// Invoice item management
function addNewItem() {
  const tbody = document.getElementById('itemsTableBody');
  if (!tbody) return;
  const newRow = document.createElement('tr');
  newRow.classList.add('item-row');

  newRow.innerHTML = `
    <td rowspan="1">
      <input type="text" placeholder="Item name" class="item-name" />
      <button class="btn btn-secondary add-nested-row">Add Description</button>
    </td>
    <td>
      <textarea placeholder="Item description" class="item-description"></textarea>
    </td>
    <td>
      <input type="number" value="0.00" step="0.01" min="0" class="item-total-usd" placeholder="Amount (USD)" />
    </td>
    <td>
      <input type="number" value="0.00" step="0.01" min="0" class="item-total-inr" placeholder="Amount (INR)" />
    </td>
    <td>
      <button class="btn-icon delete remove-item">×</button>
    </td>
  `;

  tbody.appendChild(newRow);

  const usdInput = newRow.querySelector('.item-total-usd');
  const inrInput = newRow.querySelector('.item-total-inr');

  if (usdInput) usdInput.addEventListener('input', updateCalculations);
  if (inrInput) inrInput.addEventListener('input', updateCalculations);

  updateCalculations();
}

function removeItem(button) {
  const tbody = document.getElementById('itemsTableBody');
  if (!tbody) return;
  
  const row = button.closest('tr');
  if (!row) return;

  // Only remove if more than one item-row remains
  const itemRows = tbody.querySelectorAll('.item-row');
  if (itemRows.length > 1 || row.classList.contains('nested-row')) {
    row.remove();
    updateCalculations();
  }
}

function addNestedRow(itemRow) {
  if (!itemRow) return;
  
  const newRow = document.createElement('tr');
  newRow.classList.add('nested-row');

  newRow.innerHTML = `
    <td></td>
    <td>
      <textarea placeholder="Additional description" class="item-description"></textarea>
    </td>
    <td>
      <input type="number" value="0.00" step="0.01" min="0" class="item-total-usd" placeholder="Amount (USD)" />
    </td>
    <td>
      <input type="number" value="0.00" step="0.01" min="0" class="item-total-inr" placeholder="Amount (INR)" />
    </td>
    <td>
      <button class="btn-icon delete remove-item">×</button>
    </td>
  `;

  let lastNestedRow = itemRow;
  while (lastNestedRow.nextElementSibling && lastNestedRow.nextElementSibling.classList.contains('nested-row')) {
    lastNestedRow = lastNestedRow.nextElementSibling;
  }

  if (lastNestedRow.parentNode) {
    lastNestedRow.parentNode.insertBefore(newRow, lastNestedRow.nextSibling);
  
    const usdInput = newRow.querySelector('.item-total-usd');
    const inrInput = newRow.querySelector('.item-total-inr');

    if (usdInput) usdInput.addEventListener('input', updateCalculations);
    if (inrInput) inrInput.addEventListener('input', updateCalculations);

    updateCalculations();
  }
}
