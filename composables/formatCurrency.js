export function useCurrencyFormatter(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KSh' }).format(value)
}