import testData from '../testData'

const sessions = (isUnlimited = false) => [
  {
    allowBooking: true,
    identifier: '1',
    name: `state - TIME CONFLICT - ${isUnlimited ? 'UNLIMITED' : 'LIMITED'} A`,
    dayNumber: 1,
    startDateTimeLocal: '2020-08-03 09:00:00',
    endDateTimeLocal: '2020-08-03 13:30:00',
    presenterIdentifiers: [ '1', '2' ],
    labelIdentifiers: [ '1', '2' ],
    locationIdentifier: '1',
    liveVideoUrl: 'https://us02web.zoom.us/j/1234',
    recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    restrictToAttendeeCategories: [],
    capacity: {
      isUnlimited,
      remainingPlaces: 5,
    },
    price: {
      currency: 'USD',
      amount: 923.0,
    },
  },
  {
    allowBooking: true,
    identifier: '2',
    name: `state - TIME CONFLICT - ${isUnlimited ? 'UNLIMITED' : 'LIMITED'} B`,
    dayNumber: 1,
    startDateTimeLocal: '2020-08-03 09:00:00',
    endDateTimeLocal: '2020-08-03 13:30:00',
    presenterIdentifiers: [ '1', '2' ],
    labelIdentifiers: [ '1', '2' ],
    locationIdentifier: '1',
    liveVideoUrl: 'https://us02web.zoom.us/j/1234',
    recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    restrictToAttendeeCategories: [],
    capacity: {
      isUnlimited,
      remainingPlaces: 5,
    },
    price: {
      currency: 'USD',
      amount: 923.0,
    },
  },
]

const conflictTestData = {
  ...testData,
  attendees: [
    {
      bookedTicketIdentifier: '1',
      name: 'Mr Frank Smith',
      attendeeCategoryIdentifier: '1',
      bookedDays: [1],
      bookedSessions: ['1'],
    },
  ],
}

const extraAttendees = [
  {
    bookedTicketIdentifier: '2',
    name: 'Mr James',
    attendeeCategoryIdentifier: '1',
    bookedDays: [1],
    bookedSessions: [],
  },
  {
    bookedTicketIdentifier: '3',
    name: 'Mr Foo Bar',
    attendeeCategoryIdentifier: '2',
    bookedDays: [1],
    bookedSessions: [],
  },
]

export const conflict = {
  single: {
    limited: {
      ...conflictTestData,
      sessions: sessions(),
    },
    unlimited: {
      ...conflictTestData,
      sessions: sessions(true),
    },
  },
  group: {
    limited: {
      ...conflictTestData,
      attendees: [ ...conflictTestData.attendees, ...extraAttendees ],
      sessions: sessions(),
    },
    unlimited: {
      ...conflictTestData,
      attendees: [ ...conflictTestData.attendees, ...extraAttendees ],
      sessions: sessions(true),
    },
  },
}
