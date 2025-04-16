// Currency conversion and calculations
function updateCalculations() {
  let subtotalUSD = 0;
  let subtotalINR = 0;
  const usdToInrRate = 82;
  const rows = document.querySelectorAll('#itemsTableBody .item-row, #itemsTableBody .nested-row');

  rows.forEach((row) => {
    const usdInput = row.querySelector('.item-total-usd');
    const inrInput = row.querySelector('.item-total-inr');

    let usdAmount = parseFloat(usdInput?.value) || 0;
    let inrAmount = parseFloat(inrInput?.value) || 0;

    if (document.activeElement === usdInput) {
      inrAmount = usdAmount * usdToInrRate;
      if (inrInput) inrInput.value = inrAmount.toFixed(2);
    } else if (document.activeElement === inrInput) {
      usdAmount = inrAmount / usdToInrRate;
      if (usdInput) usdInput.value = usdAmount.toFixed(2);
    }

    subtotalUSD += usdAmount;
    subtotalINR += inrAmount;
  });

  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const taxAmountUSD = subtotalUSD * (taxRate / 100);
  const taxAmountINR = subtotalINR * (taxRate / 100);

  const totalUSD = subtotalUSD + taxAmountUSD;
  const totalINR = subtotalINR + taxAmountINR;

  document.getElementById('subtotal').textContent = `$${subtotalUSD.toFixed(2)}`;
  document.getElementById('taxRateDisplay').textContent = taxRate;
  document.getElementById('tax').textContent = `$${taxAmountUSD.toFixed(2)}`;
  document.getElementById('total').textContent = `$${totalUSD.toFixed(2)}`;

  document.getElementById('previewSubtotal').textContent = `$${subtotalUSD.toFixed(2)}`;
  document.getElementById('previewTaxRate').textContent = taxRate;
  document.getElementById('previewTax').textContent = `$${taxAmountUSD.toFixed(2)}`;
  document.getElementById('previewTotalUSD').textContent = `$${totalUSD.toFixed(2)}`;
  document.getElementById('previewTotalINR').textContent = `₹${totalINR.toFixed(2)}`;
}
