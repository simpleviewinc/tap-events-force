import React, { useCallback } from 'react'
import { View, Text, Checkbox } from '@keg-hub/keg-components'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { EVFIcons } from 'SVIcons'

/**
 * @param {*} props
 */
export const GroupHeader = ({ title, ...rest }) => {
  return <Text {...rest}>{ title }</Text>
}

/**
 *
 * @param {*} props
 * @param {*} props.type - either primary or alternate
 * @param {*} props.styles
 * @param {*} props.styles.main - the root checkbox
 * @param {*} props.styles.content
 * @param {*} props.styles.content.right - style of rightward text
 */
export const ItemCheckbox = props => {
  const {
    styles,
    text,
    RightComponent,
    id,
    onChange,
    close = true,
    enableCheck = true,
    type = 'primary',
    ...rest
  } = props

  const handler = useCallback(event =>
    onChange?.({ event, text, id }, [ onChange, text, id ])
  )
  const checkboxStyles = useStylesMemo(`checkboxGroup.item.${type}`, styles)

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

/**
 *
 * @param {*} props
 * @param {*} props.styles
 * @param {*} props.styles.main
 * @param {*} props.styles.content.header
 */
export const CheckboxGroup = ({ title, children, styles }) => {
  const groupStyles = useStylesMemo('checkboxGroup', styles)
  return (
    <View style={groupStyles?.main}>
      <GroupHeader
        style={groupStyles?.content?.header}
        title={title}
      />
      { children }
    </View>
  )
}
CheckboxGroup.Item = ItemCheckbox
