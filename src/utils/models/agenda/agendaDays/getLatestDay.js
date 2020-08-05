import { findMax } from 'jsutils'

/**
 * Returns the latest day in the list of agenda days
 * @param {Array<AgendaDay>} agendaDays
 * @return {AgendaDay} - day that occurs latest in agenda
 */
export const getLatestDay = (agendaDays = []) =>
  agendaDays.length ? findMax(agendaDays, day => day.dayNumber) : null
