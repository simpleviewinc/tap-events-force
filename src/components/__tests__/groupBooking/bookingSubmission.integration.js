import '@testing-library/jest-dom'
import { waitFor } from 'testUtils'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import { initModal, submitBooking, selectAttendeeCheckbox } from './testHelpers'
import { mockMixedSession, teresa, penelope, frank, samantha } from './mocks'
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

const mockOnlyWaitingSession = {
  ...mockMixedSession,
  name: 'Only booking',
  capacity: {
    isUnlimited: false,
    remainingPlaces: 0,
    isWaitingListAvailable: true,
  },
}

describe('Group Booking Modal - Integration - Booking Submission', () => {
  it('should fire the onSessionWaitingListRequest callback upon waiting-list-only submission', async () => {
    const {
      onSessionBookingRequest,
      onSessionWaitingListRequest,
    } = await initModal({
      ...testData,
      sessions: [mockOnlyWaitingSession],
      attendees: [ samantha, penelope, frank ],
    })

    // samantha is unselected at start
    selectAttendeeCheckbox(samantha.name)

    submitBooking()

    await waitFor(() => {
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(1)
      expect(onSessionWaitingListRequest).toHaveBeenCalledWith(
        mockMixedSession.identifier,
        expect.arrayContaining([
          samantha.bookedTicketIdentifier,
          penelope.bookedTicketIdentifier, // penelope is already on the wait list
        ])
      )
    })
    await waitFor(() => {
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(0)
    })
  })

  it('should fire the onSessionBookingRequest callback upon booking-list-only submission', async () => {
    const {
      onSessionBookingRequest,
      onSessionWaitingListRequest,
    } = await initModal({
      ...testData,
      sessions: [mockOnlyBookingSession],
      attendees: [ samantha, teresa ],
    })

    // teresa is unselected at start
    selectAttendeeCheckbox(teresa.name)
    submitBooking()

    await waitFor(() =>
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(0)
    )
    await waitFor(() => {
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(1)
      expect(
        onSessionBookingRequest
      ).toHaveBeenCalledWith(mockOnlyBookingSession.identifier, [
        teresa.bookedTicketIdentifier,
      ])
    })
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

    await waitFor(() => {
      expect(onSessionBookingRequest).toHaveBeenCalledTimes(1)
      expect(
        onSessionBookingRequest
      ).toHaveBeenCalledWith(mockMixedSession.identifier, [
        samantha.bookedTicketIdentifier,
      ])
    })

    await waitFor(() => {
      expect(onSessionWaitingListRequest).toHaveBeenCalledTimes(1)
      expect(
        onSessionWaitingListRequest
      ).toHaveBeenCalledWith(mockMixedSession.identifier, [
        teresa.bookedTicketIdentifier,
      ])
    })
  })
})
