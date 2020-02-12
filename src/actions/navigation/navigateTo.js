import { navigateToPath } from 'SVNavigation'
import { logData } from 'jsutils'

/**
 * Called when you want to navigate to another route path
 * @param {String} path - path you want to route to
 * @param {Object} history - router history object
 * 
 * @returns {void}
 */
export const navigateTo = (path, history) => {
  
  const { success, message } = navigateToPath(path, history)

  if (!success)
    logData(message, 'warn') 
}