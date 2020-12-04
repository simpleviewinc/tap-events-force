import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Sets the active modal to either be visible or hidden, depending on
 * the value of `visible`
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
