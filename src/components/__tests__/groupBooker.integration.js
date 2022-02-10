import React from 'react'
import { onWaitingList } from 'SVEvfMocks/eventsforce/bookingStates/onWaitingList'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen } from 'testUtils'

const {
  group: { capacity: waitingListCapacityTestData },
} = onWaitingList

import '@testing-library/jest-dom'

const openModal = () => {
  const btn = screen.getByRole('button', { name: /^ON WAITING LIST.*/ })
  expect(btn).toBeDefined()
  return userEvent.click(btn)
}

// const selectAttendee = attendeeName => {
//   const btn = screen.getByRole('button', { name: attendeeName })
//   expect(btn).toBeDefined()
//   return userEvent.click(btn)
// }

// const submitBooking = () => {
//   const btn = screen.getByRole('button', { name: 'BOOK SELECTED' })
//   return userEvent.click(btn)
// }

describe('Group Booking Modal Integration Test', () => {
  beforeEach(async () => {
    window.scroll = jest.fn()
    render(<Sessions sessionAgendaProps={waitingListCapacityTestData} />)
  })

  it('should open', async () => {
    openModal()
    expect(
      await screen.findByText('Select sessions for your group:')
    ).toBeInTheDocument()
  })
})
