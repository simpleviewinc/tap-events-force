import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { mapObj, snakeCase } from '@keg-hub/jsutils'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { initSortedAttendees } from 'SVActions/attendees/initSortedAttendees'
import { initRestrictedAttendees } from 'SVActions/attendees/initRestrictedAttendees'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import { bookRequestCompleted } from 'SVUtils/booking/bookRequestCompleted'
import { waitRequestCompleted } from 'SVUtils/booking/waitRequestCompleted'
import { getStore } from 'SVStore'

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
  const existingAlert = getStore().getState()?.items?.alert

  // no need to add another modal if the alert object is the
  // same reference as the current one
  if (alert === existingAlert) return

  if (alert?.title && alert?.message) {
    addModal(new Modal({ type: CATEGORIES.ALERT.toLowerCase(), data: alert }))

    // if there is a pending session, we should clear it since an error was raised
    clearPendingSession()
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
 * Checks if the incoming attendees satisfy the pending session's
 * requested booking. If it does, clears the currently stored 'pendingSession'
 * @param {Array<import('SVModels/Attendee').Attendee>} incomingAttendees
 */
const checkPendingSession = incomingAttendees => {
  if (!incomingAttendees) return

  const pendingSession = getStore().getState()?.items?.pendingSession
  if (!pendingSession?.identifier) return

  const { identifier, pendingBookingList, pendingWaitingList } = pendingSession

  const waitRequestSatisifed = waitRequestCompleted(
    identifier,
    pendingWaitingList,
    incomingAttendees
  )
  const bookRequestSatisfied = bookRequestCompleted(
    identifier,
    pendingBookingList,
    incomingAttendees
  )

  // if both lists match their respective submitted pending lists, then
  // clear the pending session
  waitRequestSatisifed && bookRequestSatisfied && clearPendingSession()
}

/**
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  if (!props) return

  // check if there is a pending session needing to be updated due to new attendees
  checkPendingSession(props.attendees)

  // loop through each key and dispatch accordingly
  mapObj(props, (key, value) => {
    // ensure key exists in the items store first
    if (key !== CATEGORIES[snakeCase(key).toUpperCase()]) return

    // while mapping sessions, also map for 'activeSessions'
    // activeSessions are sessions sorted by day number
    if (key === CATEGORIES.SESSIONS) setAgendaSessions(value, props.agendaDays)

    // Check for the alert prop, and call the checkAlert when it exists
    // Otherwise just dispatch the payload based on the key and value
    key === CATEGORIES.ALERT
      ? checkAlert(props.alert)
      : dispatch(getDispatchPayload(key, value))
  })

  // initialized the restricted attendee list for each session
  initRestrictedAttendees(props.sessions, props.attendees)

  // initialize the attendeesByTicket lists for each ticket
  initSortedAttendees(props.attendees, props.tickets, props.bookedTickets)
}
