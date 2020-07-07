// import { dispatch, getStore } from 'SVStore' // TODO - add back after rollup config is made
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch, getStore } from '../../store/sessionsStore'

const { CATEGORIES } = Values
/**
 * Removes a modal from the modals array
 * remove the most recent modals if no index is passed
 * @param {number} index - index to remove from array
 */
export const removeModal = index => {
  const { modals } = getStore()

  // if index is passed in, check if its valid, otherwise return warning
  // if no index passed in, take off the last item in the array
  const removeIndex = index
    ? index <= modals.length - 1
        ? index
        : null
    : modals.length - 1

  if (!removeIndex) return console.warn(`${index} is not a valid index`)

  modals.length &&
    dispatch({
      type: ActionTypes.REMOVE_ITEM,
      payload: {
        category: CATEGORIES.MODALS,
        key: removeIndex,
      },
    })
}
