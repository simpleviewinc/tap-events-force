/****************** IMPORTANT ******************/ /*
 * This is a work in progress
 * It's NOT complete or expected to be working
 * This will be removed once it's complete
/****************** IMPORTANT ******************/

import { setColors } from './colors'
import { get } from '@keg-hub/jsutils'
import { setFonts } from './typography'
import { styleSheetParser } from '@keg-hub/re-theme/styleParser'

// Test styles, to ensure the styleSheetParser is working properly
// They will be removed once we get some real style sheets from Events Force
import '../mocks/eventsforce/testStyles.css'

/**
 * Cache holder of the parsed ef-classes from the DOM stylesheets
 * @object
 */
let __parsedEfClasses

const efThemeClasses = [
  '.ef-sessions-background',
  '.ef-button-default',
  '.ef-button-primary',
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
    default: get(parsed.classList, `ef-sessions-text-default.color`, 'inherit'),
    color1: getBackgroundColor(
      parsed.classList,
      `ef-sessions-button-default`,
      'inherit'
    ),
    color2: getBackgroundColor(
      parsed.classList,
      `ef-sessions-details-header`,
      'inherit'
    ),
    color3: getBackgroundColor(
      parsed.classList,
      `ef-sessions-timeslot-header`,
      'inherit'
    ),
    color4: getBackgroundColor(
      parsed.classList,
      `ef-sessions-button-primary`,
      'inherit'
    ),
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
  const headings = get(
    parsed.classList,
    `ef-sessions-name.fontFamily`,
    'inherit'
  )

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

const classFormatter = (cssRule, rootSelector, formatted, cssToJs) => {
  const selectorRef = rootSelector.substring(1)
  const cssText = cssRule.cssText

  formatted.classList = formatted.classList || {}
  formatted.classList[selectorRef] = cssToJs(
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
const parseCustomClasses = () => {
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

  setupColors(__parsedEfClasses)
  setupFonts(__parsedEfClasses)

  return __parsedEfClasses
}

/**
 * Automatically make call to parse the stylesheets on the dom
 */
parseCustomClasses()

export const getParsedClasses = () => parseCustomClasses()
