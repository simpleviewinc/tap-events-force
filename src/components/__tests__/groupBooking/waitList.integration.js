import '@testing-library/jest-dom'
import { screen } from 'testUtils'
import {
  initModal,
  getBookingButton,
  selectAttendeeCheckbox,
  getCheckbox,
} from './testHelpers'
import {
  finiteWaitingListMock,
  waitingListMock,
  teresa,
  samantha,
  frank,
} from './mocks'
// import { prettyDOM } from 'testUtils'

// ------- TESTS -------

describe('Group Booking Modal - Integration - Wait List', () => {
  it('should limit waiting list additions for sessions with a wait-list capacity', async () => {
    await initModal(finiteWaitingListMock, null)

    expect(screen.queryByText('Waiting list full')).not.toBeInTheDocument()

    selectAttendeeCheckbox(teresa.name)

    // verify that the limit text is displayed
    expect(screen.getByText('Waiting list full')).toBeInTheDocument()
    expect(screen.queryByText('0 places remaining')).not.toBeInTheDocument()

    // verify that you cannot select other attendees who are not already on the book or wait list
    expect(getCheckbox(samantha.name).disabled).toBe(true)

    // but attendees who ARE on the waitlist or book list should still be clickable
    expect(getCheckbox(frank.name).disabled).toBe(false)
    expect(getCheckbox(teresa.name).disabled).toBe(false)
  })

  it('should open with the header text', async () => {
    await initModal(waitingListMock)
    expect(
      await screen.findByText('Select sessions for your group:')
    ).toBeInTheDocument()
  })

  it('should add a user to the waiting list when capacity is empty', async () => {
    await initModal(waitingListMock)
    selectAttendeeCheckbox(teresa.name)

    expect(screen.getAllByRole('checkbox', { checked: true }).length).toEqual(3)

    expect(screen.getAllByText('On waiting list').length).toEqual(3)
  })

  it('should not decrement places-remaining below 0', async () => {
    await initModal(waitingListMock)
    selectAttendeeCheckbox(teresa.name)

    expect(screen.getByText('0 places remaining')).toBeInTheDocument()
  })

  it('should disable the booking button until a booking modification is made', async () => {
    await initModal(waitingListMock)

    const btn = getBookingButton()

    expect(btn.disabled).toBe(true)

    selectAttendeeCheckbox('Ms. Teresa Waiting')

    expect(btn.disabled).toBe(false)
  })
})
