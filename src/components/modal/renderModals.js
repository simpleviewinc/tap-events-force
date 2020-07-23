import { Values } from 'SVConstants'
import React from 'react'
import { PresenterDetails } from 'SVComponents'
/**
 * loops through the array of modals
 * only display 1 modal at a time, by toggling the visible prop accordingly
 * @param {Array.<import('SVModels/modal').Modal>} modals - array of modal obj
 *
 * @returns {Component}
 */
export const RenderModals = modals => {
  return modals.map((modal, index) => {
    // 1. render last modal to be visible
    // 2. toggle any other visible modals to invisible
    const visible = index === modals.length - 1 ? true : false
    switch (modal.type) {
    case Values.MODAL_TYPES.PRESENTER:
      return (
        <PresenterDetails
          key={index}
          presenter={modal.data}
          visible={visible}
        />
      )

    case Values.MODAL_TYPES.ERROR:
      return null // TODO

    case Values.MODAL_TYPES.FILTER:
      return null // TODO

    default:
      return null
    }
  })
}
