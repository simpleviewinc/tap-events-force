import { setActiveModal } from './setActiveModal'
import { Modal } from 'SVModels/modal'
import { validate, isStr } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * Validates `showAlertModal` arguments
 * @param {string} title
 * @param {string} message
 */
const isValidInput = (message, title) => {
  const [valid] = validate({ title, message }, { $default: isStr })
  return valid
}

const alertModalType = CATEGORIES.ALERT.toLowerCase()

/**
 * Action for settings the active modal to an alert modal
 * @param {string} title - alert title
 * @param {string} message - alert message
 */
export const showAlertModal = (message, title = 'Error') => {
  if (!isValidInput(title, message)) return

  const modal = new Modal({
    type: alertModalType,
    data: {
      title,
      message,
    },
  })

  setActiveModal(modal)
}
