import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { mapObj, snakeCase } from '@keg-hub/jsutils'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'

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
 * builds either a SET_ITEMS || UPSERT_ITEM Dispatch payload object based on a given category
 * @param {string} category - some category from the CATEGORIES constants
 * @param {*} value - value to store at the category
 * @returns {object} - of the form { type, payload }
 */
const getDispatchPayload = (category, value) => {
  return !subCatMap[category]
    ? // by default, we use set items, so that if the component is mounted/remounted, data won't be duplicated
      {
        type: ActionTypes.SET_ITEMS,
        payload: { category, items: value },
      }
    : // subcategories are upsert-merged, rather than set, since they
      // might need to be joined with data that was loaded from localStorage,
      // e.g. agendaSettings.activeDayNumber
      {
        type: ActionTypes.UPSERT_ITEM,
        payload: { category, item: value, key: subCatMap[category] },
      }
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
      if (key !== CATEGORIES[snakeCase(key).toUpperCase()]) return

      // while mapping sessions, also map for 'activeSessions'
      // activeSessions are sessions sorted by day number
      if (key === CATEGORIES.SESSIONS)
        setAgendaSessions(value, props.agendaDays)

      // Check for the alert prop, and call the checkAlert when it exists
      // Otherwise just dispatch the payload based on the key and value
      key === CATEGORIES.ALERT
        ? checkAlert(props.alert)
        : dispatch(getDispatchPayload(key, value))
    })
}
