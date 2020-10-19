import { dispatch, getStore } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { buildHourSessionsMap } from 'SVUtils'

const { CATEGORIES } = Values
/**
 *  map AgendaSessions using sessions and agenda day numbers
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {Array} agendaDays
 */
export const setAgendaSessions = (sessions, agendaDays) => {
  if (!sessions || !agendaDays) return
  const { items } = getStore()?.getState()
  const military = items.settings?.displayProperties?.timeFormat === '24'
  // object will look something like:
  // { ordered by timeblock
  //   1: [{timeBlock: '9:00', sessions: [session1, session2]}] //day 1
  //   2: [{timeBlock: '13:00', sessions: [session1]}, {timeBlock: '15:00', sessions: [session1]}], //day 2
  // }
  const agendaSessions = agendaDays.reduce((map, nextDay) => {
    map[nextDay.dayNumber] = buildHourSessionsMap(
      sessions,
      nextDay.dayNumber,
      military
    )
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
