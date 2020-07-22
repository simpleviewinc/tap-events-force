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

export const setDay = activeDayNumber => {
  const [valid] = validate(
    { activeDayNumber },
    { activeDayNumber: isPositiveNumber }
  )
  if (!valid) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.SETTINGS,
      key: 'agendaSettings',
      item: { activeDayNumber },
    },
  })
}
