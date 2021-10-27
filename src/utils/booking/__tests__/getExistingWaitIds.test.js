import { getExistingWaitIds } from '../getExistingWaitIds'

const mockSession = {
  identifier: '4',
}

const mockAttendees = [
  {
    bookedTicketIdentifier: 1,
    waitingListSessions: [ '5', '6' ],
  },
  {
    bookedTicketIdentifier: 2,
    waitingListSessions: [ '4', '5' ],
  },
  {
    bookedTicketIdentifier: 3,
    waitingListSessions: [],
  },
  {
    bookedTicketIdentifier: 4,
    waitingListSessions: ['5'],
  },
  {
    bookedTicketIdentifier: 5,
    waitingListSessions: ['4'],
  },
]

describe('getExistingWaitIds', () => {
  it('should return empty lists if args are falsy', () => {
    expect(getExistingWaitIds(null, [])).toEqual([])
    expect(getExistingWaitIds('4', false)).toEqual([])
    expect(getExistingWaitIds(undefined, false)).toEqual([])
  })

  it('should return the list of attendees on the waiting list', () => {
    const ids = getExistingWaitIds(mockSession.identifier, mockAttendees)
    expect(ids).toEqual(expect.arrayContaining([ 2, 5 ]))
  })
})
