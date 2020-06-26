/**
 * Location class model
 */
export class Location {
  /**
   * @param {string=} identifier
   * @param {string=} name
   */
  constructor(identifier = '', name = '') {
    this.identifier = identifier
    this.name = name
  }
}
