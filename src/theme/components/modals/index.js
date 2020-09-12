import { errorModal } from './errorModal'
import { filterModal } from './filterModal'
import { groupBookingModal } from './groupBookingModal'
import { baseModal } from './baseModal'
import { presenterDetailsModal } from './presenterDetailsModal'

/**
 * all modal type gets merged with baseModal styles
 */
export const modal = {
  base: baseModal,
  groupBooking: groupBookingModal,
  presenter: presenterDetailsModal,
  error: errorModal,
  filter: filterModal,
}
