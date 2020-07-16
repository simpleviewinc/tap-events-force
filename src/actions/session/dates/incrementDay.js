import { setDay } from './setDay'
import { useSessionsStore } from '../../../store/sessionsStore'

export const incrementDay = () => {
  const { agendaSettings } = useSessionsStore()
  return setDay(agendaSettings.activeAgendaDay + 1)
}
