import React, { useCallback, useMemo } from 'react'
import { View, Text, Checkbox } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'

/**
 *
 * @param {*} props
 */
export const GroupHeader = ({ title, style }) => {
  const theme = useTheme()
  const mainStyle = theme.get('checkboxGroup.main')
  const viewStyle = useMemo(() => theme.join(mainStyle, style), [
    mainStyle,
    style,
  ])
  return (
    <View style={viewStyle}>
      <Text>{ title }</Text>
    </View>
  )
}

export const ItemCheckbox = ({ text, id, onChange, close = true }) => {
  const handler = useCallback(() => onChange?.({ event, text, id }))
  return <Checkbox
    RightComponent={text}
    onChange={handler}
    close={close}
  />
}

/**
 *
 * @param {*} props
 */
export const CheckboxGroup = ({ title, children }) => {
  return (
    <View>
      <GroupHeader title={title} />
      { children }
    </View>
  )
}
CheckboxGroup.Item = ItemCheckbox
