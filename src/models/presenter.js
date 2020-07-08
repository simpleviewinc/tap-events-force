import { assignDefinedProps } from 'SVUtils'

export class Presenter {
  identifier = ''
  title = ''
  firstname = ''
  lastname = ''
  email = ''
  jobtitle = ''
  company = ''
  photographUrl = null
  biography = ''

  /**
   * Presenter class model
   * @param {object} params
   * @param {string} params.identifier - is it opened? Used on mobile
   * @param {string} params.title - Mr, mrs, Dr, etc max 50 characters
   * @param {string} params.firstname - Max 50 characters
   * @param {string} params.lastname - Max 50 characters
   * @param {string} params.email
   * @param {string} params.jobtitle
   * @param {string} params.company
   * @param {string?} params.photographUrl - Url of presenters photo
   * @param {string} params.biography - Max 10,000 characters
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
