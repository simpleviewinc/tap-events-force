import React, { useCallback } from 'react'
import { EvfButton } from 'SVComponents/button/evfButton'
import { selectSession } from 'SVActions/session/selectSession'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { useStyle } from '@keg-hub/re-theme'
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
  const formattedPrice = useFormattedPrice(props.session?.price, false)
  const formattedButtonText = applyPriceAndDisplayRules(
    bookingModel.state,
    bookingModel.text,
    formattedPrice
  )

  return (
    (bookingModel?.text && (
      <EvfButton
        {...remaining}
        buttonType={BUTTON_TYPES.SELECT_SESSION}
        sessionBookingState={bookingModel.state}
        bookedCount={bookingModel.bookedCount}
        bookingMode={bookingModel.mode}
        type={bookingModel.state}
        onClick={selectSessionCb}
        disabled={bookingModel.disabled}
        isProcessing={bookingModel.pending}
        pendingStyles={pendingStyles}
        text={formattedButtonText}
        className={className}
        session={session}
      ></EvfButton>
    )) ||
    null
  )
}
