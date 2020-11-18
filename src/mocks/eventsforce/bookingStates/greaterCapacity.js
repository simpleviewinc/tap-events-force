import testData from '../testData'

const greaterCapacityTestData = {
  ...testData,
  sessions: [
    {
      allowBooking: true,
      // Custom identifier to flag that booking has been stopped for that session
      // Will need to update when Events-Force gives us the real value
      // bookingStopped: true,
      identifier: '2',
      name: 'state - greater capacity - limited ',
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
        isUnlimited: false,
        remainingPlaces: Infinity,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
  ],
  attendees: [
    {
      bookedTicketIdentifier: '1',
      name: 'Mr Frank Smith',
      attendeeCategoryIdentifier: '1',
      bookedDays: [],
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '2',
      name: 'Mr John Smith',
      attendeeCategoryIdentifier: '1',
      bookedDays: [],
      bookedSessions: [],
    },
  ],
}

export const greaterCapacity = {
  group: {
    limited: greaterCapacityTestData,
  },
}
