import { Text, View } from 'SVComponents'
import { checkCall } from '@keg-hub/jsutils'
import React, { useCallback, useMemo } from 'react'
import { EvfButton } from 'SVComponents/button/evfButton'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { selectSession } from 'SVActions/session/selectSession'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'
import { useBookingLists } from 'SVHooks/booking/useBookingLists'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { bookingStateFactory } from 'SVUtils/models/sessions/bookingStateFactory'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'

/**
 * Gets the booking button children based on the passed in state
 * @param {import('SVModels/session/bookingState').BookingState} model
 * @param {Object} styles - Booking button child theme styles
 */
const RenderBookingState = props => {
  const { model, style, ...attrs } = props
  const { displayAmount, icon: Icon, text } = model
  const iconProps =
    Icon && Icon.name
      ? Icon.name !== 'Digit'
          ? { style }
          : {
              digit: displayAmount,
              styles: {
                main: {
                  ...style,
                  backgroundColor: style.color || style.backgroundColor,
                },
                text: { color: `#22B3C4`, fontWeight: 'bold' },
              },
            }
      : null

  return (
    <View style={{ flexDirection: 'row' }}>
      { text && (
        <Text
          {...attrs}
          style={style}
        >
          { text }
        </Text>
      ) }
      { iconProps && <Icon {...iconProps} /> }
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
  const { remainingCount } = parseSessionCapacity(session?.capacity)
  const { restrictedIdsForSession } = useRestrictedAttendeeIds(
    session?.identifier
  )
  const { attendees, attendeesByTicket } = useStoreItems([
    'attendees',
    'attendeesByTicket',
  ])

  // Update to pull booking type based on attendees
  const bookingType = attendees.length > 1 ? 'group' : 'single'
  const [ bookingList, waitingList ] = useBookingLists(session, attendees, false)

  const {
    sortedAttendeeCount,
    bookableAttendeeCount,
    initialCapacityExceedsNeed,
  } = useGroupCounts(
    attendeesByTicket,
    restrictedIdsForSession,
    remainingCount,
    session?.capacity?.isUnlimited
  )

  return useMemo(() => {
    return (
      checkCall(bookingStateFactory[state], {
        session,
        bookingType,
        bookingList,
        waitingList,
        sortedAttendeeCount,
        bookableAttendeeCount,
        initialCapacityExceedsNeed,
      }) || null
    )
  }, [
    state,
    session,
    waitingList,
    bookingList,
    bookingType,
    sortedAttendeeCount,
    bookableAttendeeCount,
    initialCapacityExceedsNeed,
  ])
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
        onClick={selectSessionCb}
        disabled={stateModel.disabled}
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
