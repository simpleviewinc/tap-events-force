import { dispatch, getStore } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * For cases where you select some filter items but decide not to apply them
 * This ensures that selectedFilters at least have the same values as activeFilters
 */
export const cancelSelectedFilters = () => {
  const { items } = getStore()?.getState()
  const activeFilters = items?.filters?.activeFilters || []

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_FILTERS,
      item: activeFilters,
    },
  })
}
