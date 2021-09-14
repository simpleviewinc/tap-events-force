import React, { useMemo } from 'react'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { View, Text } from '@keg-hub/keg-components'
import { Values } from 'SVConstants/values'
import { EVFIcons } from 'SVIcons'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { SESSION_BOOKING_STATES } = Values
const { BookingCheck } = EVFIcons

/**
 * Returns session state
 * Memoized function has been added based on attendees because the session object itself does not change when selected.
 * Since the session state only gets updated when bookings are modified we can't use that as a memo dependency
 * @param {import('SVModels/session').Session} props.session - the session model object
 */
const useSessionState = session => {
  const attendees = useStoreItems('attendees')
  return useMemo(() => getBookingState(session), [ session, attendees ])
}

const StateLabelText = reStyle(Text)((theme, props) => ({
  fontSize: 12,
  fontWeight: 500,
  color: props.disabledText ? theme.colors.black : theme.colors.primary,
  fontWeight: props.boldText ? 800 : 500,
}))

const StateLabelView = reStyle(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
}))

const StateLabelCheck = reStyle(
  BookingCheck,
  'styles'
)(theme => ({
  fill: theme.colors.primary,
  maxHeight: 18,
  overflow: 'visible',
}))

/**
 * The state label containing state and bookingcheck icon if applicable
 * @param {Object} props
 * @param {import('SVModels/session').Session} props.session - the session model object
 */
export const StateLabel = props => {
  if (!props.session) return null

  const { session } = props
  const sessionState = useSessionState(session)
  const labelToDisplay =
    sessionState === SESSION_BOOKING_STATES.SELECT ||
    sessionState === SESSION_BOOKING_STATES.READ_ONLY
      ? ''
      : sessionState
  const selected = sessionState === SESSION_BOOKING_STATES.SELECTED
  const fullyBooked = sessionState === SESSION_BOOKING_STATES.FULLY_BOOKED

  return (
    <StateLabelView>
      { /* TODO : Add state label class when received from trans-atlantic team */ }
      <StateLabelText
        boldText={selected}
        disabledText={fullyBooked}
      >
        { labelToDisplay.toUpperCase() }
      </StateLabelText>
      { selected && <StateLabelCheck /> }
    </StateLabelView>
  )
}
