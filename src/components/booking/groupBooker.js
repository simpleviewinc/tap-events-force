import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { Values } from 'SVConstants'
import { useBookSessionCallback } from 'SVHooks/booking/useBookSessionCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import { isBookingModified } from 'SVContexts/booking/utils/isBookingModified'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import PropTypes from 'prop-types'

const { CATEGORIES } = Values

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

      <BottomSection
        session={session}
        onCancelPress={onCancelPress}
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
 */
const TopSection = ({ styles }) => {
  // use correct wording depending on number of spots remaining
  const { state } = useGroupBookingContext()
  const showRequireSymbol = !isBookingModified(state)
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
 */
const BottomSection = ({ styles, onCancelPress }) => {
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
        isProcessing={pendingSession?.identifier}
        type={'primary'}
        styles={styles.content?.bookButton}
        text={'BOOK SELECTED'}
        disabled={submitDisabled}
        onClick={bookSession}
      />
    </View>
  )
}
