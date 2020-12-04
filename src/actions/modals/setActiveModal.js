import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Sets the active modal to render
 * @param {import('SVModels/modal').Modal} modal
 * @param {boolean} visible - whether the modal should start visible or not
 */
export const setActiveModal = (modal, visible = true) => {
  if (!modal) return
  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.MODALS,
      items: {
        activeModal: modal,
        visible,
      },
    },
  })
}
