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

const modalType = CATEGORIES.ALERT.toLowerCase()

/**
 * Action for showing an alert modal
 * @param {string} title - alert title
 * @param {string} message - alert message
 */
export const addAlertModal = (title, message) => {
  if (!isValidInput(title, message)) return

  addModal(
    new Modal({
      type: modalType,
      data: {
        title,
        message,
      },
    })
  )
}
