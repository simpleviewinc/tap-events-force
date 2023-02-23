import { setSizes } from '@keg-hub/re-theme'

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
  $small: 576,
  $medium: 768,
  $large: 992,
  $xlarge: 1366,
})

export { configureTheme }
