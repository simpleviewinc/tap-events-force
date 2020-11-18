import { sessionsState } from './sessions'
import { pendingSessionState } from './pendingSession'
import { modifiedSessionState } from './modifiedSession'
import { usersState } from './users'
import { settingsState } from './settings'
import { labelsState } from './labels'
import { locationsState } from './locations'
import { modalsState } from './modals'

export const itemsState = {
  ...sessionsState,
  ...pendingSessionState,
  ...modifiedSessionState,
  ...usersState,
  ...settingsState,
  ...labelsState,
  ...locationsState,
  ...modalsState,
}
