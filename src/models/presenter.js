import { deepFreeze } from 'jsutils'

/**
 * Presenter user
 * @typedef presenter
 * @type {object}
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
/** @type {presenter} */
export const presenter = deepFreeze({
  identifier: '',
  title: '',
  firstname: '',
  lastname: '',
  email: '',
  jobtitle: '',
  company: '',
  photographUrl: null,
  biography: '',
})
