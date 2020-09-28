import { isAttendeeRestricted } from '../isAttendeeRestricted'
describe('isAttendeeRestricted', () => {
  it('should return true if attendee cannot be booked', () => {
    const attendee = {
      attendeeCategoryIdentifier: '1',
    }

    const session = {
      restrictToAttendeeCategories: ['2'],
    }

    expect(isAttendeeRestricted(attendee, session)).toEqual(true)
  })

  it('should return false if the attendee category is included in the restricted categories', () => {
    const attendee = {
      attendeeCategoryIdentifier: '2',
    }

    const session = {
      restrictToAttendeeCategories: ['2'],
    }

    expect(isAttendeeRestricted(attendee, session)).toEqual(false)
  })

  it('should return false if there are no restricted categories', () => {
    const attendee = {
      attendeeCategoryIdentifier: '2',
    }

    const session = {
      restrictToAttendeeCategories: [],
    }

    expect(isAttendeeRestricted(attendee, session)).toEqual(false)
  })
})
