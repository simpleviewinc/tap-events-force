import { isArr, flatMap } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'

const { SESSION_BOOKING_STATES } = Values
const bookingStateKeys = Object.keys(SESSION_BOOKING_STATES)

/**
 * Filter by labels
 * @param {Array.<import('SVModels/label').Label>} labels
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 * @returns {Array.<import('SVModels/session').Session>}
 */
export const sessionsFromLabelFilters = (labels, sessions) => {
  const labelFilters = labels.filter(
    item => !bookingStateKeys.includes(item.identifier)
  )
  if (labelFilters.length > 0) {
    // 1. reduce the filter items to just the ids
    // 2. filter the sessions array with the filter ids
    const labelIds = flatMap(labelFilters, item => [item.identifier])

    return sessions.filter(
      session =>
        isArr(session.labelIdentifiers) &&
        session.labelIdentifiers.some(id => labelIds.includes(id))
    )
  }

  return sessions
}
