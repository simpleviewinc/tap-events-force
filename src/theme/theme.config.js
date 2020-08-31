import { setSizes } from '@keg-hub/re-theme'
import { styleSheetParser } from '@keg-hub/re-theme/styleParser'

// Test styles, to ensure the styleSheetParser is working properly
import '../mocks/eventsforce/testStyles.css'

export const evfDataClasses = styleSheetParser({
  format: 'json',
  toDom: false,
  classNames: [
    '.ef-sessions-text-default',
    '.ef-sessions-name',
    '.ef-sessions-details-header',
    '.ef-sessions-summary',
    '.ef-sessions-date-time',
    '.ef-sessions-location',
    '.ef-sessions-presenter',
    '.ef-sessions-location',
    '.ef-sessions-timeslot-header',
    '.ef-sessions-button-default',
    '.ef-sessions-button-primary',
    '.ef-sessions-ticket-type',
    '.ef-sessions-warning',
    '.ef-sessions-error',
  ],
})

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
