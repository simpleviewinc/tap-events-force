import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Adds a modal to the modals array
 * @param {import('SVModels/modal').Modal} modal
 */
export const addModal = modal => {
  modal &&
    dispatch({
      type: ActionTypes.UPSERT_ITEM,
      payload: {
        category: CATEGORIES.MODALS,
        item: modal,
      },
    })
}
