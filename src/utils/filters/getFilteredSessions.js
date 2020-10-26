import { memorize, noPropArr } from '@keg-hub/jsutils'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
} from 'SVUtils/filters'

/**
 * Filter the sessions list based on the selected filters passed in
 * @param {Array<import('SVModels/label').Label>} selectedFilters
 * @param {Array<import('SVModels/session').Session>} sessions
 *
 * @example getFilteredSessions(selectedFilters, sessions)
 * @returns {Array<import('SVModels/session').Session>}
 */
export const getFilteredSessions = memorize(
  (selectedFilters = noPropArr, sessions = noPropArr) => {
    return sessionsFromLabelFilters(
      selectedFilters,
      sessionsFromStateFilters(selectedFilters, sessions)
    )
  }
)
