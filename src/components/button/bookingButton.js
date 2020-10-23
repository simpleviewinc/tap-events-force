import { Text, View } from 'SVComponents'
import React, { useCallback } from 'react'
import { EvfButton } from 'SVComponents/button/evfButton'
import { selectSession } from 'SVActions/session/selectSession'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { useStylesCallback } from '@keg-hub/re-theme'
import { noPropObj, get } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'
const { BOOKING_MODES, EVENTS, SESSION_BOOKING_STATES } = Values

/**
 * Helper to build the styles for the booking button
 * @param {Object} theme - Global theme object
 * @param {boolean} disabled - Should the disabled styles be included
 * @param {string} state - Current booking state
 * @param {string} style - Custom styles passed from a parent component
 *
 * @returns {Object} - Joined styles object from different locations
 */
const buildStyles = (theme, _, disabled, state, iconName, style) => {
  const stateStyles = theme?.button?.evfButton[state] || noPropObj
  const bookingStyles = stateStyles?.content?.bookingState || noPropObj
  const disabledStyles = disabled
    ? stateStyles?.content?.button?.disabled
    : noPropObj

  return {
    ...bookingStyles,
    text: {
      ...style,
      ...bookingStyles.text,
      ...disabledStyles.content,
    },
    icon: theme.get(
      get(bookingStyles, `icon.${iconName}.default`),
      disabled && get(bookingStyles, `icon.${iconName}.disabled`)
    ),
  }
}

/**
 * Renders the booking button children based on the passed in booking state
 * @param {import('SVModels/session/bookingState').BookingState} model
 * @param {Object} style - Style rules for the children passed from the parent button
 * @param {Object} styles - Booking button child theme styles
 */
const RenderBookingState = props => {
  const { model, style, styles, ...attrs } = props
  const { displayAmount, icon: Icon, text, state } = model
  const bookingStyles = useStylesCallback(buildStyles, [
    model.disabled,
    state,
    Icon && Icon.name,
    style,
    styles,
  ])

  return (
    <View style={bookingStyles.main}>
      { text && <Text
        {...attrs}
        style={bookingStyles.text}
        children={text}
      /> }
      { Icon && <Icon
        digit={displayAmount}
        styles={bookingStyles.icon}
      /> }
    </View>
  )
}

/**
 * Custom hook to check if an attendee should be removed from the session
 * <br/>Then calls the selectSession action
 * @param {import('SVModels/session').Session} session
 * @param {import('SVModels/session/bookingState').BookingState} model
 *
 * @returns {Void}
 */
const useSelectSession = (session, model) => {
  return useCallback(
    event => {
      // Check if the mode is single, and the attendee is on the waiting list or already booked
      // If they are, we want to pass the selectSession action an empty array to remove the attendee from the session
      const removeAttendee = Boolean(
        model.mode === BOOKING_MODES.SINGLE &&
          (model.state === SESSION_BOOKING_STATES.ON_WAITING_LIST ||
            model.state === SESSION_BOOKING_STATES.SELECTED)
      )

      // Check if the state is on waiting list, so we know which action to call
      const actionType =
        model.state === SESSION_BOOKING_STATES.ON_WAITING_LIST ||
        model.state === SESSION_BOOKING_STATES.WAITING_LIST
          ? EVENTS.SESSION_WAITING_LIST_REQUEST
          : EVENTS.SESSION_BOOKING_REQUEST

      selectSession(session, removeAttendee ? [] : undefined, actionType)
    },
    [ session, model ]
  )
}

/**
 * Booking button for each session component
 * @param {Object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Object} styles - Booking button theme styles
 */
export const BookingButton = props => {
  if (!props.session) return null

  const { session } = props
  const bookingModel = useBookingState(session)
  const selectSessionCb = useSelectSession(session, bookingModel)

  return (
    (bookingModel?.text && (
      <EvfButton
        type={bookingModel.state}
        onClick={selectSessionCb}
        disabled={bookingModel.disabled}
      >
        { buttonProps => (
          <RenderBookingState
            {...props}
            {...buttonProps}
            model={bookingModel}
          />
        ) }
      </EvfButton>
    )) ||
    null
  )
}
