import { sessionsState } from './sessions'
import { pendingSessionState } from './pendingSession'
import { usersState } from './users'
import { settingsState } from './settings'
import { labelsState } from './labels'
import { locationsState } from './locations'
import { modalsState } from './modals'

import { Values } from 'SVConstants'
const { CATEGORIES } = Values

export const itemsState = {
  ...sessionsState,
  ...pendingSessionState,
  ...usersState,
  ...settingsState,
  ...labelsState,
  ...locationsState,
  ...modalsState,
  [CATEGORIES.ALERT]: {},
  [CATEGORIES.ATTENDEES_BY_TICKET]: [],
  [CATEGORIES.RESTRICTED_ATTENDEE_IDS]: [],
  [CATEGORIES.TICKETS]: [],
  [CATEGORIES.BOOKED_TICKETS]: [],
}
