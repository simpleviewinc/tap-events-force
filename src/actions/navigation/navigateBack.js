
/**
 * Called when you want to navigate back from the route stack
 * @param {Object} history - router history object
 * 
 * @returns {void}
 */
export const navigateBack = (history) => {
  history.goBack()
}