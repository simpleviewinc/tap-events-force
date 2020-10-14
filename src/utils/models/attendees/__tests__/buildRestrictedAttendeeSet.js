import { buildRestrictedAttendeeSet } from '../buildRestrictedAttendeeSet'

const mockSession = {
  restrictToAttendeeCategories: [ '1', '2' ],
}

const mockEmptySession = {
  restrictToAttendeeCategories: [],
}

const mockAttendees = {
  pepe: {
    name: 'Pepe Silvia',
    bookedTicketIdentifier: 'foo',
    attendeeCategoryIdentifier: '2',
  },
  cricket: {
    name: 'Cricket',
    bookedTicketIdentifier: 'bar',
    attendeeCategoryIdentifier: '3',
  },
}

describe('buildRestrictedAttendeeSet', () => {
  it('should build the set to include attendees ineligible to book', () => {
    const set = buildRestrictedAttendeeSet(
      Object.values(mockAttendees),
      mockSession
    )
    // Pepe has an attendeeCategoryIdentifier in the sessions restrict-to list, so pepe is not in the set of
    // attendees restricted from the session
    expect(set.has(mockAttendees.pepe.bookedTicketIdentifier)).toEqual(false)

    // Cricket does NOT have an attendeeCategoryIdentifier in the sessions restrict-to list, so he is
    // included in the set
    expect(set.has(mockAttendees.cricket.bookedTicketIdentifier)).toEqual(true)
  })

  it("should return an empty set if the session's restricted list is empy", () => {
    const set = buildRestrictedAttendeeSet(
      Object.values(mockAttendees),
      mockEmptySession
    )

    // if the session's restrict-to list is empty, there are no limits on attendees booking the session,
    // so the set should be empty
    expect(set.size).toEqual(0)
  })
})
