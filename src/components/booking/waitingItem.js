import React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { useStyle, useTheme } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme/isMobileSize'
import { Label } from 'SVComponents/form/label'

/**
 * Simple box indicating attendee is on the waiting list
 * @param {Object} props
 * @param {string} props.text - text to show in waiting box
 * @param {Object} props.styles - theme styles (main and content)
 */
const WaitingBox = ({ text = 'On waiting list', styles }) => {
  return (
    <View style={styles?.main}>
      <Text style={styles?.content}>{ text }</Text>
    </View>
  )
}

/**
 * When a user is on the waiting list, we need to display a waiting visual right of the text
 * @param {Object} props
 * @param {string} props.name
 * @param {string?} props.textClassName - classname for name of attendee
 * @param {object} props.style
 * @param {object} props.textStyle
 * @param {Function?} props.onPress
 */
export const WaitingItem = props => {
  const { labelFor, name, style, textClassName, textStyle, onPress } = props
  const waitingStyles = useStyle('attendeeCheckboxItem.waitingItem', style)
  const isMobile = isMobileSize(useTheme())

  console.error('wow')

  return (
    <View style={waitingStyles?.main}>
      <View style={waitingStyles?.textWrapper}>
        <Label
          for={labelFor}
          className={textClassName}
          style={[ waitingStyles?.text, textStyle ]}
          onPress={onPress}
        >
          { name }
          { isMobile && ' (waiting)' }
        </Label>
      </View>
      { !isMobile && <WaitingBox styles={waitingStyles?.waitBox} /> }
    </View>
  )
}
