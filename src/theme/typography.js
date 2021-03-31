import { deepMerge } from '@keg-hub/jsutils'
import { colors } from './colors'

/**
 * Holds the default fonts. Can be overwritten by setFonts method
 * @object
 */
const fonts = {
  headings: 'Inter-Regular',
  default: 'Inter-Regular',
}

/**
 * Gets the default font from the fonts object
 * @function
 *
 * @return {string} Default font name
 */
export const getFontDefault = () => fonts.default

/**
 * Cache for the typography styles
 * @object
 */
export let typography = {}

/**
 * Updates the default fonts object with the passed in updated object
 * <br/>Then rebuilds the typography styles with the updated fonts
 * @function
 * @param {Object} updated - Fonts object to be merged with the default fonts object
 *
 * @return {Object} Updated typography object
 */
export const setFonts = (updated = {}, rebuild) => {
  Object.assign(fonts, updated)
  rebuild && buildTypography(rebuild)

  return typography
}

/**
 * Builds the typography styles based on the current fonts object
 * @function
 * @param {Object} overrides - Values to override the current typography styles
 *
 * @return {Object} Updated typography object
 */
export const buildTypography = (overrides = {}) => {
  typography = deepMerge(
    {
      font: {
        family: {
          $native: {},
          $web: {
            fontFamily: fonts.default,
          },
        },
      },
      headings: {
        fontFamily: fonts.headings,
      },
      default: {
        color: colors.black,
        fontFamily: fonts.default,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 22,
      },
    },
    overrides
  )

  return typography
}

buildTypography()
