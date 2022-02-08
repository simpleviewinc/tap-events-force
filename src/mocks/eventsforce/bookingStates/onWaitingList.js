import testData from '../testData'

export const onWaitingList = {
  single: {
    capacity: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - ON WAITING LIST | mode - single | No Capacity',
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
            remainingPlaces: 0,
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
          waitingListSessions: ['1'],
        },
      ],
    },
  },
  group: {
    override: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - ON WAITING LIST | mode - group | Override Selected',
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
            remainingPlaces: 0,
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
          waitingListSessions: ['1'],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: ['1'],
          waitingListSessions: [],
        },
      ],
    },
    capacity: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - ON WAITING LIST | mode - group | No Capacity',
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
            remainingPlaces: 0,
            isWaitingListAvailable: true,
            waitingListRemainingPlaces: 0,
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
          waitingListSessions: ['1'],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
          waitingListSessions: ['1'],
        },
        {
          bookedTicketIdentifier: '4',
          name: 'Ms. Teresa Waiting',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
          waitingListSessions: [],
        },
      ],
    },
  },
}
