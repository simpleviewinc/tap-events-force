// import { dispatch } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'

const { CATEGORIES } = Values

/**
 * Adds a modal to the modals array
 * @param {import('SVModels/modal').Modal} modal
 */
export const addModal = modal => {
  if (!modal) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      item: modal,
    },
  })
}
