import { setSizes } from '@keg-hub/re-theme'
import './dynamicClassMap'

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

export { configureTheme }
