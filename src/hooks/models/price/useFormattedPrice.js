import { useMemo } from 'react'
import { formatPrice } from 'SVUtils/models/price'

/**
 * @param {import('SVModels/price').Price} price
 * @param {boolean} enableFreeLabel -  whether to display 'FREE' or not on invalid/empty result
 */
export const useFormattedPrice = (price, enableFreeLabel) => {
  return useMemo(() => formatPrice(price, enableFreeLabel), [
    price,
    enableFreeLabel,
  ])
}
