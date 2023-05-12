import React from 'react'
import { Text, View } from '@old-keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { Values } from 'SVConstants'
import { useBookSessionCallback } from 'SVHooks/booking/useBookSessionCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import { isBookingModified } from 'SVContexts/booking/utils/isBookingModified'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import PropTypes from 'prop-types'

const { CATEGORIES, BUTTON_TYPES } = Values

/**
 * The root group booking component. Makes use of the GroupBookingContext.
 * @param {Object} props
 * @param {Object?} props.styles
 * @param {import('SVModels/session').Session} props.session - current session
 */
export const GroupBookerBody = ({ styles, session }) => {
  const [valid] = validate({ session }, { session: isObj })
  if (!valid) return null

  const topSectionStyles = styles?.content?.topSection || noOpObj
  const middleSectionStyles = styles?.content?.middleSection || noOpObj

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection styles={topSectionStyles} />

      <GroupBookingOptions
        className={`ef-modal-group-section-middle`}
        styles={middleSectionStyles}
      />
    </View>
  )
}
GroupBookerBody.propTypes = {
  styles: PropTypes.object,
  session: PropTypes.object,
}

/**
 * Top section of the group booker - contains the instruction text and spots remaining
 * @param {object} props
 * @param {object} props.styles
 */
const TopSection = ({ styles }) => {
  const { state } = useGroupBookingContext()

  // use correct wording depending on number of spots remaining
  const placeText = state.bookingCapacity === 1 ? 'place' : 'places'

  const bookingCapacityText = `${state.bookingCapacity} ${placeText} remaining`

  const isFull = state.bookingCapacity <= 0 && state.waitingCapacity <= 0
  const isWaitingListAvailable =
    state.session.capacity.isWaitingListAvailable === true

  const capacityText =
    isWaitingListAvailable && isFull ? 'Waiting list full' : bookingCapacityText

  return (
    <View
      className='ef-modal-group-section-top'
      style={styles?.main}
    >
      <Text
        className='ef-modal-body-header'
        style={styles?.content?.instructionText}
      >
        Select sessions for your group:{ ' ' }
      </Text>
      { state.showCapacity && (
        <Text
          className='ef-modal-body-highlight'
          style={styles?.content?.infoText}
        >
          { capacityText }
        </Text>
      ) }
    </View>
  )
}

/**
 * Footer section of group booker
 * @param {object} props
 * @param {object} props.styles
 * @param {boolean} props.isLoading - if the submit button should show loading spinner
 * @param {Function} props.onCancelPress
 */
export const GroupBookerFooter = ({ styles = noOpObj, onCancelPress }) => {
  const { state } = useGroupBookingContext()
  const { session, current, modified } = state
  const bookSession = useBookSessionCallback(
    session,
    modified.bookingList && current.bookingList,
    modified.waitingList && current.waitingList
  )
  const pendingSession = useStoreItems(CATEGORIES.PENDING_SESSION)
  const submitDisabled = pendingSession?.identifier || !isBookingModified(state)

  return (
    <View
      className={`ef-session-modal-group-section-bottom`}
      style={styles.main}
    >
      <View
        className={'evf-modal-cancel-wrapper'}
        style={styles.content?.cancelButton?.container}
      >
        <EvfButton
          buttonType={BUTTON_TYPES.MODAL_SECONDARY}
          className='ef-cancel-session-button'
          type='default'
          styles={styles.content?.cancelButton}
          text='CANCEL'
          onClick={onCancelPress}
        />
      </View>
      <EvfButton
        buttonType={BUTTON_TYPES.MODAL_PRIMARY}
        className='ef-select-session-button'
        isProcessing={pendingSession?.identifier}
        type='primary'
        styles={styles.content?.bookButton}
        text='BOOK SELECTED'
        disabled={submitDisabled}
        onClick={bookSession}
      />
    </View>
  )
}
