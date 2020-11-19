import testData from '../testData'

const conflictTestData = {
  ...testData,
  sessions: [
    {
      allowBooking: true,
      // Custom identifier to flag that booking has been stopped for that session
      // Will need to update when Events-Force gives us the real value
      // bookingStopped: true,
      identifier: '1',
      name: 'state - TIME CONFLICT - LIMITED A',
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
        remainingPlaces: 5,
      },
      price: {
        currency: 'USD',
        amount: 923.0,
      },
    },
    {
      allowBooking: true,
      // Custom identifier to flag that booking has been stopped for that session
      // Will need to update when Events-Force gives us the real value
      // bookingStopped: true,
      identifier: '2',
      name: 'state - TIME CONFLICT - LIMITED B',
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
        remainingPlaces: 5,
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
      bookedDays: [1],
      bookedSessions: ['1'],
    },
  ],
}

export const conflict = {
  single: {
    limited: conflictTestData,
  },
  group: {
    limited: {
      ...conflictTestData,
      attendees: [
        ...conflictTestData.attendees,
        {
          bookedTicketIdentifier: '2',
          name: 'Mr James',
          attendeeCategoryIdentifier: '1',
          bookedDays: [],
          bookedSessions: [],
        },
      ],
    },
  },
}
