import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen, within } from 'testUtils'

// ------- TEST HELPERS -------

// helper that renders the sessions component and opens the booking modal
export const initModal = (data, { otherProps, buttonSelector } = {}) => {
  const callbacks = {
    onSessionBookingRequest: jest.fn(),
    onSessionWaitingListRequest: jest.fn(),
  }

  const output = render(
    <Sessions
      sessionAgendaProps={data}
      {...callbacks}
      {...otherProps}
    />
  )

  const btn = screen.getByRole('button', {
    name: buttonSelector || /^ON WAITING LIST.*|^SELECT.*/,
  })
  expect(btn).toBeDefined()
  userEvent.click(btn)

  return { output, ...callbacks }
}

export const getCheckbox = attendeeName => {
  const box = screen.getByRole('group', { name: attendeeName })
  return within(box).getByRole('checkbox')
}

// helper that select an attendee checkbox associated with the attendee name
export const selectAttendeeCheckbox = attendeeName => {
  const checkbox = getCheckbox(attendeeName)
  return userEvent.click(checkbox)
}

// gets a reference to the group booker's booking button (submit)
export const getBookingButton = () =>
  screen.getByRole('button', { name: 'BOOK SELECTED' })

export const submitBooking = () => {
  const btn = getBookingButton()
  expect(btn.disabled).toBe(false)
  userEvent.click(btn)
}
