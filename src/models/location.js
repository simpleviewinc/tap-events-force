/**
 * Location class model
 */
export class Location {
  /**
   * @param {Object?} props
   * @property {string=} identifier
   * @property {string=} name
   */
  constructor({ identifier = '', name = '' } = {}) {
    this.identifier = identifier
    this.name = name
  }
}
