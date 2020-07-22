import { setDay } from './setDay'
import { getStore } from '../../../store/sessionsStore'
import { get } from 'jsutils'
import { isLatestDay } from 'SVUtils'

/**
 * Increments the active selected agenda day
 */
export const incrementDay = () => {
  const store = getStore()

  const currentDayNumber = get(
    store,
    'settings.agendaSettings.activeDayNumber',
    0
  )

  // only increment the day if there are later days in the agenda than current
  !isLatestDay(currentDayNumber, store.agendaDays) &&
    setDay(currentDayNumber + 1)
}
