import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { get, checkCall, exists } from '@keg-hub/jsutils'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSortedAttendees } from 'SVHooks/models/useSortedAttendees'
import { useSessionBooking } from 'SVHooks/booking/useSessionBooking'
import {
  setWaitingList,
  setBookingList,
  setSessionCapacity as setCapacity,
  setCurrentSessionId,
} from 'SVActions/session/booking'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Array.<import('SVModels/attendee').Attendee>} props.attendees
 * @param {boolean} props.visible
 */
export const GroupBooking = ({ visible, session }) => {
  if (!session) return null

  const theme = useTheme()

  const groupBookingStyles = theme.get('modal.groupBooking')
  const dismissedCBRef = useRef()

  return (
    <BaseModal
      className={`ef-modal-group`}
      dissmissedCBRef={dismissedCBRef}
      styles={groupBookingStyles}
      hasCloseButton={false}
      title={session.name}
      visible={visible}
    >
      <Body
        dismissModalCb={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
        session={session}
        styles={groupBookingStyles.content.body}
      />
    </BaseModal>
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session
 * @param {Session} props.session - current session
 * @param {Function} props.dismissModalCb - callback function to dismiss modal
 */
const Body = ({ styles, session, dismissModalCb }) => {
  const topSectionStyles = styles?.content?.topSection || {}
  const middleSectionStyles = styles?.content?.middleSection || {}
  const bottomSectionStyles = styles?.content?.bottomSection || {}

  const { attendees, tickets, bookedTickets } = useStoreItems([
    'attendees',
    'tickets',
    'bookedTickets',
  ])

  // get two data structures for attendees: a map organizing attendees by ticket, and a set of
  // attendee ids that are restricted from booking the session
  const {
    attendeesByTicket,
    restrictedAttendeeIds,
    sortedAttendeeCount,
  } = useSortedAttendees(session, attendees, tickets, bookedTickets)

  // useEffect(() => {
  //   const sortedAttendeeData = buildSortedAttendees(session, attendees, tickets, bookedTickets)

  // }, [ session, attendees, tickets ,bookedTickets ])

  const isBookable = useCallback(id => !restrictedAttendeeIds.has(id), [
    restrictedAttendeeIds,
  ])

  // TODO: extract this into a separate function
  // get the remaining spots for the session
  const waitingListIsAvailable = get(session, 'capacity.isWaitingListAvailable')
  const isUnlimited = get(session, 'capacity.isUnlimited')
  const remainingCount = !isUnlimited
    ? get(session, 'capacity.remainingPlaces')
    : Infinity

  // TODO: consider these into one fn
  // number of attendees that are eligible to book this session
  const bookableAttendeeCount = sortedAttendeeCount - restrictedAttendeeIds.size

  // only show the capacity of the session if the number of attendees exceeds the capacity
  const initialCapacityExceedsNeed = remainingCount > bookableAttendeeCount

  // TODO: memoize this work, and use `reduce` so that we can do this in one pass
  const initialWaitIds =
    waitingListIsAvailable &&
    attendees
      .filter(attendee =>
        attendee.waitingListSessions?.includes(session?.identifier)
      )
      .map(attendee => attendee.bookedTicketIdentifier)
      .filter(isBookable)

  // TODO: memoize this work, and use `reduce` so that we can do this in one pass
  // if there is more capacity than bookable attendees, and nobody is already waiting, then we want to initially select all bookable attendees.
  // Otherwise, only pre-select attendees who have the session in their bookedSessions array
  const initialBookedIds = attendees
    .filter(
      attendee =>
        (initialCapacityExceedsNeed && !initialWaitIds?.length) ||
        attendee.bookedSessions?.includes(session?.identifier)
    )
    .map(attendee => attendee.bookedTicketIdentifier)
    .filter(id => isBookable(id) && !initialWaitIds.includes(id))

  // initialize the store state for group booking
  const [ initialized, setInitialized ] = useState(false)
  useEffect(() => {
    setCapacity(remainingCount)
    setBookingList(initialBookedIds)
    setWaitingList(initialWaitIds)
    setCurrentSessionId(session?.identifier)
    setInitialized(true)
  }, [session])

  const { updateCapacity, bookSession, currentCapacity } = useSessionBooking(
    session
  )
  // if the initial capacity exceeds the number of bookable attendees, no need to show the remaining places in the top section
  const visibleCapacityCount = initialCapacityExceedsNeed
    ? null
    : currentCapacity

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection
        styles={topSectionStyles}
        remainingCount={visibleCapacityCount}
      />
      { initialized && (
        <GroupBookingOptions
          className={`ef-modal-group-section-middle`}
          styles={middleSectionStyles}
          attendeesByTicket={attendeesByTicket}
          isBookable={isBookable}
          onAttendeeSelected={updateCapacity}
        />
      ) }
      <BottomSection
        onCancelPress={dismissModalCb}
        onSubmitPress={bookSession}
        styles={bottomSectionStyles}
      />
    </View>
  )
}

/**
 * TopSection - contains the instruction text and spots remaining
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session. If null, there is no limit
 */
const TopSection = ({ styles, remainingCount }) => {
  // use correct syntax based on how many spot is left
  const placeText = remainingCount === 1 ? 'place' : 'places'

  return (
    <View
      className={`ef-modal-group-section-top`}
      style={styles?.main}
    >
      <Text
        className={`ef-modal-body-header`}
        style={styles?.content?.instructionText}
      >
        Select sessions for your group:
      </Text>
      { exists(remainingCount) && (
        <Text 
          className={`ef-modal-body-highlight`}
          style={styles?.content?.infoText}>
          { `${remainingCount} ${placeText} remaining` }
        </Text>
      ) }
    </View>
  )
}

/**
 * Bottom section of group booking modal
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onCancelPress
 * @param {Function} props.onSubmitPress
 */
const BottomSection = ({ styles, onCancelPress, onSubmitPress }) => {
  return (
    <View
      className={`ef-modal-group-section-bottom`}
      style={styles.main}
    >
      <EvfButton
        type={'default'}
        styles={styles.content?.cancelButton}
        text={'CANCEL'}
        onClick={onCancelPress}
      />
      <EvfButton
        type={'primary'}
        styles={styles.content?.bookButton}
        text={'BOOK SELECTED'}
        onClick={onSubmitPress}
      />
    </View>
  )
}
