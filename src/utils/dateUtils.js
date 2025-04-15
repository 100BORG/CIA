// Format date for display (DD/MM/YYYY)
export function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Format date for input fields (YYYY-MM-DD)
export function formatDateForInput(date) {
  return date.toISOString().split('T')[0];
}
