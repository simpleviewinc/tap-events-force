import testData from '../testData'

export const waitingList = {
  single: {
    capacity: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - WAITING LIST | mode - single | No Capacity',
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
        },
      ],
    },
    noWaitingListLabel: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - No waiting list labels  | mode - single',
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
            isWaitingListAvailable: false,
          },
          price: {
            currency: 'USD',
            amount: 923.0,
          },
        },
        {
          allowBooking: true,
          identifier: '2',
          name: 'session at same time other session with presenters and labels',
          summary: '',
          dayNumber: 1,
          startDateTimeLocal: '2020-08-03 13:00:00',
          endDateTimeLocal: '2020-08-03 13:30:00',
          presenterIdentifiers: [],
          labelIdentifiers: ['3'],
          locationIdentifier: '2',
          liveVideoUrl: '',
          recordedVideoUrl: '',
          restrictToAttendeeCategories: [],
          capacity: {
            isUnlimited: true,
          },
        },
        {
          allowBooking: true,
          identifier: '3',
          name: 'Session on day 2 - limited capacity',
          summary: '',
          dayNumber: 2,
          startDateTimeLocal: '2020-08-04 09:00:00',
          endDateTimeLocal: '2020-08-04 09:30:00',
          presenterIdentifiers: [],
          labelIdentifiers: [ '3', '4' ],
          locationIdentifier: '2',
          liveVideoUrl: '',
          recordedVideoUrl: '',
          restrictToAttendeeCategories: [ '1', '2' ],
          capacity: {
            isUnlimited: false,
            remainingPlaces: 1,
            isWaitingListAvailable: false,
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
          waitingListSessions: [],
        },
      ],
    },
  },
  group: {
    capacity: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - WAITING LIST | mode - group | No Capacity',
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
    noWaitingListLabel: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'state - No waiting list labels  | mode - group',
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
            isWaitingListAvailable: false,
          },
          price: {
            currency: 'USD',
            amount: 923.0,
          },
        },
        {
          allowBooking: true,
          identifier: '2',
          name: 'session at same time other session with presenters and labels',
          summary: '',
          dayNumber: 1,
          startDateTimeLocal: '2020-08-03 13:00:00',
          endDateTimeLocal: '2020-08-03 13:30:00',
          presenterIdentifiers: [],
          labelIdentifiers: ['3'],
          locationIdentifier: '2',
          liveVideoUrl: '',
          recordedVideoUrl: '',
          restrictToAttendeeCategories: [],
          capacity: {
            isUnlimited: true,
          },
        },
        {
          allowBooking: true,
          identifier: '3',
          name: 'Session on day 2 - limited capacity',
          summary: '',
          dayNumber: 2,
          startDateTimeLocal: '2020-08-04 09:00:00',
          endDateTimeLocal: '2020-08-04 09:30:00',
          presenterIdentifiers: [],
          labelIdentifiers: [ '3', '4' ],
          locationIdentifier: '2',
          liveVideoUrl: '',
          recordedVideoUrl: '',
          restrictToAttendeeCategories: [ '1', '2' ],
          capacity: {
            isUnlimited: false,
            remainingPlaces: 1,
            isWaitingListAvailable: false,
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
          waitingListSessions: [],
        },
        {
          bookedTicketIdentifier: '3',
          name: 'Dr Lucy Jones',
          attendeeCategoryIdentifier: '1',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
          waitingListSessions: [],
        },
      ],
    },
    waitCapacity: {
      ...testData,
      sessions: [
        {
          allowBooking: true,
          identifier: '1',
          name: 'Session with waiting list capacity',
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
            waitingListRemainingPlaces: 1,
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
          attendeeCategoryIdentifier: '2',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
          waitingListSessions: [],
        },
        {
          bookedTicketIdentifier: '5',
          name: 'Samantha',
          attendeeCategoryIdentifier: '2',
          bookedDays: [ 1, 2 ],
          bookedSessions: [],
          waitingListSessions: [],
        },
        {
          bookedTicketIdentifier: '6',
          name: 'Oliver James',
          attendeeCategoryIdentifier: '2',
          bookedDays: [ 1, 2 ],
          bookedSessions: ['1'],
          waitingListSessions: [],
        },
      ],
    },
  },
}
