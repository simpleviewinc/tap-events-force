import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
  modalsState,
} from 'SVReducers/initialStates'

export const itemsState = {
  ...sessionsState,
  ...usersState,
  ...settingsState,
  ...labelsState,
  ...locationsState,
  ...modalsState,
}
