import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
  modalsState,
} from '../reducers/initialStates'

export const setState = jest.fn(data => {
  return (store = {
    items: {
      ...sessionsState,
      ...usersState,
      ...settingsState,
      ...labelsState,
      ...locationsState,
      ...modalsState,
      ...data,
    },
  })
})

let store = setState()
export const getStore = () => {
  return {
    getState: () => store,
  }
}
export const dispatch = jest.fn()
