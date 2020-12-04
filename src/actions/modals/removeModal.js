import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Removes a modal from the modals array
 * remove the most recent modals if no index is passed
 * @param {number} index - index to remove from array
 */
export const removeModal = () => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      key: 'activeModal',
      item: null,
    },
  })
}
