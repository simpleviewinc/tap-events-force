import React, { useCallback } from 'react'
import { Text, View } from '@old-keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { selectSession } from 'SVActions/session/selectSession'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { useStylesCallback, useStyle } from '@keg-hub/re-theme'
import { noPropObj, get } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'
import { useFormattedPrice } from 'SVHooks/models/price'
const {
  BOOKING_MODES,
  EVENTS,
  SESSION_BOOKING_STATES,
  BUTTON_TYPES,
  BOOKING_STATES_WITH_ALT_TEXT,
} = Values

/**
 * Helper to build the styles for the booking button
 * @param {Object} theme - Global theme object
 * @param {boolean} disabled - Should the disabled styles be included
 * @param {string} style - Custom styles passed from a parent component
 *
 * @returns {Object} - Joined styles object from different locations
 */
const buildStyles = (theme, _, model, iconName, style) => {
  const { state, disabled } = model
  const styles = theme.get(`button.evfButton`)

  const bookingStyles = styles?.booking || noPropObj
  const disabledStyles = disabled ? styles?.button?.disabled : noPropObj
  const isLongText = SESSION_BOOKING_STATES.ON_WAITING_LIST === state

  return {
    ...bookingStyles,
    content: {
      ...style,
      ...disabledStyles?.content,
      ...(isLongText && bookingStyles?.longText?.text),
    },
    icon: theme.get(
      get(bookingStyles, `icon.${iconName}.default`),
      isLongText && get(bookingStyles, `longText.icon.${iconName}.default`),
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
  const { displayAmount, icon: Icon, text } = model
  const formattedPrice = useFormattedPrice(props.session?.price, false)
  const formattedButtonText = applyPriceAndDisplayRules(
    model.state,
    text,
    formattedPrice
  )
  const bookingStyles = useStylesCallback(buildStyles, [
    model,
    Icon && Icon.name,
    style,
  ])

  return (
    <View
      className={'ef-button-text-main'}
      style={bookingStyles.main}
    >
      { text && (
        <Text
          {...attrs}
          className={`ef-button-text`}
          style={bookingStyles.content}
          children={formattedButtonText}
        />
      ) }
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

/***
 * Display price and button text based on rules provided.
 * i.e. a. If the session has a price and is a SELECT state, the text displayed should change to BUY.
 *      b. If the session does not have a price and is a SELECT state, the text displayed should remain SELECT.
 *      c. If there is no cost, the button should not display any price or alt text like FREE
 *      d. Is a session has a price but is ANY other state (e.g WAITING_LIST) no price should be displayed (Refer ZEN-629)
 */
const applyPriceAndDisplayRules = (state, text, formattedPrice) => {
  const updatedText =
    formattedPrice !== null && state === SESSION_BOOKING_STATES.SELECT
      ? BOOKING_STATES_WITH_ALT_TEXT.BUY
      : text
  const updatedPrice =
    state === SESSION_BOOKING_STATES.SELECT ? formattedPrice : ''
  return updatedText + ' ' + (updatedPrice || '')
}

/**
 * Booking button for each session component
 * @param {Object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Object} styles - Booking button theme styles
 */
export const BookingButton = props => {
  if (!props.session) return null

  const { session, className, ...remaining } = props
  const bookingModel = useBookingState(session)
  const selectSessionCb = useSelectSession(session, bookingModel)
  const pendingStyles = useStyle('button.evfButton.pending')

  return (
    (bookingModel?.text && (
      <EvfButton
        {...remaining}
        buttonType={BUTTON_TYPES.SELECT_SESSION}
        type={bookingModel.state}
        onClick={selectSessionCb}
        disabled={bookingModel.disabled}
        isProcessing={bookingModel.pending}
        pendingStyles={pendingStyles}
        className={className}
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
