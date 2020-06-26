/**
 * Presenter class model
 */
export class Presenter {
  /**
   * @param {string} identifier - is it opened? Used on mobile
   * @param {string} title - Mr, mrs, Dr, etc max 50 characters
   * @param {string} firstname - Max 50 characters
   * @param {string} lastname - Max 50 characters
   * @param {string} email
   * @param {string} jobtitle
   * @param {string} company
   * @param {string?} photographUrl - Url of presenters photo
   * @param {string} biography - Max 10,000 characters
   */
  constructor(
    identifier = '',
    title = '',
    firstname = '',
    lastname = '',
    email = '',
    jobtitle = '',
    company = '',
    photographUrl = null,
    biography = ''
  ) {
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
