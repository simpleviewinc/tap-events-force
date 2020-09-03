import { Values } from 'SVConstants'
import { AgendaSettings } from 'SVModels/agendaSettings'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * settingsState
 */
export const settingsState = {
  [CATEGORIES.SETTINGS]: {
    [SUB_CATEGORIES.AGENDA_SETTINGS]: new AgendaSettings(),
  },
}
