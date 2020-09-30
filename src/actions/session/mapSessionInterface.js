import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { mapObj, snakeCase } from '@keg-hub/jsutils'
import { buildHourSessionsMap } from 'SVUtils'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * defines which sessionAgendaProps need to be mapped to subcategories
 */
const subCatMap = {
  settings: SUB_CATEGORIES.AGENDA_SETTINGS,
}

/**
 * If alert prop is valid, add a new modal item for alert
 * @param {<import('SVModels/alert').Alert)>} alert
 */
const checkAlert = alert => {
  alert?.title &&
    alert?.message &&
    addModal(new Modal({ type: CATEGORIES.ALERT.toLowerCase(), data: alert }))
}

/**
 *  map AgendaSessions using sessions and agenda day numbers
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {Array} agendaDays
 */
const mapAgendaSessions = (sessions, agendaDays) => {
  if (!sessions || !agendaDays) return

  // object will look something like:
  // { ordered by timeblock
  //   1: [{timeBlock: '9:00', sessions: [session1, session2]}] //day 1
  //   2: [{timeBlock: '13:00', sessions: [session1]}, {timeBlock: '15:00', sessions: [session1]}], //day 2
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

/**
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  // loop through each key and dispatch accordingly
  props &&
    mapObj(props, (key, value) => {
      // ensure key exists in the items store first
      if (key === CATEGORIES[snakeCase(key).toUpperCase()]) {
        // by default, we use set items, so that if the component is mounted/remounted, data won't be duplicated
        let type = ActionTypes.SET_ITEMS
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
          // subcategories are upsert-merged, rather than set, since they
          // might need to be joined with data that was loaded from localStorage,
          // e.g. agendaSettings.activeDayNumber
          type = ActionTypes.UPSERT_ITEM
          payload = {
            category: key,
            item: value,
            key: subCatMap[key],
          }
        }

        key === CATEGORIES.ALERT
          ? checkAlert(props.alert)
          : dispatch({
            type,
            payload,
          })
      }
    })
}
