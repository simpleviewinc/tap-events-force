// import { dispatch } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'

const { CATEGORIES } = Values

/**
 * Adds a modal to the modals array
 * @param {'error'|'presenter'| 'filter' | null} modalType - modal model
 */
export const addModal = modalType => {
  if (!modalType) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      item: modalType,
    },
  })
}
