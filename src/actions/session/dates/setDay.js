import { ActionTypes, Values } from 'SVConstants'
import { dispatch } from 'SVStore'
import { validate, isNum } from 'jsutils'
const { CATEGORIES } = Values

/**
 * isPositiveNumber
 * @param {Number} num
 * @return {boolean} - true if the day is a positive number
 */
const isPositiveNumber = num => isNum(num) && num > 0

/**
 * Sets the current, actively-selected day in the agenda
 * @param {Number} newDayNumber - number to change the day to
 */
export const setDay = newDayNumber => {
  const [valid] = validate({ newDayNumber }, { newDayNumber: isPositiveNumber })
  if (!valid) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.SETTINGS,
      key: 'agendaSettings',
      item: { activeDayNumber: newDayNumber },
    },
  })
}
