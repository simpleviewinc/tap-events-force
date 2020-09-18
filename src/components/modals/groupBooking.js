import React, { useRef, useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { get, checkCall, exists } from '@keg-hub/jsutils'
import { sessionBookingRequest } from 'SVActions'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSortedAttendees } from 'SVHooks/models/useSortedAttendees'

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
 * Returns callbacks for working with session capacity and latest capacity
 * @param {number?} initialCapacity
 * @param {*} session
 */
const useSessionBooking = (initialCapacity, session, initialAttendeeIds) => {
  // current remaining capacity of session, which updates as the user selects and unselects attendees for booking
  const [ currentCapacity, setCapacity ] = useState(initialCapacity ?? Infinity)

  // A set of attendee ids for attendees to be booked to the session.
  const attendeeIdsRef = useRef(new Set(initialAttendeeIds || undefined))

  const isUnlimited = session?.capacity?.isUnlimited

  // updates the currentCapacity, as well as the attendeeIdsRef set
  const updateCapacity = useCallback(
    ({ id }) => {
      if (attendeeIdsRef.current.has(id)) {
        const deleted = attendeeIdsRef.current.delete(id)
        deleted && !isUnlimited && setCapacity(currentCapacity + 1)
      }
      else {
        const added = attendeeIdsRef.current.add(id)
        added && !isUnlimited && setCapacity(currentCapacity - 1)
      }
    },
    [ attendeeIdsRef, currentCapacity, setCapacity, isUnlimited ]
  )

  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  const bookSession = useCallback(
    () =>
      sessionBookingRequest(
        session.identifier,
        Array.from(attendeeIdsRef.current)
      ),
    [ session.identifier, attendeeIdsRef ]
  )

  const isAttendeeSelected = useCallback(id => attendeeIdsRef.current.has(id), [
    attendeeIdsRef.current,
  ])

  return { updateCapacity, bookSession, isAttendeeSelected, currentCapacity }
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

  const isBookable = useCallback(id => !restrictedAttendeeIds.has(id), [
    restrictedAttendeeIds,
  ])

  // get the remaining spots for the session
  const isUnlimited = get(session, 'capacity.isUnlimited')
  const remainingCount = !isUnlimited
    ? get(session, 'capacity.remainingPlaces')
    : Infinity

  // number of attendees that are eligible to book this session
  const bookableAttendeeCount = sortedAttendeeCount - restrictedAttendeeIds.size

  // only show the capacity of the session if the number of attendees exceeds the capacity
  const initialCapacityExceedsNeed = remainingCount > bookableAttendeeCount

  // if there is more capacity than bookable attendees, then we want to initially select all bookable attendees
  const initiallyCheckedAttendeeIds =
    initialCapacityExceedsNeed &&
    attendees
      .map(att => att.bookedTicketIdentifier)
      .filter(id => !restrictedAttendeeIds.has(id))

  const {
    updateCapacity,
    bookSession,
    isAttendeeSelected,
    currentCapacity,
  } = useSessionBooking(remainingCount, session, initiallyCheckedAttendeeIds)

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
      <GroupBookingOptions
        className={`ef-modal-group-section-middle`}
        styles={middleSectionStyles}
        tickets={tickets}
        attendeesByTicket={attendeesByTicket}
        isBookable={isBookable}
        isAttendeeSelected={isAttendeeSelected}
        canBookMore={isUnlimited || currentCapacity > 0}
        onAttendeeSelected={updateCapacity}
      />
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
