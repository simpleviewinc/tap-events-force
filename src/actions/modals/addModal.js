import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from 'SVStore'

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
