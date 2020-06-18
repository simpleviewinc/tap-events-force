import { Values } from 'SVConstants'
import { session, booking } from 'SVModels'

const { CATEGORIES } = Values

export const itemsState = {
  [CATEGORIES.SESSIONS]: {},
  [CATEGORIES.FILTERS]: {
    activeFilters: {},
    selectedFilters: {},
  },
  [CATEGORIES.ACTIVE_SESSION]: {
    0: session,
  },
  [CATEGORIES.BOOKING]: {
    0: booking,
  },
}
