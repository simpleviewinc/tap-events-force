import { useCallback } from 'react'
import { Modal } from 'SVModels/modal'
import { setActiveModal } from 'SVActions/modals'

/**
 * Creates new modal with memoized callback
 * @param {'error'|'presenter'|'filter'|'groupBooking'} type
 * @param {object} data
 */
export const useCreateModal = (type, data) => {
  return useCallback(() => {
    type && setActiveModal(new Modal({ type, data }))
  }, [ type, data ])
}
