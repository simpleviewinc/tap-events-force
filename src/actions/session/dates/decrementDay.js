import { setDay } from './setDay'
import { getStore } from '../../../store/sessionsStore'
import { get } from 'jsutils'

/**
 * Decrements the active/selected day in the agenda in the store
 * @param {Function?} onChange - optional callback of form (nextDay) => {...}
 */
export const decrementDay = (onChange = null) => {
  const store = getStore()
  const currentDay = get(store, 'settings.agendaSettings.activeDayNumber', 0)

  // only decrement the day if we are not on the first day of the agenda
  if (currentDay <= 1) return

  const nextDay = currentDay - 1
  onChange && onChange(nextDay)
  setDay(nextDay)
}
