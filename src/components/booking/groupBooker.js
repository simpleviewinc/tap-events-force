import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { exists, noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSessionBooking } from 'SVHooks/booking/useSessionBooking'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'
import { useInitGroupBooking } from 'SVHooks/booking/useInitGroupBooking'
import PropTypes from 'prop-types'

/**
 * The root group booking component. Initializes state specific to
 * the active group booking context for the passed-in session, and
 * renders the group booking UI given the session and the store state
 * @param {Object} props
 * @param {Object?} props.styles
 * @param {import('SVModels/session').Session} props.session - current session
 * @param {Function?} props.onCancelPress - callback function when cancel button is pressed
 */
export const GroupBooker = ({ styles, session, onCancelPress }) => {
  const [valid] = validate({ session }, { session: isObj })
  if (!valid) return null

  const topSectionStyles = styles?.content?.topSection || noOpObj
  const middleSectionStyles = styles?.content?.middleSection || noOpObj
  const bottomSectionStyles = styles?.content?.bottomSection || noOpObj

  const { attendees, attendeesByTicket } = useStoreItems([
    'attendees',
    'attendeesByTicket',
  ])

  const { restrictedIdsForSession } = useRestrictedAttendeeIds(
    session?.identifier
  )

  // determine the remaining count of
  const { remainingCount } = parseSessionCapacity(session?.capacity)

  // determine if the capacity of the session is greater than the number
  // of attendees who can be booked
  const { initialCapacityExceedsNeed } = useGroupCounts(
    attendeesByTicket,
    restrictedIdsForSession,
    remainingCount,
    session?.capacity?.isUnlimited
  )

  // gets callbacks and data related to the group booking for this session
  const { updateCapacity, bookSession, currentCapacity } = useSessionBooking(
    session
  )

  // initialize the store data for the group booking
  const initialized = useInitGroupBooking(
    session,
    attendees,
    initialCapacityExceedsNeed,
    remainingCount
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
          onAttendeeSelected={updateCapacity}
        />
      ) }
      <BottomSection
        onCancelPress={onCancelPress}
        onSubmitPress={bookSession}
        styles={bottomSectionStyles}
      />
    </View>
  )
}
GroupBooker.propTypes = {
  styles: PropTypes.object,
  session: PropTypes.object,
  onCancelPress: PropTypes.func,
}

/**
 * Top section of the group booker - contains the instruction text and spots remaining
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session. If null, there is no limit
 */
const TopSection = ({ styles, remainingCount }) => {
  // use correct wording depending on number of spots remaining
  const placeText = remainingCount === 1 ? 'place' : 'places'

  const showCount = exists(remainingCount) && remainingCount !== Infinity

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
      { showCount && (
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

/**
 * Bottom section of group booker
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
        className='ef-cancel-session-button'
        type={'default'}
        styles={styles.content?.cancelButton}
        text={'CANCEL'}
        onClick={onCancelPress}
      />
      <EvfButton
        className='ef-select-session-button'
        type={'primary'}
        styles={styles.content?.bookButton}
        text={'BOOK SELECTED'}
        onClick={onSubmitPress}
      />
    </View>
  )
}