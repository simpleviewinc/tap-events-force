import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

export const updateSelectedPresenterFilters = listOfPresenterIds => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.SELECTED_PRESENTER_FILTERS,
      item: listOfPresenterIds,
    },
  })
}
