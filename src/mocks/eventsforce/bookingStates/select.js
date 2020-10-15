import testData from '../testData'

export const select = {
  single: {
    unlimited: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECT | mode - single | Capacity - unlimited',
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
            isUnlimited: true,
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
          bookedSessions: [],
        },
      ],
    },
    limited: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECT | mode - single | Capacity - unlimited',
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
          bookedSessions: [],
        },
      ],
    },
  },
  group: {
    unlimited: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECT | mode - group | Capacity - unlimited',
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
            isUnlimited: true,
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
          bookedSessions: [],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
        },
      ],
    },
    limited: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECT | mode - group | Capacity - unlimited',
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
          bookedSessions: [],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
        },
      ],
    },
  },
}

export const selectDisabled = {
  single: {
    conflict: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - SELECT (disabled) | mode - single | Time Conflict',
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
        {
          allowBooking: true,
          identifier: '2',
          name: 'Other Booked Session - Time Conflict',
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
          bookedSessions: [2],
        },
      ],
    },
    category: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name:
            'state - SELECT (disabled) | mode - single | Restricted Category',
          dayNumber: 1,
          startDateTimeLocal: '2020-08-03 09:00:00',
          endDateTimeLocal: '2020-08-03 13:30:00',
          presenterIdentifiers: [ '1', '2' ],
          labelIdentifiers: [ '1', '2' ],
          locationIdentifier: '1',
          liveVideoUrl: 'https://us02web.zoom.us/j/1234',
          recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
          restrictToAttendeeCategories: [2],
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
          bookedSessions: [],
        },
      ],
    },
  },
  group: {
    category: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name:
            'state - SELECT (disabled) | mode - group | Restricted Category',
          dayNumber: 1,
          startDateTimeLocal: '2020-08-03 09:00:00',
          endDateTimeLocal: '2020-08-03 13:30:00',
          presenterIdentifiers: [ '1', '2' ],
          labelIdentifiers: [ '1', '2' ],
          locationIdentifier: '1',
          liveVideoUrl: 'https://us02web.zoom.us/j/1234',
          recordedVideoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
          restrictToAttendeeCategories: [2],
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
          bookedSessions: [],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
        },
      ],
    },
  },
}
