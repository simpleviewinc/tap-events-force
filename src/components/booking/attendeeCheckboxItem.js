import React, { useMemo } from 'react'
import { EvfCheckbox } from 'SVComponents/checkbox/evfCheckbox'
import { isEmpty, set } from '@keg-hub/jsutils'
import { WaitingItem } from './waitingItem'

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

  return (
    <EvfCheckbox
      id={id}
      styles={styles}
      text={text}
      RightComponent={
        isWaiting &&
        (props => (
          <WaitingItem
            labelFor={id}
            name={text}
            textClassName={textClassName}
            textStyle={styles?.content?.right}
            style={props.style}
            onPress={props.onPress}
          />
        ))
      }
      rightClassName={textClassName}
      type={isWaiting ? 'alternate' : 'primary'}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
      checked={checked}
    />
  )
}
