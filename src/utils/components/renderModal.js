import { Values } from 'SVConstants'
import React from 'react'
import { PresenterDetailModal } from 'SVComponents'
/**
 * loops through the array of modals and display the component accordingly
 * @param {Array.<import('SVModels/modal').Modal>} modals - array of modal obj
 *
 * @returns {Component}
 */
export const renderModal = modals => {
  return modals.map((modal, index) => {
    switch (modal.type) {
    case Values.MODAL_TYPES.PRESENTER:
      return <PresenterDetailModal
        key={index}
        presenter={modal.data}
      />

    case Values.MODAL_TYPES.ERROR:
      return null // TODO

    case Values.MODAL_TYPES.FILTER:
      return null // TODO

    default:
      return null
    }
  })
}
