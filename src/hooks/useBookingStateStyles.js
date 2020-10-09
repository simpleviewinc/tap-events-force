import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'

/**
 * Custom hook to load the styles for a button based on the current booking state
 * @param {import('SVModels/session').Session} session - used to determine the state
 * @param {object} styles - Custom styles to override the default state styles
 *
 * @returns {object} - Styles object based on the current state of the session
 */
export const useBookingStateStyles = (session, styles) => {
  const theme = useTheme()
  return useMemo(() => {
    const bookingState = getBookingState(session)

    return {
      state: bookingState,
      styles: theme.get(`button.bookingState.${bookingState}`, styles),
    }
  }, [ session, styles, theme ])
}
