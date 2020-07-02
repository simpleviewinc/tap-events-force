// import { dispatch } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'
import { isFunc } from 'jsutils'

const { CATEGORIES } = Values

/**
 * Adds a modal to the modals array
 * @param {'error'|'presenter'| 'filter' | null} modalType - modal model
 * @param {Function} cb
 */
export const addModal = (modalType, cb) => {
  if (!modalType) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      item: modalType,
    },
  })

  isFunc(cb) && cb(modalType)
}
