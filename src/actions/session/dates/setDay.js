import { ActionTypes, Values } from 'SVConstants'
import { dispatch } from 'SVStore'
import { validate, isPositive } from 'jsutils'
const { CATEGORIES } = Values

/**
 * Sets the current, actively-selected day in the agenda
 * @param {Number} newDayNumber - number to change the day to
 */
export const setDay = newDayNumber => {
  const [valid] = validate({ newDayNumber }, { newDayNumber: isPositive })
  if (!valid) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.SETTINGS,
      key: 'agendaSettings',
      item: { activeDayNumber: newDayNumber },
      persist: true,
    },
  })
}
