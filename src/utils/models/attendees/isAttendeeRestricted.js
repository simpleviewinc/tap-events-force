import { toBool } from '@keg-hub/jsutils'

/**
 * @param {import('SVModels/attendee').Attendee} attendee - attendee to check
 * @param {import('SVModels/session').Session} session - session the attendee may or may not be restricted from booking
 * @returns { boolean } - true if the attendee cannot be booked for this session
 */
export const isAttendeeRestricted = (attendee, session) => {
  const { attendeeCategoryIdentifier: categoryId } = attendee
  const restrictedCategories = session.restrictToAttendeeCategories
  return toBool(
    restrictedCategories.length && !restrictedCategories.includes(categoryId)
  )
}
