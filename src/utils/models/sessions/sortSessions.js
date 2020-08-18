import { get, isArr } from 'jsutils'

/**
 * Sort the sessions ascending or descending
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {boolean=} asc - whether to order them in ascending or not
 *
 * @returns {Array<import('SVModels/session').Session>} - array of sorted sessions
 */
export const sortSessions = (sessions, asc = true) => {
  if (!sessions || !isArr(sessions)) return []

  const sortedSessions = sessions.sort((sessionA, sessionB) => {
    // get name property for sessions
    const nameA = get(sessionA, 'name', '').toLowerCase()
    const nameB = get(sessionB, 'name', '').toLowerCase()
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  })
  if (!asc) sortedSessions.reverse()
  return sortedSessions
}
