import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { checkCall } from '@keg-hub/jsutils'
import {
  GroupBookerBody,
  GroupBookerFooter,
} from 'SVComponents/booking/groupBooker'
import { GroupBookingProvider } from 'SVContexts/booking/groupBookingProvider'

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
    <GroupBookingProvider session={session}>
      <BaseModal
        className={`ef-modal-group`}
        dismissedCBRef={dismissedCBRef}
        title={session.name}
        visible={visible}
        Body={
          <GroupBookerBody
            session={session}
            styles={groupBookingStyles?.content?.body}
          />
        }
        Footer={
          <GroupBookerFooter
            onCancelPress={useCallback(
              () => checkCall(dismissedCBRef.current, true),
              [dismissedCBRef?.current]
            )}
            styles={groupBookingStyles?.content?.footer}
          />
        }
      />
    </GroupBookingProvider>
  )
}
