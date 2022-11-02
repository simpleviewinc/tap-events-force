import React, { useMemo, useContext } from 'react'
import { View } from '@old-keg-hub/keg-components'
import { isEmpty, set } from '@keg-hub/jsutils'
import { AttendeeCheckboxLabel } from './attendeeCheckboxLabel'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

/**
 * A wrapper around the checkbox component with styling and logic for
 * attendees in the group booking section component
 *
 * @param {Object} props
 * @param {string} props.id - id of attendee
 * @param {string} props.name - name of attendee
 * @param {string?} props.textClassName - optional class name for text
 * @param {Function?} props.onAttendeeSelected - callback called when an attendee is selected. Has form: attendeeId => { ... }
 * @param {boolean} props.isAttendeeDisabled - true if an attendee is disabled (cannot be checked nor unchecked)
 * @param {Object} props.sectionStyles - styles from the section containing this checkbox
 * @param {boolean} props.isWaiting - if true, attendee is on waiting list, so we should show waiting-list ui
 * @param {boolean} props.checked - initial checked value
 */
export const AttendeeCheckboxItem = props => {
  const {
    id,
    name,
    textClassName,
    sectionStyles,
    onAttendeeSelected,
    isAttendeeDisabled,
    isWaiting = false,
    checked = false,
  } = props

  const isUnnamed = !name || isEmpty(name)
  const text = isUnnamed ? 'Unnamed' : name
  const checkboxId = `attendee-checkbox-${id}`

  const unnamedStyles = sectionStyles?.content?.unnamedItem?.main
  const itemStyles = sectionStyles?.content?.item?.main
  const styles = useMemo(
    () =>
      set({}, 'content.right', {
        ...itemStyles,
        ...(isUnnamed ? unnamedStyles : {}),
      }),
    [ isUnnamed, itemStyles, unnamedStyles ]
  )

  const textStyle = styles?.content?.right

  const onCheckboxChange = event => onAttendeeSelected?.(id, { event })

  const { CheckboxComponent } = useContext(ComponentsContext)

  return (
    <View
      accessibilityRole='group'
      accessibilityLabel={name}
    >
      <CheckboxComponent
        id={checkboxId}
        isWaitingList={isWaiting}
        checked={checked}
        onChange={onCheckboxChange}
        disabled={isAttendeeDisabled}
      />
      <AttendeeCheckboxLabel
        {...props}
        htmlFor={checkboxId}
        name={text}
        textClassName={textClassName}
        textStyle={textStyle}
        waiting={isWaiting}
      />
    </View>
  )
}
