import '@testing-library/jest-dom'
import { initModal, getCheckbox } from './testHelpers'
import { restrictedMock, attendees, john } from './mocks'
// import { prettyDOM } from 'testUtils'

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
