/**
 * @param {*} attendee
 * @param {*} session
 * @returns { boolean } - true if the attendee cannot be booked for this session
 */
export const isAttendeeRestricted = (attendee, session) => {
  const { attendeeCategoryIdentifier: categoryId } = attendee
  const restrictedCategories = session.restrictToAttendeeCategories
  return (
    restrictedCategories.length && !restrictedCategories.includes(categoryId)
  )
}
