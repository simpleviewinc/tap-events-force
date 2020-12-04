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
const isValidInput = (title, message) => {
  const [valid] = validate({ title, message }, { $default: isStr })
  return valid
}

const alertModalType = CATEGORIES.ALERT.toLowerCase()

/**
 * Action for settings the active modal to an alert modal
 * @param {string} title - alert title
 * @param {string} message - alert message
 */
export const showAlertModal = (title, message) => {
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
