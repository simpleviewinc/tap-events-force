import React, { useMemo } from 'react'
import { Text } from '@keg-hub/keg-components'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { isEmpty } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const AttendeeCheckboxItem = ({
  id,
  name,
  itemStyles,
  sectionStyles,
  onAttendeeSelected,
}) => {
  const theme = useTheme()
  const isUnnamed = !name || isEmpty(name)
  const text = isUnnamed ? 'Unnamed' : name
  const styles = useMemo(
    () =>
      theme.join(
        itemStyles,
        isUnnamed && {
          content: { right: sectionStyles?.content?.unnamedItem?.main },
        }
      ),
    [isUnnamed]
  )
  console.log(styles)
  return (
    <CheckboxGroup.Item
      id={id}
      styles={styles}
      text={text}
      onChange={onAttendeeSelected}
    />
  )
}

export const GroupBookingSection = ({
  styles,
  name,
  attendees,
  onAttendeeSelected,
}) => {
  const sectionStyles = useStylesMemo('groupBookingSection', styles)
  const itemStyles = useStylesMemo(
    'form.checkbox.close',
    sectionStyles?.content?.item
  )
  return (
    <CheckboxGroup
      styles={sectionStyles}
      title={name}
    >
      { attendees.map(({ bookedTicketIdentifier, name }) => (
        <AttendeeCheckboxItem
          key={bookedTicketIdentifier}
          id={bookedTicketIdentifier}
          name={name}
          onAttendeeSelected={onAttendeeSelected}
          sectionStyles={sectionStyles}
          itemStyles={itemStyles}
        />
      )) }
      { !attendees.length && <Text>No attendees for this category</Text> }
    </CheckboxGroup>
  )
}
