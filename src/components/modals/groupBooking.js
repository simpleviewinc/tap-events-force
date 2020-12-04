import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import {
  GroupBookerBody,
  GroupBookerFooter,
} from 'SVComponents/booking/groupBooker'
import { GroupBookingProvider } from 'SVContexts/booking/groupBookingProvider'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} props.visible
 */
export const GroupBooking = ({ visible, session }) => {
  if (!session) return null

  const groupBookingStyles = useStyle('modal.groupBooking')

  return (
    <GroupBookingProvider session={session}>
      <BaseModal
        className={`ef-modal-group`}
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
            onCancelPress={hideActiveModal}
            styles={groupBookingStyles?.content?.footer}
          />
        }
      />
    </GroupBookingProvider>
  )
}
