// Invoice item management
function addNewItem() {
  const tbody = document.getElementById('itemsTableBody');
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

  usdInput.addEventListener('input', updateCalculations);
  inrInput.addEventListener('input', updateCalculations);

  const addNestedRowButton = newRow.querySelector('.add-nested-row');
  addNestedRowButton.addEventListener('click', function (e) {
    e.preventDefault();
    addNestedRow(newRow);
  });

  updateCalculations();
}

function removeItem(button) {
  const tbody = document.getElementById('itemsTableBody');
  const row = button.closest('tr');

  if (tbody.rows.length > 1) {
    row.remove();
    updateCalculations();
  }
}

function addNestedRow(itemRow) {
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

  lastNestedRow.parentNode.insertBefore(newRow, lastNestedRow.nextSibling);

  const usdInput = newRow.querySelector('.item-total-usd');
  const inrInput = newRow.querySelector('.item-total-inr');

  usdInput.addEventListener('input', updateCalculations);
  inrInput.addEventListener('input', updateCalculations);

  updateCalculations();
}
