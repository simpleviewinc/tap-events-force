// import { dispatch, getStore } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes, Values } from 'SVConstants'
import { dispatch, getStore } from '../../store/sessionsStore'

const { CATEGORIES } = Values
/**
 * Removes a modal from the modals array
 * remove the most recent modals if no index is passed
 * @param {number} index - index to remove from array
 */
export const removeModal = index => {
  const { modals } = getStore()

  // if no index passed in, take off the last item in the array
  // if index is passed in, check if its valid, otherwise return warning
  const removeIndex =
    index === undefined
      ? modals.length - 1
      : index <= modals.length - 1
        ? index
        : undefined

  if (removeIndex === undefined)
    return console.warn(`${index} is not a valid index`)

  modals.length &&
    dispatch({
      type: ActionTypes.REMOVE_ITEM,
      payload: {
        category: CATEGORIES.MODALS,
        key: removeIndex,
      },
    })
}
