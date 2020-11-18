import { alertModal } from './alertModal'
import { filterModal } from './filterModal'
import { groupBookingModal } from './groupBookingModal'
import { presenterDetailsModal } from './presenterDetailsModal'
import { sessionDetailsModal } from './sessionDetailsModal'

export const modal = {
  groupBooking: groupBookingModal,
  presenter: presenterDetailsModal,
  alert: alertModal,
  filter: filterModal,
  sessionDetails: sessionDetailsModal,
}
