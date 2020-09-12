import React, { useMemo } from 'react'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { isEmpty, set } from '@keg-hub/jsutils'
import { useStylesMemo } from 'SVHooks/useStylesMemo'

const empty = {}

/**
 *
 * @param {*} param0
 */
export const AttendeeCheckboxItem = props => {
  const {
    id,
    name,
    itemStyles,
    sectionStyles,
    onAttendeeSelected,
    disabled = false,
  } = props

  const type = disabled ? 'disabled' : 'default'

  const isUnnamed = !name || isEmpty(name)
  const text = isUnnamed ? 'Unnamed' : name
  const unnamedStyles = useMemo(
    () =>
      isUnnamed &&
      set(empty, 'content.right', sectionStyles?.content?.unnamedItem?.main),
    [ isUnnamed, sectionStyles ]
  )
  const styles = useStylesMemo(
    `attendeeCheckboxItem.${type}`,
    itemStyles,
    unnamedStyles
  )

  return (
    <CheckboxGroup.Item
      id={id}
      styles={styles}
      text={text}
      onChange={onAttendeeSelected}
      disabled={disabled}
    />
  )
}
