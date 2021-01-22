import { setDay } from './setDay'
import { getStore } from 'SVStore'
import { get } from '@keg-hub/jsutils'

/**
 * Decrements the active/selected day in the agenda in the store
 * @param {Function?} onChange - optional callback of form (nextDay) => {...}
 */
export const decrementDay = (onChange = null) => {
  const { items } = getStore().getState()
  const currentDay = get(items, 'settings.agendaSettings.activeDayNumber', 0)

  // only decrement the day if we are not on the first day of the agenda
  if (currentDay <= 1) return

  const nextDay = currentDay - 1
  setDay(nextDay, onChange)
}
