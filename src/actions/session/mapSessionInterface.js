import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { mapObj } from '@keg-hub/jsutils'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { initSortedAttendees } from 'SVActions/attendees/initSortedAttendees'
import { initRestrictedAttendees } from 'SVActions/attendees/initRestrictedAttendees'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import { itemsState as initialItemsState } from 'SVReducers/initialStates/items'

const { CATEGORIES, INTERNAL_CATEGORIES, SUB_CATEGORIES } = Values

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
  if (!value) {
    console.log('missing', {
      category,
      value,
      default: initialItemsState[category],
    })
  }

  // displayProperties should go in settings.displayProperties
  return category === INTERNAL_CATEGORIES.DISPLAY_PROPERTIES
    ? {
        type: ActionTypes.UPSERT_ITEM,
        payload: { category: CATEGORIES.SETTINGS, item: value, key: category },
      }
    : !subCatMap[category]
        ? // by default, we use set items, so that if the component is mounted/remounted, data won't be duplicated
          {
            type: ActionTypes.SET_ITEMS,
            payload: { category, items: value ?? initialItemsState[category] },
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
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  if (!props) return

  const { ALERT, ...remainingCategories } = CATEGORIES

  mapObj(remainingCategories, (_, category) => {
    const action = getDispatchPayload(category, props[category])
    dispatch(action)
  })

  props[ALERT] && checkAlert(props[ALERT])
  setAgendaSessions(props[CATEGORIES.SESSIONS], props.agendaDays)

  // loop through each key and dispatch accordingly
  // mapObj(props, (key, value) => {
  //   // ensure key exists in the items store first
  //   if (key !== CATEGORIES[snakeCase(key).toUpperCase()]) return

  //   // while mapping sessions, also map for 'activeSessions'
  //   // activeSessions are sessions sorted by day number
  //   if (key === CATEGORIES.SESSIONS) setAgendaSessions(value, props.agendaDays)

  //   // Check for the alert prop, and call the checkAlert when it exists
  //   // Otherwise just dispatch the payload based on the key and value
  //   key === CATEGORIES.ALERT
  //     ? checkAlert(props.alert)
  //     : dispatch(getDispatchPayload(key, value))
  // })

  // initialized the restricted attendee list for each session
  initRestrictedAttendees(props.sessions, props.attendees)

  // initialize the attendeesByTicket lists for each ticket
  initSortedAttendees(props.attendees, props.tickets, props.bookedTickets)
}
