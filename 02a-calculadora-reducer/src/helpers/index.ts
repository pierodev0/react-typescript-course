export function formatCurrency(quantity: number = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(quantity);
}
