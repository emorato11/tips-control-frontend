export const parseNumberToCurrency = (quantity: number, currency = 'EUR') => {
  return Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency
  }).format(quantity)
}
