import React, { useCallback } from 'react'
import { selectSession } from 'SVActions/session/selectSession'
import { EVFIcons } from 'SVIcons'
import { EvfButton } from 'SVComponents/button/evfButton'
import { Text, View } from 'SVComponents'
import { useBookingStateStyles } from 'SVHooks/useBookingStateStyles'
import { Values } from 'SVConstants'
const {
  SESSION_BOOKING_STATES: {
    AVAILABLE,
    SELECTED,
    WAITING_LIST,
    ON_WAITING_LIST,
    FULLY_BOOKED,
    READ_ONLY,
  },
} = Values
const { CheckMark } = EVFIcons

const getButtonChildren = (session, state, styles) => {
  switch (state) {
  case SELECTED: {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles?.content}>SELECTED</Text>
        <CheckMark style={styles?.content} />
      </View>
    )
  }
  case ON_WAITING_LIST: {
    return (
      <>
        <Text style={styles?.content}>ON WAITING LIST</Text>
      </>
    )
  }
  case WAITING_LIST: {
    return (
      <>
        <Text style={styles?.content}>WAITING LIST</Text>
      </>
    )
  }
  case FULLY_BOOKED: {
  }
  case READ_ONLY: {
    return 'SELECT'
  }
  case AVAILABLE:
  default: {
    return 'SELECT'
  }
  }
}

/**
 * Booking button for each session component
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = ({ styles, session }) => {
  if (!session) return null

  const { state, styles: bookingStyles } = useBookingStateStyles(
    session,
    styles
  )

  const buttonChildren = getButtonChildren(session, state, bookingStyles)

  const selectSessionCb = useCallback(() => selectSession(session), [session])

  return (
    <EvfButton
      type={'primary'}
      styles={bookingStyles}
      onClick={selectSessionCb}
      text={buttonChildren}
    />
  )
}
