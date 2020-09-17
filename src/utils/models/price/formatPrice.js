/**
 * Turns the price object to a formatted string
 * @param {import('SVModels/price').Price} price
 * @returns {string}
 */
export const formatPrice = price => {
  // only supporting en-US locale for now
  // don't show decimal places
  return price?.amount > 0 && price?.currency
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price?.currency,
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(price?.amount)
    : null
}
