import { useCallback } from 'react'
import { Modal } from 'SVModels/modal'
import { addModal } from 'SVActions/modals'

/**
 * Creates new modal with memoized callback
 * @param {'error'|'presenter'|'filter'} type
 * @param {object} data
 */
export const useCreateModal = (type, data) => {
  return useCallback(() => {
    type && addModal(new Modal({ type, data }))
  }, [ type, data ])
}
