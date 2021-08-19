import React, { useMemo } from 'react'
import { EvfCheckbox } from 'SVComponents/checkbox/evfCheckbox'
import { isEmpty, set } from '@keg-hub/jsutils'
import { WaitingItem } from './waitingItem'
import { Label } from 'SVComponents/form/label'

/**
 * Label text for the attendee checkbox
 * @param {boolean} props.waiting - true if attendee is on waiting list
 * @param {string} props.text - label string
 * @param {string} props.htmlFor - the "for" attribute for the underlying label element
 * @param {string} props.textClassName - class name for the label text
 * @param {Object} props.textStyle - styles for the label text
 * @param {Object} props.style - styles for any wrapping content around the label
 * @param {Object} props.* - remaining props are passed directly to the element
 */
const CheckboxLabel = ({
  waiting,
  text,
  htmlFor,
  textClassName,
  textStyle,
  style,
  ...rest
}) => {
  const merged = useMemo(() => ({ ...style, ...textStyle }), [ style, textStyle ])
  return waiting ? (
    <WaitingItem
      {...rest}
      style={style}
      labelFor={htmlFor}
      name={text}
      textClassName={textClassName}
      textStyle={textStyle}
    />
  ) : (
    <Label
      {...rest}
      htmlFor={htmlFor}
      className={textClassName}
      style={merged}
    >
      { text }
    </Label>
  )
}

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
      styles={styles}
      rightClassName={textClassName}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
      checked={checked}
      RightComponent={props => (
        <CheckboxLabel
          htmlFor={checkboxId}
          text={text}
          textClassName={textClassName}
          textStyle={textStyle}
          waiting={isWaiting}
          {...props}
        />
      )}
    />
  )
}
