import React, { useCallback } from 'react'
import { get } from '@keg-hub/jsutils'
import { selectSession } from 'SVActions/session/selectSession'
import { EVFIcons } from 'SVIcons'
import { EvfButton } from 'SVComponents/button/evfButton'
import { Text, View } from 'SVComponents'
import { useBookingStateStyles } from 'SVHooks/useBookingStateStyles'
import { useThemeState } from 'SVHooks/useThemeState'
import { Values } from 'SVConstants'

const { CheckMark } = EVFIcons
const {
  AVAILABLE,
  SELECTED,
  WAITING_LIST,
  ON_WAITING_LIST,
  FULLY_BOOKED,
  READ_ONLY,
} = Values.SESSION_BOOKING_STATES

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

const renderChildren = (session, states) => {
  return props => {
    const { styles } = props

    const { state, styles: bookingStyles } = useBookingStateStyles(
      session,
      get(styles, `content.button`)
    )
    console.log(bookingStyles)
    const buttonChildren = getButtonChildren(session, state, styles)

    return buttonChildren
  }
}

/**
 * Booking button for each session component
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = props => {
  const { styles, session } = props

  if (!session) return null

  const selectSessionCb = useCallback(() => selectSession(session), [session])
  const { ref, ...states } = useThemeState()

  return (
    <EvfButton
      type={'primary'}
      styles={styles}
      onClick={selectSessionCb}
      buttonRef={ref}
    >
      { renderChildren(session, states) }
    </EvfButton>
  )
}
