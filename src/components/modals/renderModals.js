import React from 'react'
import { PresenterDetails } from 'SVComponents/modals/presenterDetails'
import { GroupBooking } from 'SVComponents/modals/groupBooking'
import { Filter } from 'SVComponents/modals/filter'
import { Alert } from 'SVComponents/modals/alert'
import { SessionDetailsModal } from 'SVComponents/modals/sessionDetailsModal'
import { Values } from 'SVConstants'

const {
  PRESENTER,
  GROUP_BOOKING,
  ALERT,
  FILTER,
  SESSION_DETAILS,
} = Values.MODAL_TYPES

const renderModal = (modal, index) => {
  const visible = true

  switch (modal?.type) {
  case PRESENTER:
    return (
      <PresenterDetails
        key={index}
        modalIndex={index}
        presenter={modal.data}
        visible={visible}
      />
    )

  case GROUP_BOOKING:
    return (
      <GroupBooking
        key={index}
        modalIndex={index}
        session={modal.data?.session}
        visible={visible}
      />
    )

  case ALERT:
    return (
      <Alert
        key={index}
        modalIndex={index}
        visible={visible}
        type={modal.data?.type}
        title={modal.data?.title}
        message={modal.data?.message}
      />
    )

  case FILTER:
    return (
      <Filter
        key={index}
        modalIndex={index}
        visible={visible}
        labels={modal.data?.labels}
      />
    )

  case SESSION_DETAILS:
    return (
      <SessionDetailsModal
        key={index}
        modalIndex={index}
        visible={visible}
        session={modal.data?.session}
        labels={modal.data?.labels}
      />
    )
  default:
    return null
  }
}

/**
 * Render the top of the modal stack
 * @param {Array.<import('SVModels/modal').Modal>} modals - array of modal obj
 * @returns {Component}
 */
export const RenderModals = modals => {
  if (!modals) return null

  // the top of the stack is the last element
  const index = modals.length - 1

  return renderModal(modals[index], index)
}
