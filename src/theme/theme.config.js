import { setSizes } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { styleSheetParser } from '@keg-hub/re-theme/styleParser'
import { setColors } from './colors'
import { setFonts } from './typography'

// Test styles, to ensure the styleSheetParser is working properly
// They will be removed once we get some real style sheets from Events Force
import '../mocks/eventsforce/testStyles.css'

/**
 * Cache holder of the parsed ef-classes from the DOM stylesheets
 * @object
 */
let __parsedEfDataClasses

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
    default: get(parsed.dataClass, `ef-sessions-text-default.color`, 'inherit'),
    color1: getBackgroundColor(
      parsed.dataClass,
      `ef-sessions-button-default`,
      'inherit'
    ),
    color2: getBackgroundColor(
      parsed.dataClass,
      `ef-sessions-details-header`,
      'inherit'
    ),
    color3: getBackgroundColor(
      parsed.dataClass,
      `ef-sessions-timeslot-header`,
      'inherit'
    ),
    color4: getBackgroundColor(
      parsed.dataClass,
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
    parsed.dataClass,
    `ef-sessions-name.fontFamily`,
    'inherit'
  )

  setFonts(
    {
      headings,
      default: get(
        parsed.dataClass,
        `ef-sessions-text-default.fontFamily`,
        headings
      ),
    },
    true
  )
}

/**
 * Calls styleSheetParser to parse data-classes for the predefined ef-classes
 * @function
 *
 * @return {Object} parsed - Parsed stylesheet object
 */
const parseDataClasses = () => {
  __parsedEfDataClasses =
    __parsedEfDataClasses ||
    styleSheetParser({
      format: 'json',
      toDom: false,
      // Class list provided by Events Force
      // Need to sync with them to map the Comps to the classes
      // Which will them allow us to apply them to the correct elements
      classNames: [
        '.ef-session-background',
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
        '.ef-modal-body',
        '.ef-modal-body-header',
        '.ef-modal-body-highlight',
        '.ef-modal-header',
        '.ef-modeal-sub-header',
        '.ef-modal-title ',
      ],
    })

  setupColors(__parsedEfDataClasses)
  setupFonts(__parsedEfDataClasses)

  return __parsedEfDataClasses
}

/**
 * Automatically make call to parse the stylesheets on the dom
 */
parseDataClasses()

/**
 * Configures the theme with sizes
 * @function
 */
const configureTheme = sizes => setSizes(sizes)

/**
 * Sets the breakpoint screen-widths for various size keys
 * used in theme definitions
 */
configureTheme({
  $xsmall: 1,
  $small: 480,
  $medium: 768,
  $large: 1024,
  $xlarge: 1366,
})

export { configureTheme, __parsedEfDataClasses as evfDataClasses }
