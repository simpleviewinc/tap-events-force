export const initialState = {
  initialized: false,
  session: null,
  capacity: null,
  showCapacity: true,

  // Lists as they were upon initialization. These
  // do not change and are used to determine
  // if a current list is modified from the original
  init: {
    waitingList: [],
    bookingList: [],
  },

  // the current booking and waiting lists of attendee ids, which
  // could be requested for booking
  current: {
    bookingList: [],
    waitingList: [],
  },

  // bools indicating if the current booking and waiting lists
  // are modified from their original states
  modified: {
    bookingList: false,
    waitingList: false,
  },
}
