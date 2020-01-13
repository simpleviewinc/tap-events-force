import { uuid } from 'jsutils'

/**
 * Builds a personal message
 * @param {Object} data - Data to be joined with the default message model
 * 
 * @returns {Object} - Built personal message
 */
const personalMessage = data => ({
  collection: 'messages',
  type: 'text',
  group: 'personal',
  title: null,
  id: uuid(),
  ...data,
})

/**
 * Builds a message using the passed in content, user and recipient data
 * @param {string} content - Text content of the message
 * @param {Object} user - Signed in user, who's sending the message
 * @param {Object} recipient - Who the message it being sent to
 * 
 * @returns {Object} - Built message object
 */
export const buildMessage = (content, user, recipient) => {
 return personalMessage({
   content,
   from: user.name,
   to: recipient.name,
 })
}
