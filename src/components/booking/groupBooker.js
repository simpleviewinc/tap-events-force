import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useKegEvent } from 'SVHooks/events/useKegEvent'
import { Values } from 'SVConstants'
import { useBookSessionCallback } from 'SVHooks/booking/useBookSessionCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
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
 * The root group booking component. Makes use of the GroupBookingContext.
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
        showRequireSymbol={!sessionIsModified}
      />

      <GroupBookingOptions
        className={`ef-modal-group-section-middle`}
        styles={middleSectionStyles}
        disabled={isSubmitLoading}
      />

      <BottomSection
        session={session}
        onCancelPress={onCancelPress}
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
 */
const TopSection = ({ styles }) => {
  // use correct wording depending on number of spots remaining
  const { state } = useGroupBookingContext()
  const placeText = state.capacity === 1 ? 'place' : 'places'
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
      { state.showCapacity && (
        <Text
          className={`ef-modal-body-highlight`}
          style={styles?.content?.infoText}
        >
          { `${state.capacity} ${placeText} remaining` }
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
 * @param {boolean} props.submitDisabled - if the submit button should be disabled
 */
const BottomSection = ({
  styles,
  onCancelPress,
  isLoading = false,
  submitDisabled = false,
}) => {
  const {
    state: { session, current, modified },
  } = useGroupBookingContext()
  const bookSession = useBookSessionCallback(
    session,
    modified.bookingList && current.bookingList,
    modified.waitingList && current.waitingList
  )
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
        disabled={submitDisabled}
        onClick={bookSession}
      />
    </View>
  )
}
