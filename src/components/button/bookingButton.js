import React, { useCallback } from 'react'
import { selectSession } from 'SVActions/session/selectSession'
import { EvfButton } from 'SVComponents/button/evfButton'
import { useBookingStateStyles } from 'SVHooks/useBookingStateStyles'

/**
 * Booking button for each session component
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = ({ styles, session }) => {
  if (!session) return null

  const bookingStyles = useBookingStateStyles(session, styles)

  const selectSessionCb = useCallback(() => selectSession(session), [session])
  // we want to show the SELECT btn if:
  // - waiting list is available
  // - remainingPlaces > 0
  return (
    <EvfButton
      type={'primary'}
      styles={bookingStyles}
      onClick={selectSessionCb}
      text={'SELECT'}
    />
  )
}
