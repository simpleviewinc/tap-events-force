import { alertModal } from './alertModal'
import { filterModal } from './filterModal'
import { groupBookingModal } from './groupBookingModal'
import { baseModal } from './baseModal'
import { presenterDetailsModal } from './presenterDetailsModal'
import { sessionDetailsModal } from './sessionDetailsModal'
/**
 * all modal type gets merged with baseModal styles
 */
export const modal = {
  base: baseModal,
  groupBooking: groupBookingModal,
  presenter: presenterDetailsModal,
  alert: alertModal,
  filter: filterModal,
  sessionDetails: sessionDetailsModal,
}
