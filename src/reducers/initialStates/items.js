import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
} from 'SVReducers/initialStates'

export const itemsState = {
  ...sessionsState,
  ...usersState,
  ...settingsState,
  ...labelsState,
  ...locationsState,
}
