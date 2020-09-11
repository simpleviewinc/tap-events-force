import { dispatch, getStore } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * adds/remove the item to/from selectedFilters
 * @param {string} name
 */
export const updateSelectedFilters = (name, shouldRemove) => {
  console.log('clicked')
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []

  // remove or append to the array
  const updatedFilters = shouldRemove
    ? selectedFilters.filter(val => val !== name)
    : selectedFilters.concat(name)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_FILTERS,
      item: updatedFilters,
    },
  })
}
