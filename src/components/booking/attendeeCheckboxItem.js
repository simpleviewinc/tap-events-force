import React, { useMemo } from 'react'
import { EvfCheckbox } from 'SVComponents/checkbox/evfCheckbox'
import { Text, View } from '@keg-hub/keg-components'
import { isEmpty, set } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme/isMobileSize'
import { useTheme } from '@keg-hub/re-theme'

/**
 * A wrapper around the checkbox component with styling and logic for
 * attendees in the group booking section component
 *
 * @param {Object} props
 * @param {string} props.id - id of attendee
 * @param {string} props.name - name of attendee
 * @param {string?} props.textClassName - optional class name for text
 * @param {Function?} props.onAttendeeSelected - callback called when an attendee is selected. Has form: attendeeId => { ... }
 * @param {Object} props.sectionStyles - styles from the section containing this checkbox
 * @param {boolean} props.isWaiting - if true, attendee is on waiting list, so we should show waiting-list ui
 * @param {boolean} props.enableCheck - if true, attendee can be set to "checked"
 * @param {boolean} props.disabled - if true, attendee can be neither checked nor unchecked
 * @param {boolean} props.checked - initial checked value
 */
export const AttendeeCheckboxItem = props => {
  const {
    id,
    name,
    textClassName,
    sectionStyles,
    onAttendeeSelected,
    isWaiting = false,
    enableCheck = true,
    disabled = false,
    checked = false,
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
    [ isUnnamed, itemStyles, unnamedStyles ]
  )

  return (
    <EvfCheckbox
      id={id}
      styles={styles}
      text={text}
      RightComponent={
        isWaiting &&
        (props => (
          <WaitingItem
            name={text}
            textClassName={textClassName}
            textStyle={styles?.content?.right}
            style={props.style}
            onPress={props.onPress}
          />
        ))
      }
      rightClassName={textClassName}
      type={isWaiting ? 'alternate' : 'primary'}
      onChange={onAttendeeSelected}
      disabled={disabled}
      enableCheck={enableCheck}
      checked={checked}
    />
  )
}

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
const WaitingItem = props => {
  const { name, style, textClassName, textStyle, onPress } = props
  const waitingStyles = useStyle('attendeeCheckboxItem.waitingItem', style)
  const isMobile = isMobileSize(useTheme())

  return (
    <View style={waitingStyles?.main}>
      <View style={waitingStyles?.textWrapper}>
        <Text
          className={textClassName}
          style={[ waitingStyles?.text, textStyle ]}
          onPress={onPress}
        >
          { name }
          { isMobile && ' (waiting)' }
        </Text>
      </View>
      { !isMobile && <WaitingBox styles={waitingStyles?.waitBox} /> }
    </View>
  )
}
