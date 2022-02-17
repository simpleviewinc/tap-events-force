import '@testing-library/jest-dom'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import { initModal, getCheckbox } from './testHelpers'
// import { prettyDOM } from 'testUtils'

const session = {
  allowBooking: true,
  identifier: '1',
  name: 'Conflicted Session A',
  dayNumber: 1,
  startDateTimeLocal: '2020-08-03 09:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  presenterIdentifiers: [ '1', '2' ],
  labelIdentifiers: [ '1', '2' ],
  locationIdentifier: '1',
  restrictToAttendeeCategories: [],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 5,
  },
  price: {
    currency: 'USD',
    amount: 923.0,
  },
}

const sessionPerfectOverlap = {
  ...session,
  identifier: '2',
  name: `Perfect overlap session`,
}

const sessionPartialOverlapOver = {
  ...session,
  identifier: '2',
  name: `Partial overlap session over`,
  startDateTimeLocal: '2020-08-03 09:30:00',
  endDateTimeLocal: '2020-08-03 14:00:00',
}

const sessionPartialOverlapUnder = {
  ...session,
  identifier: '2',
  name: `Partial overlap session under`,
  startDateTimeLocal: '2020-08-03 09:30:00',
  endDateTimeLocal: '2020-08-03 14:00:00',
}

const attendees = {
  frank: {
    bookedTicketIdentifier: '1',
    name: 'Mr Frank Smith',
    attendeeCategoryIdentifier: '1',
    bookedDays: [1],
    bookedSessions: ['1'],
  },
  foo: {
    bookedTicketIdentifier: '3',
    name: 'Mr Foo Bar',
    attendeeCategoryIdentifier: '2',
    bookedDays: [1],
    bookedSessions: [],
  },
}

describe('Group Booking Modal - Integration - Time Blocked Attendees', () => {
  it('should disable attendees who are booked on perfect overlapping sessions', async () => {
    await initModal(
      {
        ...testData,
        sessions: [ session, sessionPerfectOverlap ],
        attendees: Object.values(attendees),
      },
      { buttonSelector: 'BUY $923' }
    )

    const frankBox = getCheckbox(attendees.frank.name)
    const fooBox = getCheckbox(attendees.foo.name)

    expect(frankBox.disabled).toBe(true)
    expect(fooBox.disabled).toBe(false)
  })

  it('should disable attendees who are booked on a partiallly-overlapping session, starting before', async () => {
    await initModal(
      {
        ...testData,
        sessions: [ session, sessionPartialOverlapUnder ],
        attendees: Object.values(attendees),
      },
      { buttonSelector: 'BUY $923' }
    )

    const frankBox = getCheckbox(attendees.frank.name)
    const fooBox = getCheckbox(attendees.foo.name)

    expect(frankBox.disabled).toBe(true)
    expect(fooBox.disabled).toBe(false)
  })

  it('should disable attendees who are booked on a partiallly-overlapping session, starting after', async () => {
    await initModal(
      {
        ...testData,
        sessions: [ session, sessionPartialOverlapOver ],
        attendees: Object.values(attendees),
      },
      { buttonSelector: 'BUY $923' }
    )

    const frankBox = getCheckbox(attendees.frank.name)
    const fooBox = getCheckbox(attendees.foo.name)

    expect(frankBox.disabled).toBe(true)
    expect(fooBox.disabled).toBe(false)
  })
})
