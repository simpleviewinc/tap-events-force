import { getHistory } from 'SVNavigation'

/**
 * Called when you want to navigate back from the route stack
 * 
 * @returns {void}
 */
export const navigateBack = () => {
  getHistory().goBack()
}