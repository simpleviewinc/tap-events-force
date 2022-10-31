import React, { useContext } from 'react'
import { BaseModal } from './baseModal'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

/**
 * SessionDetailsModal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} props.visible
 */
export const SessionDetailsModal = ({ session, visible }) => {
  if (!session) return null

  const { SessionDetailsModalContents } = useContext(ComponentsContext)

  return (
    <BaseModal
      className='ef-modal-group ef-sessions-modal'
      hasCloseButton={true}
      visible={visible}
      Body={
        <>
          <BookingButton
            session={session}
            className='ef-session-details-booking-button'
          />
          <SessionDetailsModalContents sessionID={session.identifier} />
        </>
      }
    />
  )
}
