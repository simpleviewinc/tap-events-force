import React from 'react'
import { GroupBooking } from 'SVComponents/modals/groupBooking'
import { Filter } from 'SVComponents/modals/filter'
import { Alert } from 'SVComponents/modals/alert'
import { SessionDetailsModal } from 'SVComponents/modals/session/sessionDetailsModal'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

const { GROUP_BOOKING, ALERT, FILTER, SESSION_DETAILS } = Values.MODAL_TYPES

/**
 * Renders a modal if one is flagged as active in the modals store tree
 */
export const ModalManager = () => {
  const { activeModal, visible } = useStoreItems(CATEGORIES.MODALS)
  return activeModal ? (
    <ActiveModal
      modal={activeModal}
      visible={visible}
    />
  ) : null
}

/**
 * @param {Object} props
 * @param {import('SVModels/Modal').Modal} props.modal - the modal to render
 * @param {boolean} props.visible - whether the modal is visible or not
 */
const ActiveModal = ({ modal, visible = true }) => {
  switch (modal?.type) {
  case GROUP_BOOKING:
    return <GroupBooking
      session={modal.data?.session}
      visible={visible}
    />

  case ALERT:
    return (
      <Alert
        visible={visible}
        type={modal.data?.type}
        title={modal.data?.title}
        message={modal.data?.message}
      />
    )

  case FILTER:
    return <Filter
      visible={visible}
      labels={modal.data?.labels}
    />

  case SESSION_DETAILS:
    return (
      <SessionDetailsModal
        visible={visible}
        session={modal.data?.session}
        labels={modal.data?.labels}
      />
    )
  default:
    return null
  }
}
