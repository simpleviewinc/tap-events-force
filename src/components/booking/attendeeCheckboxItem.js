import React, { useMemo } from 'react'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { Text, View, Button } from '@keg-hub/keg-components'
import { isEmpty, set } from '@keg-hub/jsutils'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { isMobileSize } from 'SVUtils/theme/isMobileSize'
import { useTheme } from '@keg-hub/re-theme'

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
    isWaiting = false,
    enableCheck = true,
    disabled = false,
    checked = false,
  } = props

  const isUnnamed = !name || isEmpty(name)
  const text = isUnnamed ? 'Unnamed' : name

  name?.includes('Pepe') && console.log('pepe is waiting', isWaiting)

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
    <CheckboxGroup.Item
      id={id}
      styles={styles}
      text={text}
      RightComponent={
        isWaiting &&
        (props => (
          <WaitingItem
            name={text}
            {...props}
            style={props?.style}
            textStyle={styles?.content?.right}
          />
        ))
      }
      type={isWaiting ? 'alternate' : 'primary'}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
      checked={checked}
    />
  )
}

/**
 * When a user is on the waiting list, we need to display a waiting visual right of the text
 * @param {*} props
 */
const WaitingItem = props => {
  const { name, style, textStyle, onPress } = props
  const waitingStyles = useStylesMemo('attendeeCheckboxItem.waitingItem', style)
  const isMobile = isMobileSize(useTheme())

  return (
    <View style={waitingStyles?.main}>
      <View style={waitingStyles?.textWrapper}>
        <Text
          numberOfLines={1}
          style={[ waitingStyles?.text, textStyle ]}
          onPress={onPress}
        >
          { name }
        </Text>
        { isMobile && <Text style={waitingStyles?.waitText}>(waiting)</Text> }
      </View>
      { !isMobile && (
        <Button
          styles={waitingStyles?.button}
          themePath='button.outline.default'
        >
          On waiting list
        </Button>
      ) }
    </View>
  )
}
