import { Values } from 'SVConstants'
import { ActiveSession } from 'SVModels/session/activeSession'
import { Booking } from 'SVModels/booking'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * sessions state
 */
export const sessionsState = {
  [CATEGORIES.SESSIONS]: [],
  [CATEGORIES.FILTERS]: {
    [SUB_CATEGORIES.ACTIVE_FILTERS]: [],
    [SUB_CATEGORIES.ACTIVE_PRESENTER_FILTERS]: [],
    [SUB_CATEGORIES.SELECTED_FILTERS]: [],
    [SUB_CATEGORIES.SELECTED_PRESENTER_FILTERS]: [],
  },
  [CATEGORIES.AGENDA_SESSIONS]: {},
  [CATEGORIES.ACTIVE_SESSION]: new ActiveSession(),
  [CATEGORIES.BOOKING]: new Booking(),
  [CATEGORIES.AGENDA_DAYS]: [],
}
