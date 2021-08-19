import React, { useMemo } from 'react'
import { EvfCheckbox } from 'SVComponents/checkbox/evfCheckbox'
import { isEmpty, set } from '@keg-hub/jsutils'
import { AttendeeCheckboxLabel } from './attendeeCheckboxLabel'

/**
 * A wrapper around the checkbox component with styling and logic for
 * attendees in the group booking section component
 *
 * @param {Object} props
 * @param {string} props.id - id of attendee
 * @param {string} props.name - name of attendee
 * @param {string?} props.textClassName - optional class name for text
 * @param {Function?} props.onAttendeeSelected - callback called when an attendee is selected. Has form: attendeeId => { ... }
 * @param {Function?} props.isAttendeeDisabled - returns true if an attendee (by id) is disabled (cannot be checked nor unchecked)
 * @param {Object} props.sectionStyles - styles from the section containing this checkbox
 * @param {boolean} props.isWaiting - if true, attendee is on waiting list, so we should show waiting-list ui
 * @param {boolean} props.enableCheck - if true, attendee can be set to "checked"
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
    enableCheck = true,
    checked = false,
  } = props

  const disabled = isAttendeeDisabled?.(id)
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

  return (
    <EvfCheckbox
      id={checkboxId}
      type={isWaiting ? 'alternate' : 'primary'}
      styles={styles}
      checked={checked}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
      rightClassName={textClassName}
      RightComponent={props => (
        <AttendeeCheckboxLabel
          {...props}
          htmlFor={checkboxId}
          name={text}
          textClassName={textClassName}
          textStyle={textStyle}
          waiting={isWaiting}
        />
      )}
    />
  )
}
