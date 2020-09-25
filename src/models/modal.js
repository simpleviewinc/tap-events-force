import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Modal {
  type = null
  data = null

  /**
   * Location class model
   * @param {object} params
   * @param {'alert'|'presenter'|'filter'|null} params.type
   * @param {object|string|null} params.data
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
