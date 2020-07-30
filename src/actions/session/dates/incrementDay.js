import { setDay } from './setDay'
import { getStore } from '../../../store/sessionsStore'
import { get, checkCall } from 'jsutils'
import { isLatestDay } from 'SVUtils'

/**
 * Increments the active selected agenda day in the store
 * @param {Function?} onChange - optional callback of form (nextDay) => {...}
 */
export const incrementDay = (onChange = null) => {
  const store = getStore()

  const currentDayNumber = get(store, 'settings.agendaSettings.activeDayNumber')

  // only increment the day if there are days in the agenda later than the current one
  if (isLatestDay(currentDayNumber, store.agendaDays)) return

  const next = currentDayNumber + 1
  checkCall(onChange, next)
  setDay(next)
}
