import testData from '../testData'

export const selected = {
  single: {
    check: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECTED | mode - single | Check Icon',
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
            remainingPlaces: 10,
            isWaitingListAvailable: true,
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
    },
  },
  group: {
    digit: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECTED | mode - group | Digit Icon',
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
            remainingPlaces: 10,
            isWaitingListAvailable: true,
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
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: ['1'],
        },
      ],
    },
  },
}

export const selectedDisabled = {
  single: {
    stopped: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          // Custom identifier to flag that booking has been stopped for that session
          // Will need to update when Events-Force gives us the real value
          bookingStopped: true,
          identifier: '1',
          name:
            'state - SELECTED (disabled) | mode - single | Session Booking Stopped',
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
            remainingPlaces: 10,
            isWaitingListAvailable: true,
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
    },
  },
  group: {
    stopped: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          // Custom identifier to flag that booking has been stopped for that session
          // Will need to update when Events-Force gives us the real value
          bookingStopped: true,
          identifier: '1',
          name:
            'state - SELECTED (disabled) | mode - group | Session Booking Stopped',
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
            remainingPlaces: 10,
            isWaitingListAvailable: true,
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
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: ['1'],
        },
      ],
    },
  },
}
