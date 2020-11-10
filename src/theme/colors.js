import { mapObj } from '@keg-hub/jsutils'

/**
 * Holds the default colors. Can be overwritten by setColor method
 * @object
 */
const colors = {
  primary: '#22B3C4',
  second: '#525859',
  black: '#000000',
  black01: '#0A0A0A',
  white: '#FFFFFF',
  white01: '#F3F3F3',
  white02: '#F0F0F0',
  gray: '#909090',
  lightGray: '#A0A0A0',
  lightGray01: '#8f908f',
  lightGray02: '#F0F0F0',
  dimTextGray: '#D9DCDC',
  darkGray: '#4F4F4F',
  darkGray02: '#727272',
  transparent: 'rgba(255,255,255,0)',
}

/**
 * Updates the default colors object with the passed in updated object
 * @function
 * @param {Object} updated - Color object to be merged with the default colors object
 *
 * @return {Object} Updated colors object
 */
const setColors = updated => {
  // override the colors object with values from updated,
  // unless updated values are undefined
  mapObj(colors, (key, value) => {
    colors[key] = updated[key] || value
  })
  return colors
}

export { colors, setColors }
