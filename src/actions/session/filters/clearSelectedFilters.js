import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Clears out the selectedFilters
 */
export const clearSelectedFilters = () => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_FILTERS,
      item: [],
    },
  })
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_PRESENTER_FILTERS,
      item: [],
    },
  })
}
