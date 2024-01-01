export const parseNumberToCurrency = (quantity: number, currency = 'EUR') => {
  return Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(quantity)
}
