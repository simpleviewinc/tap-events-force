import testData from '../testData'

const getMockSession = dayNumber => ({
  allowBooking: true,
  identifier: '1',
  name: `Session on Day ${dayNumber}, no restrictions`,
  summary: '',
  startDateTimeLocal: '2020-08-03 13:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  presenterIdentifiers: [],
  labelIdentifiers: ['3'],
  locationIdentifier: '2',
  liveVideoUrl: '',
  recordedVideoUrl: '',
  restrictToAttendeeCategories: [],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 100,
    isWaitingListAvailable: false,
  },
  dayNumber,
})

const getMockAttendee = (id, dayNumber, name) => ({
  bookedTicketIdentifier: id.toString(),
  attendeeCategoryIdentifier: '1',
  bookedDays: [dayNumber],
  bookedSessions: [],
  name: `${name} (day=${dayNumber})`,
})

export const dayNumber = {
  group: {
    matched: {
      ...testData,
      sessions: [getMockSession(1)],
      attendees: [
        getMockAttendee(1, 1, 'Frank Joseph'),
        getMockAttendee(2, 1, 'Charlie Adams'),
        getMockAttendee(3, 1, 'John Smith'),
      ],
    },
    partialMatch: {
      ...testData,
      sessions: [getMockSession(1)],
      attendees: [
        getMockAttendee(1, 1, 'Frank Joseph'),
        getMockAttendee(2, 3, 'Charlie Adams'),
        getMockAttendee(3, 4, 'John Smith'),
      ],
    },
    noMatch: {
      ...testData,
      sessions: [getMockSession(1)],
      attendees: [
        getMockAttendee(1, 2, 'Frank Joseph'),
        getMockAttendee(2, 3, 'Charlie Adams'),
        getMockAttendee(3, 4, 'John Smith'),
      ],
    },
  },
}
