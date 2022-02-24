import '@testing-library/jest-dom'
import { screen } from 'testUtils'
import { initModal, selectAttendeeCheckbox } from './testHelpers'
import { mixedListMock, samantha, lucy } from './mocks'
// import { prettyDOM } from 'testUtils'

describe('Group Booking Modal - Integration - Mixed List', () => {
  beforeEach(() => initModal(mixedListMock))

  it('should decrement places-remaining when selecting an unselected attendee on a session with available places', async () => {
    selectAttendeeCheckbox(samantha.name)

    expect(screen.getByText('0 places remaining')).toBeInTheDocument()
  })

  it('should increment places-remaining when unselecting a selected attendee on a session with finite places', () => {
    expect(screen.getByText('1 place remaining')).toBeInTheDocument()

    selectAttendeeCheckbox(lucy.name)

    expect(screen.getByText('2 places remaining')).toBeInTheDocument()
  })
})
