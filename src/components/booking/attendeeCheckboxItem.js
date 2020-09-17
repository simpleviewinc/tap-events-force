import React, { useMemo } from 'react'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { isEmpty, get, set } from '@keg-hub/jsutils'

/**
 *
 * @param {*} param0
 */
export const AttendeeCheckboxItem = props => {
  const {
    id,
    name,
    sectionStyles,
    onAttendeeSelected,
    enableCheck = true,
    disabled = false,
  } = props

  const isUnnamed = !name || isEmpty(name)
  const text = isUnnamed ? 'Unnamed' : name
  const styles = useMemo(
    () =>
      isUnnamed &&
      set({}, 'content.right', get(sectionStyles, 'content.unnamedItem.main')),
    [ isUnnamed, sectionStyles ]
  )

  return (
    <CheckboxGroup.Item
      id={id}
      styles={styles}
      text={text}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
    />
  )
}
