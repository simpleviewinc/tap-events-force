import '@testing-library/jest-dom'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import { initModal, getCheckbox } from './testHelpers'
import { attendees, john } from './mocks'
// import { prettyDOM } from 'testUtils'

const mockRestrictedSession = {
  allowBooking: true,
  identifier: '3',
  name: 'restricted',
  startDateTimeLocal: '2020-08-03 09:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  dayNumber: 2,
  restrictToAttendeeCategories: [ '1', '2' ],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 1,
    isWaitingListAvailable: true,
  },
  restrictToAttendeeCategories: ['179'],
}

const restrictedMock = {
  ...testData,
  id: '100',
  sessions: [mockRestrictedSession],
  attendees,
}

describe('Group Booking Modal - Integration - Restricted Attendees', () => {
  it("should only enable attendees on the session's restricted list", async () => {
    await initModal(restrictedMock)

    const johnCheckbox = getCheckbox(john.name)

    expect(johnCheckbox.disabled).toBe(false)

    const remainingCheckboxes = attendees
      .filter(att => att.name !== john.name)
      .map(att => getCheckbox(att.name))

    remainingCheckboxes.forEach(cb => {
      expect(cb.disabled).toBe(true)
    })
  })
})
