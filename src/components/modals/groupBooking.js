import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import {
  GroupBookerBody,
  GroupBookerFooter,
} from 'SVComponents/booking/groupBooker'
import { GroupBookingProvider } from 'SVContexts/booking/groupBookingProvider'
import { useDismissModal } from 'SVHooks/modal/useDismissModal'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {number} props.modalIndex - index of the modal in the modal stack
 * @param {boolean} props.visible
 */
export const GroupBooking = ({ visible, session, modalIndex }) => {
  if (!session) return null

  const groupBookingStyles = useStyle('modal.groupBooking')

  const [ dismissModal, dismissedCBRef ] = useDismissModal()

  return (
    <GroupBookingProvider session={session}>
      <BaseModal
        className={`ef-modal-group`}
        dismissedCBRef={dismissedCBRef}
        title={session.name}
        index={modalIndex}
        visible={visible}
        Body={
          <GroupBookerBody
            session={session}
            styles={groupBookingStyles?.content?.body}
          />
        }
        Footer={
          <GroupBookerFooter
            onCancelPress={dismissModal}
            styles={groupBookingStyles?.content?.footer}
          />
        }
      />
    </GroupBookingProvider>
  )
}
