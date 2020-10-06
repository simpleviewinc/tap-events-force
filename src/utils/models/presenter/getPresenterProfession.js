/**
 * returns '{job title} - {company}' based on a given presenter
 * @param {import('SVModels/presenter').Presenter} presenter
 * @returns {string} ex: 'Engineer - Simpleview'
 */
export const getPresenterProfession = presenter => {
  return [ presenter?.jobtitle, presenter?.company ].filter(Boolean).join(' - ')
}
