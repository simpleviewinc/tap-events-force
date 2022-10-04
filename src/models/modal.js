import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Modal {
  type = null
  index = null
  data = null

  /**
   * Location class model
   * @param {object} params
   * @param {'alert'|'filter'|null} params.type
   * @param {object|string|null} params.data
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
