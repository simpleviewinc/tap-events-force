import React, { useMemo } from 'react'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { isEmpty, set } from '@keg-hub/jsutils'

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

  const unnamedStyles = sectionStyles?.content?.unnamedItem?.main
  const itemStyles = sectionStyles?.content?.item?.main

  const styles = useMemo(
    () =>
      set({}, 'content.right', {
        ...itemStyles,
        ...(isUnnamed ? unnamedStyles : {}),
      }),
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
