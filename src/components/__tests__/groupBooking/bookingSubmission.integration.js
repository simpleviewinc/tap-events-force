import '@testing-library/jest-dom'
import { waitFor } from 'testUtils'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import { initModal, submitBooking, selectAttendeeCheckbox } from './testHelpers'
import {
  mixedListMock,
  mockMixedSession,
  teresa,
  frank,
  samantha,
} from './mocks'
// import { prettyDOM } from 'testUtils'

const mockOnlyBookingSession = {
  ...mockMixedSession,
  name: 'Only booking',
  capacity: {
    isUnlimited: false,
    remainingPlaces: 1,
    isWaitingListAvailable: false,
  },
}

const onlyBookingMock = {
  ...testData,
  sessions: [mockOnlyBookingSession],
  attendees: [ samantha, teresa ],
}

describe('Group Booking Modal - Integration - Booking Submission', () => {
  it('should fire the onSessionWaitinglistRequest callback upon waiting-list-only submission', async () => {
    const {
      onSessionBookingRequest,
      onSessionWaitingListRequest,
    } = await initModal(mixedListMock)

    // frank is unselected at start
    selectAttendeeCheckbox(frank.name)
    submitBooking()

    await waitFor(() =>
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(1)
    )
    await waitFor(() =>
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(0)
    )
  })

  it('should fire the onSessionBookingRequest callback upon booking-list-only submission', async () => {
    const {
      onSessionBookingRequest,
      onSessionWaitingListRequest,
    } = await initModal(onlyBookingMock)

    // teresa is unselected at start
    selectAttendeeCheckbox(teresa.name)
    submitBooking()

    await waitFor(() =>
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(0)
    )
    await waitFor(() =>
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(1)
    )
  })

  it('should fire both callbacks when submitting both lists as modified', async () => {
    const {
      onSessionBookingRequest,
      onSessionWaitingListRequest,
    } = await initModal({
      ...testData,
      sessions: [mockMixedSession],
      attendees: [ samantha, teresa ],
    })

    selectAttendeeCheckbox(samantha.name)
    selectAttendeeCheckbox(teresa.name)
    submitBooking()

    await waitFor(() =>
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(1)
    )
    await waitFor(() =>
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(1)
    )
  })
})
