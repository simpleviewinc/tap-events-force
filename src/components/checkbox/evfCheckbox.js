import React from 'react'
import { Checkbox } from '@keg-hub/keg-components'
import { useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'

const CheckIcon = reStyle(EVFIcons.Checkmark)(
  theme => ({ color: theme.colors.white }),
  theme => ({
    fill: theme.colors.white,
    color: theme.colors.white,
    width: 10,
    height: 14,
  })
)

/**
 * A wrapper around keg-components checkbox that conforms
 * to the events-force styling requirements
 * @param {Object} props
 * @param {boolean} props.close - if true, the text will appear close to the checkbox. True by default.
 * @param {string} props.type - either primary or alternate (e.g. booking list vs waiting list colors)
 * @param {boolean} props.enableCheck - whether or not the checkbox can be selected
 * @param {string} props.id - an optional DOM identifier
 * @param {Function?} props.onChange - callback handling a click, of form ({ event, text }) -> {}
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

  const checkboxStyles = useStyle(`checkboxGroup.item.${type}`, styles)

  return (
    <Checkbox
      id={id}
      aria-label={id}
      styles={checkboxStyles}
      RightComponent={RightComponent || text}
      onChange={onChange}
      close={close}
      disableCheck={!enableCheck}
      CheckIcon={CheckIcon}
      {...rest}
    />
  )
}
