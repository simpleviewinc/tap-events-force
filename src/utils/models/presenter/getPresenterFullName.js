/**
 * Returns '{title} {firstname} {lastname}' for a given presenter
 * @param {import('SVModels/presenter').Presenter} presenter
 * @returns {string} ex: 'Mr Frank Macloud
 */
export const getPresenterFullName = presenter => {
  return [ presenter?.title, presenter?.firstname, presenter?.lastname ]
    .filter(Boolean)
    .join(' ')
}
