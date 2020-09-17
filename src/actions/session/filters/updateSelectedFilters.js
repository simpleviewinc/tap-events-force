import { dispatch, getStore } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * adds/remove the item to/from selectedFilters
 * @param {import('SVModels/label').Label} label
 */
export const updateSelectedFilters = label => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []

  // add the item if it doesn't exist
  // remove the item if it does exist
  const shouldRemove = selectedFilters.some(
    item => item.identifier === label.identifier
  )

  const updatedFilters = shouldRemove
    ? selectedFilters.filter(item => item.identifier !== label.identifier)
    : selectedFilters.concat(label)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_FILTERS,
      item: updatedFilters,
    },
  })
}
