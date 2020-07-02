// import { dispatch } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'
import { isFunc } from 'jsutils'

const { CATEGORIES } = Values
/**
 * Removes a modal to the modals array
 * remove the most recent modals if no index is passed
 * @param {Array} modals
 * @param {number} index - index to remove from array
 * @param {Function} cb
 */
export const removeModal = (modals, index, cb) => {
  if (!modals) return

  dispatch({
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      key: index ? index : modals.length - 1,
    },
  })
  isFunc(cb) && cb(index)
}
