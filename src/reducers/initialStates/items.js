import { sessionsState } from './sessions'
import { usersState } from './users'
import { settingsState } from './settings'
import { labelsState } from './labels'
import { locationsState } from './locations'
import { modalsState } from './modals'

export const itemsState = {
  ...sessionsState,
  ...usersState,
  ...settingsState,
  ...labelsState,
  ...locationsState,
  ...modalsState,
  attendeesByTicket: [],
  restrictedAttendeeIds: [],
  events: [],
}
