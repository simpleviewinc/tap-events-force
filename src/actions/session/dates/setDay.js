import { ActionTypes, Values } from 'SVConstants'
import { dispatch } from 'SVStore'
import { validate, isPositive } from '@svkeg/jsutils'
const { CATEGORIES, SUB_CATEGORIES } = Values

// plugin config that commands the localStorage plugin to persist the active day number
const pluginConfig = {
  localStorage: {
    persist: `${CATEGORIES.SETTINGS}.${SUB_CATEGORIES.AGENDA_SETTINGS}.activeDayNumber`,
  },
}

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
      key: SUB_CATEGORIES.AGENDA_SETTINGS,
      item: { activeDayNumber: newDayNumber },
      plugins: pluginConfig,
    },
  })
}
