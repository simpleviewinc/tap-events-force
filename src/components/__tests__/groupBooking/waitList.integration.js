import '@testing-library/jest-dom'
import { screen } from 'testUtils'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import {
  initModal,
  getBookingButton,
  selectAttendeeCheckbox,
  getCheckbox,
} from './testHelpers'
import { attendees, teresa, samantha, frank } from './mocks'

const mockWaitingListSession = {
  allowBooking: true,
  startDateTimeLocal: '2020-08-03 09:00:00',
  endDateTimeLocal: '2020-08-03 13:30:00',
  dayNumber: 2,
  name: 'Waiting List Session',
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
  ...mockWaitingListSession,
  name: 'Finite waiting list',
  capacity: {
    isUnlimited: false,
    isWaitingListAvailable: true,
    waitingListRemainingPlaces: 1,
    remainingPlaces: 0,
  },
}

const mockMixedCapacitiesSession = {
  ...mockWaitingListSession,
  name: 'Mixed finite capacities session',
  capacity: {
    isUnlimited: false,
    isWaitingListAvailable: true,
    waitingListRemainingPlaces: 1,
    remainingPlaces: 1,
  },
}

const mockUnlimitedSession = {
  ...mockWaitingListSession,
  name: 'Mixed finite capacities session',
  capacity: {
    isUnlimited: true,
    isWaitingListAvailable: true,
    waitingListRemainingPlaces: 1,
  },
}

const withFullMock = sessionMock => ({
  ...testData,
  sessions: [sessionMock],
  attendees,
})
const unlimitedMock = withFullMock(mockUnlimitedSession)
const waitingListMock = withFullMock(mockWaitingListSession)
const finiteWaitingListMock = withFullMock(mockFiniteWaitingListSession)

describe('Group Booking Modal - Integration - Wait List', () => {
  it('should limit waiting list additions for sessions with a wait-list capacity', async () => {
    initModal(finiteWaitingListMock)

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
    initModal(waitingListMock)
    expect(
      await screen.findByText('Select sessions for your group:')
    ).toBeInTheDocument()
  })

  it('should add a user to the waiting list when capacity is empty', async () => {
    initModal(waitingListMock)
    selectAttendeeCheckbox(teresa.name)

    expect(screen.getAllByRole('checkbox', { checked: true }).length).toEqual(3)

    expect(screen.getAllByText('On waiting list').length).toEqual(3)
  })

  it('should not decrement places-remaining below 0', async () => {
    initModal(waitingListMock)
    selectAttendeeCheckbox(teresa.name)

    expect(screen.getByText('0 places remaining')).toBeInTheDocument()
  })

  it('should disable the booking button until a booking modification is made', async () => {
    initModal(waitingListMock)

    const btn = getBookingButton()

    expect(btn.disabled).toBe(true)

    selectAttendeeCheckbox('Ms. Teresa Waiting')

    expect(btn.disabled).toBe(false)
  })

  // TODO: We need to implement a `resetStore` function that resets the redux store, which we would call before each test.
  // This test fails when called together with the other tests because the redux store is preserving state from previous tests.
  // So for now this test is skipped until we fix that (even though it passes in isolation!)
  it.skip('should decrement booking capacity before waiting capacity when both are available', async () => {
    const mixedCapacitiesMock = withFullMock(mockMixedCapacitiesSession)
    initModal(mixedCapacitiesMock)

    // console.log(prettyDOM())
    expect(screen.queryByText('Waiting list full')).not.toBeInTheDocument()
    expect(screen.queryByText('1 place remaining')).toBeInTheDocument()

    selectAttendeeCheckbox(teresa.name)

    // verify that the limit text is displayed
    expect(screen.queryByText('0 places remaining')).toBeInTheDocument()

    selectAttendeeCheckbox(samantha.name)

    expect(screen.queryByText('Waiting list full')).toBeInTheDocument()

    expect(getCheckbox(samantha.name).disabled).toBe(false)
    expect(getCheckbox(frank.name).disabled).toBe(false)
    expect(getCheckbox(teresa.name).disabled).toBe(false)
  })

  it('should never display the waiting list text for an unlimited session', () => {
    initModal(unlimitedMock)

    // select all attendees
    attendees.forEach(att => selectAttendeeCheckbox(att.name))

    expect(screen.queryByText('Waiting list full')).not.toBeInTheDocument()
    expect(screen.queryByText('remaining')).not.toBeInTheDocument()
  })
})
