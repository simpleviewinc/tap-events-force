import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { exists, noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSessionBooking } from 'SVHooks/booking/useSessionBooking'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'
import { useInitGroupBooking } from 'SVHooks/booking/useInitGroupBooking'
import { useKegEvent } from 'SVHooks/events/useKegEvent'
import { Values } from 'SVConstants'
import PropTypes from 'prop-types'

const { CATEGORIES, EVENTS } = Values

/**
 * Waits for the current session to transition from a pending state
 * to a non-pending state, at which point it will close the group booker
 * @param {Function} cancelCB - prop-passed cancel function for groupBooker
 */
const useAutoCancel = (sessionId, cancelCB) => {
  useKegEvent(EVENTS.SESSION_PENDING_UPDATE, ({ current, next }) => {
    // if the currently pending session is not this one, don't do anything
    if (current?.identifier !== sessionId) return

    // otherwise, check for a pending state change for this session to not-pending
    current.identifier !== next.identifier && cancelCB?.()
  })
}

/**
 * Provides groupBooker with access to state relevant to the submit button,
 * such as if the session is pending or not.
 * @param {string} sessionId - id of session for group booker
 * @return {Array} [
 *  sessionIsPending - true if the booking/session button is in a pending/loading state
 *  bookingButtonIsEnabled - true if the booking button is enabled and selectable
 *  sessionIsModified - true if the user has selected at least one attendee for booking/waitlist
 * ]
 */
const useButtonState = sessionId => {
  const { pendingSession, modifiedSession } = useStoreItems([
    CATEGORIES.ATTENDEES,
    CATEGORIES.PENDING_SESSION,
    CATEGORIES.MODIFIED_SESSION,
  ])

  const pending = pendingSession?.identifier
  const sessionIsModified = modifiedSession?.identifier === sessionId
  const bookingButtonIsEnabled = !pending && sessionIsModified

  // return the submit function and the current loading state
  return [ pending, bookingButtonIsEnabled, sessionIsModified ]
}

/**
 * The root group booking component. Initializes state specific to
 * the active group booking context for the passed-in session, and
 * renders the group booking UI given the session and the store state
 * @param {Object} props
 * @param {Object?} props.styles
 * @param {import('SVModels/session').Session} props.session - current session
 * @param {Function?} props.onCancelPress - callback function fired when group booker is closed
 */
export const GroupBooker = ({ styles, session, onCancelPress }) => {
  const [valid] = validate({ session }, { session: isObj })
  if (!valid) return null

  const topSectionStyles = styles?.content?.topSection || noOpObj
  const middleSectionStyles = styles?.content?.middleSection || noOpObj
  const bottomSectionStyles = styles?.content?.bottomSection || noOpObj

  const { attendees, attendeesByTicket } = useStoreItems([
    CATEGORIES.ATTENDEES,
    CATEGORIES.ATTENDEES_BY_TICKET,
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

  // initialize the store data for the group booking
  const initialized = useInitGroupBooking(
    session,
    attendees,
    initialCapacityExceedsNeed,
    remainingCount
  )

  // gets callbacks and data related to the group booking for this session
  const { updateCapacity, bookSession, currentCapacity } = useSessionBooking(
    session
  )

  // if the initial capacity exceeds the number of bookable attendees, no need to show the remaining places in the top section
  const visibleCapacityCount = initialCapacityExceedsNeed
    ? null
    : currentCapacity

  const [ isSubmitLoading, submitIsEnabled, sessionIsModified ] = useButtonState(
    session.identifier
  )

  useAutoCancel(session?.identifier, onCancelPress)

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection
        styles={topSectionStyles}
        remainingCount={visibleCapacityCount}
        showRequireSymbol={!sessionIsModified}
      />
      { initialized && (
        <GroupBookingOptions
          className={`ef-modal-group-section-middle`}
          styles={middleSectionStyles}
          attendeesByTicket={attendeesByTicket}
          onAttendeeSelected={updateCapacity}
          disabled={isSubmitLoading}
        />
      ) }
      <BottomSection
        session={session}
        onCancelPress={onCancelPress}
        onSubmitPress={bookSession}
        isLoading={isSubmitLoading}
        styles={bottomSectionStyles}
        submitDisabled={!submitIsEnabled}
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
 * @param {boolean} props.showRequireSymbol - if true, shows a red asterisk next to the instruction text,
 * indicating the user needs to make a booking change in order to press submit.
 */
const TopSection = ({ styles, remainingCount, showRequireSymbol = true }) => {
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
        Select sessions for your group:{ ' ' }
        { showRequireSymbol && (
          <Text style={styles?.content?.instructionAsterisk}>*</Text>
        ) }
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
 * @param {boolean} props.isLoading - if the submit button should show loading spinner
 * @param {Function} props.onCancelPress
 * @param {Function} props.onSubmitPress
 * @param {boolean} props.submitDisabled - if the submit button should be disabled
 */
const BottomSection = ({
  styles,
  onCancelPress,
  onSubmitPress,
  isLoading = false,
  submitDisabled = false,
}) => {
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
        isProcessing={isLoading}
        type={'primary'}
        styles={styles.content?.bookButton}
        text={'BOOK SELECTED'}
        onClick={onSubmitPress}
        disabled={submitDisabled}
      />
    </View>
  )
}
