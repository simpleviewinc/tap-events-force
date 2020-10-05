import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { checkCall } from '@keg-hub/jsutils'
import { GroupBooker } from 'SVComponents/booking/groupBooker'

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
      dismissedCBRef={dismissedCBRef}
      styles={groupBookingStyles}
      hasCloseButton={false}
      title={session.name}
      visible={visible}
    >
      <GroupBooker
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
