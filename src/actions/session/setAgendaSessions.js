import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { buildHourSessionsMap } from 'SVUtils'

const { CATEGORIES } = Values
/**
 *  set AgendaSessions using sessions and agenda day numbers
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {Array} agendaDays
 */
export const setAgendaSessions = (sessions, agendaDays) => {
  if (!sessions || !agendaDays) return

  // object will look something like:
  // {
  //   1: {9:00: [session1, session2], 10:00: []} //day 1
  //   2: {9:15: [session]}, //day 2
  // }
  const agendaSessions = agendaDays.reduce((map, nextDay) => {
    map[nextDay.dayNumber] = buildHourSessionsMap(sessions, nextDay.dayNumber)
    return map
  }, {})

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.AGENDA_SESSIONS,
      items: agendaSessions,
    },
  })
}
