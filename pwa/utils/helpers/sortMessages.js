import { isObj, isColl } from 'jsutils'

/**
 * Sorts an object or an array using the passed in key
 * If an object is passed in, it gets converted to an array using the objects values
 * @param {Object|Array} messages - Group to be sorted
 * @param {string} [key='updated_at']
 *
 * @returns {Array} - Group of sorted messages
 */
export const sortMessages = (messages, key='updated_at') => {
  if(!isColl(messages)) return messages
  
  const toSort = isObj(messages) ? Object.values(messages) : messages

  return toSort.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
}
