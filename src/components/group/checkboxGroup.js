import React, { useCallback } from 'react'
import { View, Text, Checkbox } from '@keg-hub/keg-components'
import { useStylesMemo } from 'SVHooks/useStylesMemo'

/**
 * @param {*} props
 */
export const GroupHeader = ({ title, style }) => {
  return <Text style={style}>{ title }</Text>
}

/**
 *
 * @param {*} props
 * @param {*} props.styles
 * @param {*} props.styles.main - the root checkbox
 * @param {*} props.styles.content
 * @param {*} props.styles.content.right - style of rightward text
 */
export const ItemCheckbox = ({ styles, text, id, onChange, close = true }) => {
  const handler = useCallback(() => onChange?.({ event, text, id }))
  const checkboxStyles = useStylesMemo('form.checkbox.close', styles)
  // const styles = useMemo(
  //   () => ({
  //     main: style,
  //     content: {
  //       right: textStyle
  //     }
  //   }),
  //   [ style, textStyle ]
  // )
  return (
    <Checkbox
      styles={checkboxStyles}
      RightComponent={text}
      onChange={handler}
      close={close}
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
