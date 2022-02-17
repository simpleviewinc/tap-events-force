import '@testing-library/jest-dom'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import { initModal, getCheckbox } from './testHelpers'
// import { prettyDOM } from 'testUtils'

const sessionA = {
  allowBooking: true,
  identifier: '1',
  name: 'Conflicted Session A',
  dayNumber: 1,
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
    bookedDays: [2],
    bookedSessions: [],
  },
}

const registeredTestData = {
  ...testData,
  sessions: [sessionA],
  attendees: Object.values(attendees),
}

describe('Group Booking Modal - Integration - Registered Attendees', () => {
  it('should disable attendees who are not registered for a session day', async () => {
    await initModal(registeredTestData)

    const frankBox = getCheckbox(attendees.frank.name)
    const fooBox = getCheckbox(attendees.foo.name)

    expect(frankBox.disabled).toBe(false)
    expect(fooBox.disabled).toBe(true)
  })
})
