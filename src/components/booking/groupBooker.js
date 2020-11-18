import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { exists, noOpObj, validate, isObj } from '@keg-hub/jsutils'
import { GroupBookingOptions } from 'SVComponents/booking/groupBookingOptions'
import { useBookSessionCallback } from 'SVHooks/booking/useBookSessionCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import PropTypes from 'prop-types'

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
  // use correct wording depending on number of spots remaining
  const { state } = useGroupBookingContext()
  const placeText = state.capacity === 1 ? 'place' : 'places'
  const showCount =
    state.showCapacity && exists(state.capacity) && state.capacity !== Infinity
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
          { `${state.capacity} ${placeText} remaining` }
        </Text>
      ) }
    </View>
  )
}

/**
 * Footer section of group booker
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onCancelPress
 */
export const GroupBookerFooter = ({ styles = noOpObj, onCancelPress }) => {
  const { state } = useGroupBookingContext()
  const bookSession = useBookSessionCallback(
    state.session,
    state.current.bookingList,
    state.current.waitingList
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
        type={'primary'}
        styles={styles.content?.bookButton}
        text={'BOOK SELECTED'}
        onClick={bookSession}
      />
    </View>
  )
}
