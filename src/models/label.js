/**
 * Label class model
 */
export class Label {
  /**
   * @param {object=} props
   * @property {string=} identifier
   * @property {string=} name
   * @property {string=} className
   */
  constructor({ identifier = '', name = '', className = '' } = {}) {
    this.identifier = identifier
    this.name = name
    this.className = className
  }
}
