import { loadFromLocalStorage } from 'SVUtils/storage'
import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { LOCAL_STORAGE_KEYS } = Values

/**
 * Tap override of app init action, which loads values from local storage, then
 * dispatches the init value
 */
export const initSessions = async () => {
  const loadPromises = LOCAL_STORAGE_KEYS.map(path =>
    loadFromLocalStorage({ path })
  )
  await Promise.all(loadPromises)
  dispatch({
    type: ActionTypes.SESSIONS_INIT,
    initialized: true,
  })
  return Promise.resolve()
}
