import { ActionTypes, Values } from 'SVConstants'
import { dispatch } from 'SVStore'
import { validate, isPositive, checkCall } from '@keg-hub/jsutils'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Sets the current, actively-selected day in the agenda
 * @param {Number} newDayNumber - number to change the day to
 * @param {Function?} onChange - optional callback of form (nextDay) => {...}
 *
 */
export const setDay = (newDayNumber, onChange) => {
  const [valid] = validate({ newDayNumber }, { newDayNumber: isPositive })
  if (!valid) return

  checkCall(onChange, newDayNumber)
  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.SETTINGS,
      key: SUB_CATEGORIES.AGENDA_SETTINGS,
      item: { activeDayNumber: newDayNumber },
    },
  })
}
