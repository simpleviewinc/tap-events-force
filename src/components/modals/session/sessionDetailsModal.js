import React from 'react'
import { BaseModal } from '../baseModal'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { SessionDetails } from './sessionDetails'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const ModalBody = reStyle(SessionDetails)({ minH: 250, h: '100%' })

/**
 * SessionDetailsModal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} props.visible
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
export const SessionDetailsModal = ({ session, visible }) => {
  if (!session) return null

  return (
    <BaseModal
      className='ef-modal-group ef-sessions-modal'
      hasCloseButton={true}
      visible={visible}
      Body={<ModalBody
        dismissModalCb={hideActiveModal}
        session={session}
      />}
    />
  )
}
