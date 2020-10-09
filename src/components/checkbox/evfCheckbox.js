import React, { useCallback } from 'react'
import { Checkbox } from '@keg-hub/keg-components'
import { useStyle } from '@keg-hub/re-theme'
import { EVFIcons } from 'SVIcons'

/**
 * A wrapper around keg-components checkbox that conforms
 * to the events-force styling requirements
 * @param {Object} props
 * @param {string} props.type - either primary or alternate (e.g. booking list vs waiting list colors)
 * @param {boolean} props.enableCheck - whether or not the checkbox can be selected
 * @param {string} props.id - an optional identifier passed to the callback to identify this checkbox
 * @param {Function?} props.onChange - callback handling a click
 * @param {string | Component} props.RightComponent - text or component adjacent to checkbox
 * @param {string} props.text - if RightComponent isn't provided, EvfCheckbox displays a Text element with this string as its content, to the right of the checkbox
 * @param {Object} props.styles
 * @param {Object} props.styles.main - the root checkbox
 * @param {Object} props.styles.content
 * @param {Object} props.styles.content.right - style of rightward text
 */
export const EvfCheckbox = props => {
  const {
    close = true,
    enableCheck = true,
    id,
    onChange,
    RightComponent,
    styles,
    text,
    type = 'primary',
    ...rest
  } = props

  const handler = useCallback(event =>
    onChange?.({ event, text, id }, [ onChange, text, id ])
  )
  const checkboxStyles = useStyle(`checkboxGroup.item.${type}`, styles)

  return (
    <Checkbox
      styles={checkboxStyles}
      RightComponent={RightComponent || text}
      onChange={handler}
      close={close}
      disableCheck={!enableCheck}
      CheckIcon={EVFIcons.Checkmark}
      {...rest}
    />
  )
}
