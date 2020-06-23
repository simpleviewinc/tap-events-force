import { Values } from 'SVConstants'
import { activeSession, booking } from 'SVModels'

const { CATEGORIES } = Values

/**
 * sessions state
 */
export const sessionsState = {
  [CATEGORIES.SESSIONS]: [],
  [CATEGORIES.FILTERS]: {
    activeFilters: [],
    selectedFilters: [],
  },
  [CATEGORIES.ACTIVE_SESSION]: {
    ...activeSession,
  },
  [CATEGORIES.BOOKING]: {
    ...booking,
  },
}
