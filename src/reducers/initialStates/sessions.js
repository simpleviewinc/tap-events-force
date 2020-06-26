import { Values } from 'SVConstants'
import { activeSession, booking } from 'SVModels'

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
  [CATEGORIES.ACTIVE_SESSION]: {
    ...activeSession,
  },
  [CATEGORIES.BOOKING]: {
    ...booking,
  },
}