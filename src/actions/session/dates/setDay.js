import { ActionTypes, Values } from 'SVConstants'
import { dispatch } from '../../../store/sessionsStore'
import { validate, isNum } from 'jsutils'
const { CATEGORIES } = Values

/**
 * isPositiveNumber
 * @param {Number} num
 * @return {boolean} - true if the day is a positive number
 */
const isPositiveNumber = num => isNum(num) && num > 0

export const setDay = dayNumber => {
  const [valid] = validate({ dayNumber }, { dayNumber: isPositiveNumber })
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_SESSION,
      key: 'dayNumber',
      item: dayNumber,
    },
  })
}
