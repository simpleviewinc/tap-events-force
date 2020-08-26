import { setSizes } from '@svkeg/re-theme'

// breakpoint screen-widths for various size keys
// used in theme definitions
const sizes = {
  $xsmall: 1,
  $small: 480,
  $medium: 768,
  $large: 1024,
  $xlarge: 1366,
}

/**
 * configures the theme with sizes
 */
export const configureTheme = () => {
  setSizes(sizes)
}
