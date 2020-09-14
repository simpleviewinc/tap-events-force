import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { Values } from 'SVConstants'
import { GroupBookingSection } from './groupBookingSection'

const { BOOKING_CATEGORIES } = Values
const SECTION_NAMES = Object.values(BOOKING_CATEGORIES)

/**
 * Returns the section name for the attendee
 * @param {Attendee} attendee
 * @returns {string} value from `SECTION_NAMES`
 */
const getSectionForAttendee = attendee => {
  const { attendeeCategoryIdentifier: categoryId } = attendee
  const categoryIdNum = parseInt(categoryId || '0')
  return SECTION_NAMES[categoryIdNum - 1]
}

/**
 * @param {*} attendee
 * @param {*} session
 * @returns { boolean } - true if the attendee cannot be booked for this session
 */
const isAttendeeRestricted = (attendee, session) => {
  const { attendeeCategoryIdentifier: categoryId } = attendee
  const restrictedCategories = session.restrictToAttendeeCategories
  return (
    restrictedCategories.length && !restrictedCategories.includes(categoryId)
  )
}

/**
 * Helper for `buildAttendeesSectionMap` that updates the sections object with the next attendee object
 * @param {*} sections - will be modified with nextAttendee
 * @param {Set<string>} sections.restrictedAttendeeIds - will be modified with nextAttendee
 * @param {Array<string>} sections[*] - categories
 * @param {*} nextAttendee - attendee object
 */
const sortAttendeeIntoSections = (sections, nextAttendee) => {
  // add the attendee to its associated cateogry
  const category = getSectionForAttendee(nextAttendee)
  category
    ? sections[category].push(nextAttendee)
    : console.error(
      `Could not find a valid category for attendee. \n: Attendee: ${nextAttendee} \n Expected Categories: ${BOOKING_CATEGORIES}`
    )

  // check if the attendee is restricted from booking. If so, add it to the restricted list
  isAttendeeRestricted(nextAttendee, sections.session) &&
    sections.restrictedAttendeeIds.add(nextAttendee.bookedTicketIdentifier)

  return sections
}

/**
 * Builds a map of booking categories to arrays of attendees who reside in that cateogory
 * @param {Array<Attendee>} attendees
 * @return {Object} map with structure of `initSections`
 */
const buildAttendeesSectionMap = (session, attendees = []) => {
  const initSections = {
    // session for this map
    session,

    // booking categories mapped to attendees for those categories
    [BOOKING_CATEGORIES.FAMILY]: [],
    [BOOKING_CATEGORIES.MEMBER]: [],
    [BOOKING_CATEGORIES.NON_MEMBER]: [],

    // identifiers of attendees that cannot be booked for this session, and should be greyed out
    restrictedAttendeeIds: new Set(),
  }

  // TODO: need to update this with different data once EVF update the interface
  // attendeeCategoryIdentifier will not be what we use to organize them
  return attendees.reduce(sortAttendeeIntoSections, initSections)
}

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = props => {
  const {
    styles,
    attendees,
    session,
    onAttendeeSelected,
    enableCheck = true,
  } = props

  const theme = useTheme()
  const mainStyles = theme.get('groupBookingOptions.main')
  const viewStyles = useMemo(() => theme.join(mainStyles, styles?.main), [
    mainStyles,
    styles,
  ])

  const attendeesBySection = useMemo(
    () => buildAttendeesSectionMap(session, attendees),
    [attendees]
  )

  return (
    <View style={viewStyles}>
      { SECTION_NAMES.map(section => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={section}
          name={section}
          attendees={attendeesBySection[section]}
          restrictedAttendeeIds={attendeesBySection.restrictedAttendeeIds}
          onAttendeeSelected={onAttendeeSelected}
          enableCheck={enableCheck}
        />
      )) }
    </View>
  )
}
