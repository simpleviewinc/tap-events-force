import '@testing-library/jest-dom'
import React from 'react'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen, within } from 'testUtils'
// import { prettyDOM } from 'testUtils'

// ------- MOCK SESSIONS -------
const mockMixedSession = {
  allowBooking: true,
  identifier: '3',
  name: 'Session',
  dayNumber: 2,
  restrictToAttendeeCategories: [ '1', '2' ],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 1,
    isWaitingListAvailable: true,
  },
}

const mockWaitingListSession = {
  ...mockMixedSession,
  identifier: '1',
  restrictToAttendeeCategories: [],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 0,
    isWaitingListAvailable: true,
    waitingListRemainingPlaces: 100,
  },
}

const mockFiniteWaitingListSession = {
  ...mockMixedSession,
  capacity: {
    ...mockMixedSession.capacity,
    waitingListRemainingPlaces: 1,
    remainingPlaces: 0,
  },
}

// ------- MOCK ATTENDEES -------
const frank = {
  bookedTicketIdentifier: '1',
  name: 'Mr Frank Smith',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [ '1', '3' ],
}

const lucy = {
  bookedTicketIdentifier: '3',
  name: 'Dr Lucy Jones',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [ '1', '3' ],
}

const teresa = {
  bookedTicketIdentifier: '10',
  name: 'Ms. Teresa Waiting',
  attendeeCategoryIdentifier: '2',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [],
}

const samantha = {
  bookedTicketIdentifier: '8',
  name: 'Samantha',
  attendeeCategoryIdentifier: '2',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: [],
}

const penelope = {
  bookedTicketIdentifier: '2',
  name: "Mrs Penelope O'Connor the Second",
  attendeeCategoryIdentifier: '2',
  bookedDays: [2],
  bookedSessions: [],
  waitingListSessions: [ '5', '3' ],
}

// ------- MOCK SESSIONS INPUT -------
const waitingListMock = {
  ...testData,
  sessions: [mockWaitingListSession],
  attendees: [ frank, lucy, teresa ],
}

const mixedListMock = {
  ...testData,
  sessions: [mockMixedSession],
  attendees: [
    frank,
    penelope,
    {
      ...lucy,
      bookedSessions: [ '1', '3', '5' ],
      waitingListSessions: [],
    },
  ],
}

const finiteWaitingListMock = {
  ...testData,
  sessions: [mockFiniteWaitingListSession],
  attendees: [ frank, lucy, penelope, teresa, samantha ],
}

// helper that renders the sessions component and opens the booking modal
const initModal = async data => {
  const results = await render(<Sessions sessionAgendaProps={data} />)

  const btn = screen.getByRole('button', { name: /^ON WAITING LIST.*/ })
  expect(btn).toBeDefined()
  userEvent.click(btn)

  return results
}

const getCheckbox = attendeeName => {
  const box = screen.getByRole('group', { name: attendeeName })
  return within(box).getByRole('checkbox')
}

// helper that select an attendee checkbox associated with the attendee name
const selectAttendeeCheckbox = attendeeName => {
  const checkbox = getCheckbox(attendeeName)
  return userEvent.click(checkbox)
}

// gets a reference to the group booker's booking button (submit)
const getBookingButton = () =>
  screen.getByRole('button', { name: 'BOOK SELECTED' })

describe('Group Booking Modal - Integration', () => {
  beforeEach(async () => {
    window.scroll = jest.fn()
  })

  it('should open', async () => {
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

  it('should decrement places-remaining when selecting an unselected attendee on a session with available places', async () => {
    await initModal(mixedListMock)

    await selectAttendeeCheckbox(frank.name)

    expect(screen.getByText('0 places remaining')).toBeInTheDocument()
  })

  it('should increment places-remaining when unselecting a selected attendee on a session with finite places', () => {
    initModal(mixedListMock)

    expect(screen.getByText('1 place remaining')).toBeInTheDocument()

    selectAttendeeCheckbox(lucy.name)

    expect(screen.getByText('2 places remaining')).toBeInTheDocument()
  })

  it('should limit waiting list additions for sessions with a wait-list capacity', async () => {
    initModal(finiteWaitingListMock)

    expect(screen.queryByText('Waiting list full')).not.toBeInTheDocument()

    selectAttendeeCheckbox(teresa.name)

    // verify that the limit text is displayed
    expect(screen.queryByText('0 places remaining')).not.toBeInTheDocument()
    expect(screen.getByText('Waiting list full')).toBeInTheDocument()

    // verify that you cannot select other attendees who are not already on the book or wait list
    expect(getCheckbox(samantha.name).disabled).toBe(true)

    // but attendees who ARE on the waitlist or book list should still be clickable
    expect(getCheckbox(frank.name).disabled).toBe(false)
    expect(getCheckbox(teresa.name).disabled).toBe(false)
  })
})
