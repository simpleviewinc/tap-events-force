import { Values } from 'SVConstants/values'
import { deepMerge, reduceObj } from '@keg-hub/jsutils'
import { evfButton } from './evfButton'

const { SESSION_BOOKING_STATES } = Values
const button = evfButton?.primary?.content?.button
const defStyles = { ...button?.default }

const stateStyles = {
  [SESSION_BOOKING_STATES.AVAILABLE]: {},
  [SESSION_BOOKING_STATES.SELECTED]: {},
  [SESSION_BOOKING_STATES.WAITING_LIST]: {},
  [SESSION_BOOKING_STATES.ON_WAITING_LIST]: {},
  [SESSION_BOOKING_STATES.FULLY_BOOKED]: {},
  [SESSION_BOOKING_STATES.READ_ONLY]: {},
}

export const bookingState = {
  ...reduceObj(SESSION_BOOKING_STATES, (key, value, styles) => {
    styles[value] = deepMerge(defStyles, stateStyles[value])
    return styles
  }),
}
