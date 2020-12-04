import { dispatch, getStore } from 'SVStore'
import { isNum } from '@keg-hub/jsutils'
import { ActionTypes, Values } from 'SVConstants'
import { devLog } from 'SVUtils/logs'

const { CATEGORIES } = Values

/**
 * Helper to call dispatch and update the modals in the store
 * @param {Array} modals - All the current modals in the store
 */
const dispatchModalUpdate = modals => {
  modals &&
    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.MODALS,
        items: modals,
      },
    })
}

/**
 * Helper to remove the top modal, and dispatch the update
 * @param {Array} modals - All the current modals in the store
 */
const removeTopModal = modals => {
  modals.pop()
  return dispatchModalUpdate(modals)
}

/**
 * Helper to log index warning
 * @param {number} index - index to remove from array
 */
const logWarning = index => {
  devLog.warn(`${index} is not a valid index`)
}

/**
 * Removes a modal from the modals array
 * remove the most recent modals if no index is passed
 * @param {number} index - index to remove from array
 */
export const removeModal = index => {
  const { items } = getStore()?.getState()
  console.log('removing modal at ', index ?? 'top')

  const modalsCp = Array.from(items.modals)

  // if no index passed in, take off the last item in the array
  if (!isNum(index)) return removeTopModal(modalsCp)

  // if index is passed in, check if its valid, otherwise return warning
  if (!modalsCp[index]) return logWarning(index)

  // Remove the modal item at the index
  modalsCp.splice(index, 1)

  // Dispatch the update to the store
  dispatchModalUpdate(modalsCp)
}
