import { Values } from 'SVConstants'
import { ActiveSession, Booking } from 'SVModels'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * sessions state
 */
export const sessionsState = {
  [CATEGORIES.SESSIONS]: [],
  [CATEGORIES.FILTERS]: {
    [SUB_CATEGORIES.ACTIVE_FILTERS]: [],
    [SUB_CATEGORIES.SELECTED_FILTERS]: [],
  },
  [CATEGORIES.ACTIVE_SESSION]: new ActiveSession({ id: 1 }),
  [CATEGORIES.BOOKING]: new Booking(),
  [CATEGORIES.AGENDA_DAYS]: [],
}
