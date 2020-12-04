import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Removes the active modal
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
