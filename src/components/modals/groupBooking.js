import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button'
import { checkCall } from '@keg-hub/jsutils'
import { sessionBookingRequest } from 'SVActions'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Array.<import('SVModels/attendee').Attendee>} props.attendees
 * @param {boolean} props.visible
 */
export const GroupBooking = ({ visible, session, attendees }) => {
  if (!session || !attendees) return

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
        styles={groupBookingStyles.content.body}
        remainingCount={remainingCount}
      />
    </BaseModal>
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session
 * @param {Function} props.dismissModalCb - callback function to dismiss modal
 */
const Body = ({ styles, remainingCount, dismissModalCb }) => {
  const topSectionStyles = styles?.content?.topSection || {}
  const middleSectionStyles = styles?.content?.middleSection || {}
  const bottomSectionStyles = styles?.content?.bottomSection || {}

  return (
    <View
      className={`ef-modal-group-body`}
      style={styles.main}
    >
      <TopSection
        styles={topSectionStyles}
        remainingCount={remainingCount}
      />
      <MiddleSection styles={middleSectionStyles} />
      <BottomSection
        onCancelPress={dismissModalCb}
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

const MiddleSection = ({ styles }) => {
  // TODO
  return (
    <View
      className={`ef-modal-group-section-middle`}
      style={styles.main}
    ></View>
  )
}

/**
 * Bottom section of group booking modal
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onCancelPress
 */
const BottomSection = ({ styles, onCancelPress }) => {
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
        onClick={sessionBookingRequest}
      />
    </View>
  )
}
