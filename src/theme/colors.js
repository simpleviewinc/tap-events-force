/**
 * Holds the default colors. Can be overwritten by setColor method
 * @object
 */
const colors = {
  primary: '#22B3C4',
  default: '#525859',
  black: '#000000',
  black01: '#0A0A0A',
  white: '#FFFFFF',
  white01: '#F3F3F3',
  white02: '#F0F0F0',
  lightGray: '#A0A0A0',
  lightGray01: '#8f908f',
  darkGray: '#4F4F4F',
  transparent: 'transparent',
}

/**
 * Updates the default colors object with the passed in updated object
 * @function
 * @param {Object} updated - Color object to be merged with the default colors object
 *
 * @return {Object} Updated colors object
 */
const setColors = updated => {
  Object.assign(colors, updated)
  return colors
}

export { colors, setColors }
