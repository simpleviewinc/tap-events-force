import React, { useRef, useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { get, checkCall, exists } from '@keg-hub/jsutils'
import { sessionBookingRequest } from 'SVActions'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'

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
 * @param {*} remainingCount
 * @param {*} session
 */
const useSessionBooking = (remainingCount, session) => {
  // stored as a ref, b/c nothing needs to rerender if it changes. It just later gets submitted to consumer of Sessions when user books
  const attendeeIdsRef = useRef(new Set())

  const [ currentCapacity, setCapacity ] = useState(remainingCount)

  const updateCapacity = useCallback(
    ({ id }) => {
      const isUnlimited = session?.capacity?.isUnlimited
      if (attendeeIdsRef.current.has(id)) {
        const deleted = attendeeIdsRef.current.delete(id)
        deleted && !isUnlimited && setCapacity(currentCapacity + 1)
      }
      else {
        const added = attendeeIdsRef.current.add(id)
        added && !isUnlimited && setCapacity(currentCapacity - 1)
      }
    },
    [ attendeeIdsRef, currentCapacity, setCapacity, session ]
  )

  const bookSession = useCallback(
    () =>
      sessionBookingRequest(
        session.identifier,
        Array.from(attendeeIdsRef.current)
      ),
    [ session.identifier, attendeeIdsRef ]
  )

  return { updateCapacity, bookSession, currentCapacity }
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

  // get the remaining spots for the session
  const isUnlimited = get(session, 'capacity.isUnlimited')
  const remainingCount = !isUnlimited
    ? get(session, 'capacity.remainingPlaces')
    : null

  const { updateCapacity, bookSession, currentCapacity } = useSessionBooking(
    remainingCount,
    session
  )

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection
        styles={topSectionStyles}
        remainingCount={currentCapacity}
      />
      <GroupBookingOptions
        className={`ef-modal-group-section-middle`}
        session={session}
        styles={middleSectionStyles}
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
