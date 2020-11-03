import { bookRequestCompleted } from '../bookRequestCompleted'

describe('bookRequestCompleted', () => {
  it('should return true if the incoming attendees matches the pending list', () => {
    const pendingList = ['1']
    const sessionId = '5'
    const incomingAttendees = [
      {
        bookedTicketIdentifier: '1',
        bookedSessions: [sessionId],
      },
    ]
    expect(
      bookRequestCompleted(sessionId, pendingList, incomingAttendees)
    ).toEqual(true)
  })

  it('should return true if the incoming attendees ids contains the pending list', () => {
    const pendingList = ['1']
    const sessionId = '5'
    const incomingAttendees = [
      {
        bookedTicketIdentifier: '1',
        bookedSessions: [sessionId],
      },
      // another attendee from a different request, but not in conflict
      {
        bookedTicketIdentifier: '2',
        bookedSessions: [sessionId],
      },
    ]
    expect(
      bookRequestCompleted(sessionId, pendingList, incomingAttendees)
    ).toEqual(true)
  })

  it('should return true if the pending list is not set', () => {
    expect(bookRequestCompleted('5', null, [])).toEqual(true)
  })

  it('should return false for a mismatch in new attendees and submitted ones', () => {
    const pendingList = ['1']
    const sessionId = '5'
    const incomingAttendees = [
      {
        bookedTicketIdentifier: '1',
        bookedSessions: ['3'],
      },
    ]
    expect(
      bookRequestCompleted(sessionId, pendingList, incomingAttendees)
    ).toEqual(false)
  })
})
