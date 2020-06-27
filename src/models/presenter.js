/**
 * Presenter class model
 */
export class Presenter {
  /**
   * @param {object} props
   * @property {string} identifier - is it opened? Used on mobile
   * @property {string} title - Mr, mrs, Dr, etc max 50 characters
   * @property {string} firstname - Max 50 characters
   * @property {string} lastname - Max 50 characters
   * @property {string} email
   * @property {string} jobtitle
   * @property {string} company
   * @property {string?} photographUrl - Url of presenters photo
   * @property {string} biography - Max 10,000 characters
   */
  constructor({
    identifier = '',
    title = '',
    firstname = '',
    lastname = '',
    email = '',
    jobtitle = '',
    company = '',
    photographUrl = null,
    biography = '',
  } = {}) {
    this.identifier = identifier
    this.title = title
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.jobtitle = jobtitle
    this.company = company
    this.photographUrl = photographUrl
    this.biography = biography
  }
}
