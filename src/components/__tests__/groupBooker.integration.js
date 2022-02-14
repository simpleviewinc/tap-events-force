import '@testing-library/jest-dom'
import React from 'react'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen, within } from 'testUtils'

const mockMixedSession = {
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
  restrictToAttendeeCategories: [ '1', '2' ],
  capacity: {
    isUnlimited: false,
    remainingPlaces: 1,
    isWaitingListAvailable: true,
  },
}

// const mockFiniteWaitingListSession = {
//   ...mockMixedSession,
//   capacity: {
//     ...mockMixedSession.capacity,
//     waitingListRemainingPlaces: 1
//   }
// }

const mockWaitingListSession = {
  allowBooking: true,
  identifier: '1',
  name: 'Session w/ Waiting List',
  dayNumber: 1,
  startDateTimeLocal: '2020-08-03 09:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  presenterIdentifiers: [ '1', '2' ],
  labelIdentifiers: [ '1', '2' ],
  locationIdentifier: '1',
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
}

const frank = {
  bookedTicketIdentifier: '1',
  name: 'Mr Frank Smith',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: ['1'],
}

const lucy = {
  bookedTicketIdentifier: '3',
  name: 'Dr Lucy Jones',
  attendeeCategoryIdentifier: '1',
  bookedDays: [ 1, 2 ],
  bookedSessions: [],
  waitingListSessions: ['1'],
}

const teresa = {
  bookedTicketIdentifier: '10',
  name: 'Ms. Teresa Waiting',
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
  waitingListSessions: ['3'],
}

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

// helper that renders the sessions component and opens the booking modal
const initModal = async data => {
  const results = await render(<Sessions sessionAgendaProps={data} />)

  const btn = screen.getByRole('button', { name: /^ON WAITING LIST.*/ })
  expect(btn).toBeDefined()
  userEvent.click(btn)

  return results
}

// helper that select an attendee checkbox associated with the attendee name
const selectAttendeeCheckbox = attendeeName => {
  const box = screen.getByRole('group', { name: attendeeName })
  const checkbox = within(box).getByRole('checkbox')
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

    selectAttendeeCheckbox('Ms. Teresa Waiting')

    expect(screen.getAllByRole('checkbox', { checked: true }).length).toEqual(3)

    expect(screen.getAllByText('On waiting list').length).toEqual(3)
  })

  it('should not decrement places-remaining below 0', async () => {
    await initModal(waitingListMock)

    selectAttendeeCheckbox('Ms. Teresa Waiting')

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

    await selectAttendeeCheckbox('Mr Frank Smith')

    expect(screen.getByText('0 places remaining')).toBeInTheDocument()
  })

  it('should increment places-remaining when unselecting a selected attendee on a session with finite places', () => {
    initModal(mixedListMock)

    expect(screen.getByText('1 place remaining')).toBeInTheDocument()

    selectAttendeeCheckbox('Dr Lucy Jones')

    expect(screen.getByText('2 places remaining')).toBeInTheDocument()
  })
})
