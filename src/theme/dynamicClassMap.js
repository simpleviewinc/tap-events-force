import { setColors } from './colors'
import { get, checkCall } from '@keg-hub/jsutils'
import { setFonts } from './typography'
import { styleSheetParser } from '@keg-hub/re-theme/styleParser'

/**
 * Cache holder of the parsed ef-classes from the DOM stylesheets
 * @object
 */
let __parsedEfClasses

/**
 * Default empty classList when no events-force classes can be found
 * @object
 */
const defEmptyClassList = { classList: {} }

/**
 * Classes defined by events-force to pull dynamic styles from
 * @array
 */
const efThemeClasses = [
  '.ef-sessions-background',
  '.ef-sessions-button-default',
  '.ef-sessions-button-primary',
  '.ef-sessions-date-selector',
  '.ef-sessions-date-time',
  '.ef-sessions-details-header',
  '.ef-sessions-error',
  '.ef-sessions-filter-button',
  '.ef-sessions-location',
  '.ef-sessions-name',
  '.ef-sessions-presenter',
  '.ef-sessions-price',
  '.ef-sessions-summary',
  '.ef-sessions-text-default',
  '.ef-sessions-ticket-type',
  '.ef-sessions-timeslot-header',
  '.ef-sessions-warning',
  '.ef-presenter-picture',
  '.ef-modal-body',
  '.ef-modal-body-header',
  '.ef-modal-body-highlight',
  '.ef-modal-header',
  '.ef-modal-sub-header',
  '.ef-modal-title',
]

/**
 * Checks for backgroundColor; then background, then uses the fallback if neither exists
 * @function
 * @param {Object} obj - Object to search for the background color value
 * @param {string} classPath - Path on the object where the value should exist
 * @param {string} fallback - Value to use if backgroundColor and background don't exist
 *
 * @return {string} Found value || fallback
 */
const getBackgroundColor = (obj, classPath, fallback) => {
  return get(
    obj,
    `${classPath}.backgroundColor`,
    get(obj, `${classPath}.background`, fallback)
  )
}

/**
 * Extracts the color data from the parsed stylesheet object and sets it to the theme
 * @function
 * @param {Object} parsed - Parsed stylesheet object
 *
 * @return {void}
 */
const setupColors = parsed => {
  // Build the colors object
  const colors = {
    default: get(parsed.classList, `ef-sessions-text-default.color`),
    color1: getBackgroundColor(parsed.classList, `ef-sessions-button-default`),
    color2: getBackgroundColor(parsed.classList, `ef-sessions-details-header`),
    color3: getBackgroundColor(parsed.classList, `ef-sessions-timeslot-header`),
    color4: getBackgroundColor(parsed.classList, `ef-sessions-button-primary`),
  }

  // Set the colors object, so when the theme gets imported, it has these available
  setColors({
    ...colors,
    // Right now we have primary default to color4's value
    // So rather then break anything, just mapping color 4 to primary
    // And mapping color1 to forth
    primary: colors.color4,
    // Should be secondary, tertiary, quaternary, but that's way too difficult on a number of levels
    second: colors.color2,
    third: colors.color3,
    forth: colors.color1,
  })
}

/**
 * Extracts the font data from the parsed stylesheet object and sets it to the theme
 * @function
 * @param {Object} parsed - Parsed stylesheet object
 *
 * @return {void}
 */
const setupFonts = parsed => {
  const headings = get(parsed.classList, `ef-sessions-name.fontFamily`, '')

  setFonts(
    {
      headings,
      default: get(
        parsed.classList,
        `ef-sessions-text-default.fontFamily`,
        headings
      ),
    },
    true
  )
}

/**
 * Passed as the callback for found matching classes
 * Converts the class styles into a JS object so it can be added to the theme
 * @function
 *
 * @return {Object} - Stylesheet styles from a matching class as an object
 */
const classFormatter = (cssRule, rootSelector, formatted, cssToJs) => {
  const selectorRef = rootSelector.substring(1)
  const cssText = cssRule.cssText

  formatted.classList = formatted.classList || {}
  formatted.classList[selectorRef] = checkCall(
    cssToJs,
    cssText,
    formatted.classList[selectorRef]
  )

  return formatted
}

/**
 * Calls styleSheetParser to parse data-classes for the predefined ef-classes
 * @function
 *
 * @return {Object} parsed - Parsed stylesheet object
 */
export const parseCustomClasses = () => {
  __parsedEfClasses =
    __parsedEfClasses ||
    styleSheetParser({
      format: 'json',
      toDom: false,
      callback: classFormatter,
      // Class list provided by Events Force
      // Need to sync with them to map the Comps to the classes
      // Which will them allow us to apply them to the correct elements
      classNames: efThemeClasses,
    })

  if (!__parsedEfClasses || !__parsedEfClasses.classList)
    return defEmptyClassList

  setupColors(__parsedEfClasses)
  setupFonts(__parsedEfClasses)

  return __parsedEfClasses
}

/**
 * Automatically make call to parse the stylesheets on the dom
 */
parseCustomClasses()

/**
 * Gets the cached Ef Class data or calls function to parse the Stylesheets
 * @function
 *
 * @returns {Object} __parsedEfClasses - Parsed styleSheet classes ad a JS Object
 */
export const getParsedClasses = () => parseCustomClasses()
