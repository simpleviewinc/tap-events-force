import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { mapObj } from 'jsutils'
import { buildHourSessionsMap } from 'SVUtils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * defines which sessionAgendaProps need to be mapped differently
 */
const subCatMap = {
  settings: SUB_CATEGORIES.AGENDA_SETTINGS,
}

/**
 *  map AgendaSessions using sessions and agenda day numbers
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {Array} agendaDays
 */
const mapAgendaSessions = (sessions, agendaDays) => {
  if (!sessions || !agendaDays) return

  let agendaSessions = {}
  // object will look something like:
  // {
  //   1: {9:00: [session1, session2], 10:00: []} //day 1
  //   2: {9:15: [session]}, //day 2
  // }
  agendaDays.map(agendaDay => {
    agendaSessions[agendaDay.dayNumber] = buildHourSessionsMap(
      sessions,
      agendaDay.dayNumber
    )
  })

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.AGENDA_SESSIONS,
      items: agendaSessions,
    },
  })
}

/**
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  // loop through each key and dispatch accordingly
  props &&
    mapObj(props, (key, value) => {
      // ensure key exists in the local storage first
      if (key === CATEGORIES[key.toUpperCase()]) {
        let type = ActionTypes.UPSERT_ITEMS
        let payload = {
          category: key,
          items: value,
        }

        // while mapping sessions, also map for 'activeSessions'
        // activeSessions are sessions sorted by day number
        if (key === CATEGORIES.SESSIONS)
          mapAgendaSessions(value, props.agendaDays)

        // certain props need to be mapped to a specific key
        if (subCatMap[key]) {
          type = ActionTypes.UPSERT_ITEM
          payload = {
            category: key,
            item: value,
            key: subCatMap[key],
          }
        }
        dispatch({
          type,
          payload,
        })
      }
    })
}
