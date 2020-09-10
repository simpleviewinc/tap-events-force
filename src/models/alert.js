import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Alert {
  title = ''
  message = ''
  type = null

  /**
   * Alert class model
   * @param {object} params
   * @param {string=} params.title - title of the alert
   * @param {string=} params.message - message of the alert
   * @param {('error'| null)} params.type - type of alert
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
