import { alertModal } from './alertModal'
import { filterModal } from './filterModal'
import { groupBookingModal } from './groupBookingModal'
import { presenterDetailsModal } from './presenterDetailsModal'

export const modal = {
  groupBooking: groupBookingModal,
  presenter: presenterDetailsModal,
  alert: alertModal,
  filter: filterModal,
}
