import React, { useEffect } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import {
  GroupBookerBody,
  GroupBookerFooter,
} from 'SVComponents/booking/groupBooker'
import { GroupBookingProvider } from 'SVContexts/booking/groupBookingProvider'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'

/**
 * Wrapper around BaseModal that hooks into the booking context
 * to ensure its state is up to date whenever the group booking
 * modal is opened.
 *
 * @param {Object} props - BaseModal props
 */
const RefreshedModal = props => {
  const { actions } = useGroupBookingContext()
  useEffect(() => {
    props.visible && actions?.reset()
  }, [props.visible])

  return <BaseModal {...props} />
}

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
      <RefreshedModal
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
        pageViewNameForGa={'Sessions Group Booking Modal'}
      />
    </GroupBookingProvider>
  )
}
