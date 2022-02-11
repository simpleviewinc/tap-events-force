import '@testing-library/jest-dom'
import React from 'react'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen, within } from 'testUtils'

const mockSession = {
  allowBooking: true,
  identifier: '1',
  name: 'Session w/ Waiting List',
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
}

const waitingListData = {
  ...testData,
  sessions: [mockSession],
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
      bookedTicketIdentifier: '10',
      name: 'Ms. Teresa Waiting',
      attendeeCategoryIdentifier: '2',
      bookedDays: [ 1, 2 ],
      bookedSessions: [],
      waitingListSessions: [],
    },
  ],
}

const openModal = () => {
  const btn = screen.getByRole('button', { name: /^ON WAITING LIST.*/ })
  expect(btn).toBeDefined()
  return userEvent.click(btn)
}

const selectAttendeeCheckbox = attendeeName => {
  const box = screen.getByRole('group', { name: attendeeName })
  const checkbox = within(box).getByRole('checkbox')
  return userEvent.click(checkbox)
}

// const submitBooking = () => {
//   const btn = screen.getByRole('button', { name: 'BOOK SELECTED' })
//   return userEvent.click(btn)
// }

describe('Group Booking Modal - Integration', () => {
  beforeEach(async () => {
    window.scroll = jest.fn()
    render(<Sessions sessionAgendaProps={waitingListData} />)
  })

  it('should open', async () => {
    openModal()
    expect(
      await screen.findByText('Select sessions for your group:')
    ).toBeInTheDocument()
  })

  it('should add a user to the waiting list when capacity is empty', () => {
    openModal()

    selectAttendeeCheckbox('Ms. Teresa Waiting')

    expect(screen.getAllByRole('checkbox', { checked: true }).length).toEqual(3)

    expect(screen.getAllByText('On waiting list').length).toEqual(3)
  })
})
