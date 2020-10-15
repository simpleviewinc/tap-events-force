import React, { useCallback, useMemo } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { selectSession } from 'SVActions/session/selectSession'
import { EvfButton } from 'SVComponents/button/evfButton'
import { Text, View } from 'SVComponents'
import { bookingStateFactory } from 'SVUtils/models/sessions/bookingStateFactory'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { useTheme } from '@keg-hub/re-theme'
/**
 * Gets the booking button children based on the passed in state
 * @param {import('SVModels/session/bookingState').BookingState} model
 * @param {Object} styles - Booking button child theme styles
 */
const RenderBookingState = ({ model, styles, ...props }) => {
  // const { styles:modelStyles } = model

  return (
    <View
      className={`evf-booking-button-content`}
      style={styles.wrapper}
    >
      <Text style={styles?.content}>{ model.text }</Text>
    </View>
  )
}

/**
 * Custom hook to get the children and styles of the booking button
 * <br/>Base on the session and it's current state
 * @param {Object} props
 * @param {Object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
const useBookingState = session => {
  const state = getBookingState(session)
  const theme = useTheme()
  return useMemo(() => {
    return (
      checkCall(bookingStateFactory[state], session, 'single', theme, false) ||
      null
    )
  }, [ state, session, theme ])
}

/**
 * Booking button for each session component
 * @param {Object} props
 * @param {Object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = props => {
  if (!props.session) return null

  const { session } = props
  const selectSessionCb = useCallback(() => selectSession(session), [session])
  const stateModel = useBookingState(session)

  return (
    (stateModel?.text && (
      <EvfButton
        type={stateModel.state}
        styles={stateModel.styles}
        onClick={selectSessionCb}
      >
        { props => <RenderBookingState
          {...props}
          model={stateModel}
        /> }
      </EvfButton>
    )) ||
    null
  )
}
