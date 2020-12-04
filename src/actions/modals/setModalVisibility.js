import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Removes a modal from the modals array
 * remove the most recent modals if no index is passed
 * @param {boolean} visible - if the active modal is visible or not
 */
export const setModalVisibility = visible => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      key: 'visible',
      item: visible,
    },
  })
}
