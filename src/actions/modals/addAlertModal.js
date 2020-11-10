import { addModal } from './addModal'
import { Modal } from 'SVModels/modal'
import { validate, isStr } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * Validates `addAlertModal` arguments
 * @param {string} title
 * @param {string} message
 */
const isValidInput = (title, message) => {
  const [valid] = validate({ title, message }, { $default: isStr })
  return valid
}

const alertModalType = CATEGORIES.ALERT.toLowerCase()

/**
 * Action for adding an alert modal to the modal stack.
 * @param {string} title - alert title
 * @param {string} message - alert message
 */
export const addAlertModal = (title, message) => {
  if (!isValidInput(title, message)) return

  const modal = new Modal({
    type: alertModalType,
    data: {
      title,
      message,
    },
  })

  addModal(modal)
}
