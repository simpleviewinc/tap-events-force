/**
 * Label class model
 */
export class Label {
  /**
   * @param {string=} identifier
   * @param {string=} name
   * @param {string=} className
   */
  constructor(identifier = '', name = '', className = '') {
    this.identifier = identifier
    this.name = name
    this.className = className
  }
}
