import { getSizeMap } from '@svkeg/re-theme'

/**
 * Returns the width associated with the size key
 * @param {String} size - a size key for re-theme themes (e.g. $small)
 */
export const widthOf = size => {
  const map = getSizeMap()
  if (!map || !map.hash) return console.error('Size map hash unavailable:', map)
  return map.hash[size]
}
