import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { itemsState as initialItemsState } from 'SVReducers/initialStates/items'
import { noPropObj, shallowEqual } from '@keg-hub/jsutils'
import { showAlertModal } from 'SVActions/modals/showAlertModal'
import { initSortedAttendees } from 'SVActions/attendees/initSortedAttendees'
import { initRestrictedAttendees } from 'SVActions/attendees/initRestrictedAttendees'
import { getStore } from 'SVStore'
import { applySessionFilters } from 'SVActions/session/filters/applySessionFilters'

const { CATEGORIES, EVF_CATEGORIES, SUB_CATEGORIES } = Values

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
const checkAlert = (alert = noPropObj) => {
  const existingAlert = getStore().getState()?.items?.alert

  // no reason to show the modal again if the alert object has not changed
  if (shallowEqual(alert, existingAlert)) return

  if (alert?.title && alert?.message) {
    showAlertModal(alert.message, alert.title)
  }
}

/**
 * builds either a SET_ITEMS || UPSERT_ITEM Dispatch payload object based on a given category
 * @param {string} category - some category from the CATEGORIES constants
 * @param {*} value - value to store at the category
 * @returns {object} - of the form { type, payload }
 */
const getDispatchPayload = (category, value) => {
  // displayProperties should go in settings.displayProperties
  return category === CATEGORIES.DISPLAY_PROPERTIES
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

  // set each events force category in the items store
  Object.values(EVF_CATEGORIES).map(category => {
    const action = getDispatchPayload(category, props[category])
    dispatch(action)
  })

  checkAlert(props.alert)

  applySessionFilters(props.sessions, props.agendaDays)

  // initialized the restricted attendee list for each session
  initRestrictedAttendees(props.sessions, props.attendees)

  // initialize the attendeesByTicket lists for each ticket
  initSortedAttendees(props.attendees, props.tickets, props.bookedTickets)
}
