import testData from 'SVEvfMocks/eventsforce/testData.js'

// ------- MOCK SESSIONS -------

export const mockMixedSession = {
  allowBooking: true,
  identifier: '3',
  name: 'Mixed Session',
  startDateTimeLocal: '2020-08-03 09:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  dayNumber: 2,
  restrictToAttendeeCategories: [ '1', '2' ],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 1,
    isWaitingListAvailable: true,
  },
}

// ------- MOCK ATTENDEES -------

export const frank = {
  bookedTicketIdentifier: '1',
  name: 'Mr Frank Smith',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [ '1', '3' ],
}

export const lucy = {
  bookedTicketIdentifier: '3',
  name: 'Dr Lucy Jones',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [ '1', '3' ],
}

export const teresa = {
  bookedTicketIdentifier: '10',
  name: 'Ms. Teresa Waiting',
  attendeeCategoryIdentifier: '2',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [],
}

export const samantha = {
  bookedTicketIdentifier: '8',
  name: 'Samantha',
  attendeeCategoryIdentifier: '2',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [],
}

export const penelope = {
  bookedTicketIdentifier: '2',
  name: "Mrs Penelope O'Connor the Second",
  attendeeCategoryIdentifier: '2',
  bookedDays: [2],
  bookedSessions: [],
  waitingListSessions: [ '3', '5' ],
}

// purpose: testing session with restrictToAttendeeCategories property
export const john = {
  ...penelope,
  name: 'John',
  bookedTicketIdentifier: '7',
  attendeeCategoryIdentifier: '179',
}

export const attendees = [ frank, lucy, teresa, samantha, penelope, john ]

// ------- MOCK SESSIONS INPUT -------

export const mixedListMock = {
  ...testData,
  sessions: [mockMixedSession],
  attendees: [
    frank,
    samantha,
    penelope,
    {
      ...lucy,
      bookedSessions: [ '1', '3', '5' ],
      waitingListSessions: [],
    },
  ],
}
