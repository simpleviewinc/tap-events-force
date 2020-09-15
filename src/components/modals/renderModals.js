import React from 'react'
import { PresenterDetails } from 'SVComponents/modals/presenterDetails'
import { GroupBooking } from 'SVComponents/modals/groupBooking'
import { Filter } from 'SVComponents/modals/filter'
import { Error } from 'SVComponents/modals/error'
import { Values } from 'SVConstants'

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

    case Values.MODAL_TYPES.GROUP_BOOKING:
      return (
        <GroupBooking
          key={index}
          attendees={modal.data?.attendees}
          session={modal.data?.session}
          visible={visible}
        />
      )

    case Values.MODAL_TYPES.ERROR:
      return (
        <Error
          key={index}
          visible={true}
          title={modal.data?.title}
          message={modal.data?.message}
        />
      )

    case Values.MODAL_TYPES.FILTER:
      return <Filter
        key={index}
        visible={true}
        labels={modal.data?.labels}
      />

    default:
      return null
    }
  })
}