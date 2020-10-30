import { waitRequestCompleted } from '../waitRequestCompleted'

describe(waitRequestCompleted, () => {
  it('should return true if the incoming attendees matches the pending list', () => {
    const pendingList = ['1']
    const sessionId = '5'
    const incomingAttendees = [
      {
        bookedTicketIdentifier: '1',
        waitingListSessions: [sessionId],
      },
    ]
    expect(
      waitRequestCompleted(sessionId, pendingList, incomingAttendees)
    ).toEqual(true)
  })

  it('should return true if the pending list is not set', () => {
    expect(waitRequestCompleted('5', null, [])).toEqual(true)
  })

  it('should return false for a mismatch in new attendees and submitted ones', () => {
    const pendingList = ['1']
    const sessionId = '5'
    const incomingAttendees = [
      {
        bookedTicketIdentifier: '1',
        waitingListSessions: ['3'],
      },
    ]
    expect(
      waitRequestCompleted(sessionId, pendingList, incomingAttendees)
    ).toEqual(false)
  })
})
