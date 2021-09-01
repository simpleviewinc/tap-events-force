import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from '../baseModal'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { SessionDetails } from './sessionDetails'

/**
 * SessionDetailsModal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} props.visible
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
export const SessionDetailsModal = ({ session, visible, labels }) => {
  if (!session) return null

  const theme = useTheme()

  const sessionDetailsStyles = theme.get('modal.sessionDetails')
  const contentStyles = sessionDetailsStyles?.content?.body

  return (
    <BaseModal
      className='ef-modal-group'
      hasCloseButton={true}
      visible={visible}
      Body={
        <SessionDetails
          dismissModalCb={hideActiveModal}
          styles={contentStyles}
          session={session}
          labels={labels}
        />
      }
    />
  )
}
