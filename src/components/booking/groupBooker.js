import React, { useState, useEffect, useCallback } from 'react'
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
import { Values } from 'SVConstants'
import PropTypes from 'prop-types'

const { CATEGORIES } = Values

/**
 * Handles the submit button loading state.
 * When onSubmit is called, it sets the `groupBooking.loading`
 * value to true, activating any loading UI. When the
 * props rerender with attendees changed, it stops the spinner
 * and calls `onComplete`.
 *
 * @param {Function?} onSubmit
 * @param {Function?} onComplete
 */
const useButtonSubmit = (sessionId, onSubmit, onComplete) => {
  const submit = useCallback(
    (...args) => {
      // if there is no cb to call, then immediately run the onComplete step
      if (!onSubmit) return onComplete?.()
      onSubmit(...args)
    },
    [onSubmit]
  )

  const { attendees, pendingSession, modifiedSession } = useStoreItems([
    CATEGORIES.ATTENDEES,
    CATEGORIES.PENDING_SESSION,
    CATEGORIES.MODIFIED_SESSION,
  ])

  const sessionIsModified = modifiedSession?.identifier === sessionId
  const sessionIsPending = pendingSession?.identifier === sessionId
  const bookingButtonIsEnabled =
    !pendingSession?.identifier && sessionIsModified

  const [ isFirstRender, setIsFirstRender ] = useState(true)
  useEffect(() => {
    isFirstRender && setIsFirstRender(false)
    // if we are here, the list of attendees has changed,
    // indicating the consumer rerendered the app with
    // new attendees (since we do not modify it except at startup).
    // We assume this indicates that the group booking task completed,
    // so we can dismiss the modal
    !isFirstRender && onComplete?.()
  }, [attendees])

  // return the submit function and the current loading state
  return [ submit, sessionIsPending, bookingButtonIsEnabled ]
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

  const [ onBookingSubmit, isSubmitLoading, submitIsEnabled ] = useButtonSubmit(
    session.identifier,
    bookSession,
    onCancelPress
  )

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
          disabled={isSubmitLoading}
        />
      ) }
      <BottomSection
        session={session}
        onCancelPress={onCancelPress}
        onSubmitPress={onBookingSubmit}
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
 * @param {boolean} props.isLoading - if the submit button should show loading spinner
 * @param {Function} props.onCancelPress
 * @param {Function} props.onSubmitPress
 * @param {boolean} props.submitDisabled - if the submit button should be disabled
 */
const BottomSection = ({
  styles,
  onCancelPress,
  session,
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
