/**
 * Turns the price object to a formatted string
 * @param {import('SVModels/price').Price} price
 * @param {boolean} displayFree - whether to display 'FREE' or not on invalid/empty result
 * @returns {string}
 */
export const formatPrice = (price, displayFree = false) => {
  // for the case:
  // - if some session items do have price. the one's that do not, need to have 'free' label
  const defaultLabel = displayFree ? 'FREE' : null

  try {
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
      : defaultLabel
  }
  catch (error) {
    console.warn(error)
    return defaultLabel
  }
}
