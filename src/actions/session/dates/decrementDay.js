import { setDay } from './setDay'
import { getStore } from '../../../store/sessionsStore'
import { get } from 'jsutils'

export const decrementDay = () => {
  console.log({ getStore, setDay, get })
  const store = getStore()
  const currentDay = get(store, 'settings.agendaSettings.activeDayNumber', 0)

  // decrement, but don't allow it to drop to 0
  currentDay > 1 && setDay(currentDay - 1)
}
