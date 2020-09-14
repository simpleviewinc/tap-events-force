import React, { useRef, useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { checkCall } from '@keg-hub/jsutils'
import { sessionBookingRequest } from 'SVActions'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Array.<import('SVModels/attendee').Attendee>} props.attendees
 * @param {boolean} props.visible
 */
export const GroupBooking = ({ visible, session, attendees }) => {
  if (!session || !attendees) return null

  const theme = useTheme()

  const groupBookingStyles = theme.get('modal.groupBooking')
  const { capacity } = session
  const dismissedCBRef = useRef()

  // get the remaining spots for the session
  const remainingCount = capacity.isUnlimited ? null : capacity.remainingPlaces

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
        remainingCount={remainingCount}
        attendees={attendees}
      />
    </BaseModal>
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session
 * @param {Array<Attendee>} props.attendees - attendees
 * @param {Session} props.session - current session
 * @param {Function} props.dismissModalCb - callback function to dismiss modal
 */
const Body = ({
  styles,
  session,
  attendees,
  remainingCount,
  dismissModalCb,
}) => {
  const topSectionStyles = styles?.content?.topSection || {}
  const middleSectionStyles = styles?.content?.middleSection || {}
  const bottomSectionStyles = styles?.content?.bottomSection || {}

  // stored as a ref, b/c nothing needs to rerender if it changes. It just later gets submitted to consumer of Sessions when user books
  const attendeeIdsRef = useRef(new Set())

  const [ capacity, setCapacity ] = useState(remainingCount)

  const onAttendeeSelected = useCallback(
    ({ id }) => {
      if (attendeeIdsRef.current.has(id)) {
        const deleted = attendeeIdsRef.current.delete(id)
        deleted && setCapacity(capacity + 1)
      }
      else {
        const added = attendeeIdsRef.current.add(id)
        added && setCapacity(capacity - 1)
      }
    },
    [ attendeeIdsRef, capacity, setCapacity ]
  )

  const bookSession = useCallback(
    () =>
      sessionBookingRequest(
        session.identifier,
        Array.from(attendeeIdsRef.current)
      ),
    [ session.identifier, attendeeIdsRef ]
  )

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection
        styles={topSectionStyles}
        remainingCount={capacity}
      />
      <MiddleSection
        session={session}
        styles={middleSectionStyles}
        attendees={attendees}
        canBookMore={capacity > 0}
        onAttendeeSelected={onAttendeeSelected}
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
 * @param {number} props.remainingCount - spots left in this session
 */
const TopSection = ({ styles, remainingCount }) => {
  // use correct syntax based on how many spot is left
  const placeText = remainingCount && remainingCount > 1 ? 'places' : 'place'

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
      { remainingCount && (
        <Text
          className={`ef-modal-body-highlight`}
          style={styles?.content?.infoText}
        >
          { `${remainingCount} ${placeText} remaining` }
        </Text>
      ) }
    </View>
  )
}

const MiddleSection = ({
  styles,
  session,
  attendees,
  onAttendeeSelected,
  canBookMore,
}) => {
  return (
    <GroupBookingOptions
      className={`ef-modal-group-section-middle`}
      session={session}
      styles={styles}
      attendees={attendees}
      onAttendeeSelected={onAttendeeSelected}
      enableCheck={canBookMore}
    />
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
