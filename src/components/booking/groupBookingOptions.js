import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { Values } from 'SVConstants'
import { GroupBookingSection } from './groupBookingSection'

const { BOOKING_CATEGORIES } = Values
const SECTION_NAMES = Object.values(BOOKING_CATEGORIES)

/**
 * Builds a map of booking categories to arrays of attendees who reside in that cateogory
 * @param {Array<Attendee>} attendees
 * @return {Object<string, Array<Attendee>>} map
 */
const buildAttendeesSectionMap = (attendees = []) => {
  const initSections = {
    [BOOKING_CATEGORIES.FAMILY]: [],
    [BOOKING_CATEGORIES.MEMBER]: [],
    [BOOKING_CATEGORIES.NON_MEMBER]: [],
  }

  return attendees.reduce((sections, nextAttendee) => {
    const categoryId = Math.min(
      SECTION_NAMES.length,
      parseInt(nextAttendee.attendeeCategoryIdentifier || '0')
    )
    const category = SECTION_NAMES[categoryId - 1]
    sections[category].push(nextAttendee)
    return sections
  }, initSections)
}

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = ({
  styles,
  attendees,
  onAttendeeSelected,
}) => {
  const theme = useTheme()
  const mainStyles = theme.get('groupBookingOptions.main')
  const viewStyles = useMemo(() => theme.join(mainStyles, styles?.main), [
    mainStyles,
    styles,
  ])
  const attendeesBySection = useMemo(
    () => buildAttendeesSectionMap(attendees),
    [attendees]
  )
  console.log(attendeesBySection)
  return (
    <View style={viewStyles}>
      { SECTION_NAMES.map(section => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={section}
          name={section}
          attendees={attendeesBySection[section]}
          onAttendeeSelected={onAttendeeSelected}
        />
      )) }
    </View>
  )
}
