import { Values } from 'SVConstants'
import { agendaSettings } from 'SVModels/tapIndex'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * settingsState
 */
export const settingsState = {
  [CATEGORIES.SETTINGS]: {
    [SUB_CATEGORIES.AGENDA_SETTINGS]: {
      ...agendaSettings,
    },
  },
}
