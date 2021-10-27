import { getExistingBookIds } from '../getExistingBookIds'

const mockSession = {
  identifier: '4',
}

const mockAttendees = [
  {
    bookedTicketIdentifier: 1,
    bookedSessions: [ '5', '6' ],
  },
  {
    bookedTicketIdentifier: 2,
    bookedSessions: [ '4', '5' ],
  },
  {
    bookedTicketIdentifier: 3,
    bookedSessions: [],
  },
  {
    bookedTicketIdentifier: 4,
    bookedSessions: ['5'],
  },
  {
    bookedTicketIdentifier: 5,
    bookedSessions: ['4'],
  },
]

describe('getExistingBookIds', () => {
  it('should return empty lists if args are falsy', () => {
    expect(getExistingBookIds(null, [])).toEqual([])
    expect(getExistingBookIds('4', false)).toEqual([])
    expect(getExistingBookIds(undefined, false)).toEqual([])
  })

  it('should return the list of attendees on the booking list', () => {
    const ids = getExistingBookIds(mockSession.identifier, mockAttendees)
    expect(ids).toEqual(expect.arrayContaining([ 2, 5 ]))
  })
})
