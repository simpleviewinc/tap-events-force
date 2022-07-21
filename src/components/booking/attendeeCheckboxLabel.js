import React from 'react'
import { Text, View } from '@old-keg-hub/keg-components'
import { useStyle, useTheme } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme/isMobileSize'
import { Label } from 'SVComponents/form/label'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'

/**
 * Waiting box main wrapper
 */
const BoxMain = reStyle(View)(theme => ({
  minHeight: 31,
  backgroundColor: 'unset',
  cursor: 'default',
  borderRadius: 2,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.second,
  width: 100,
  height: 31,
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
}))

/**
 * Waiting box text content wrapper
 */
const BoxContent = reStyle(Text)(theme => ({
  color: theme.colors.second,
  fontSize: 12,
  fontWeight: 500,
}))

/**
 * Simple box indicating attendee is on the waiting list
 * @param {Object} props
 * @param {string} props.text - text to show in waiting box
 */
const WaitingBox = ({ text = 'On waiting list' }) => {
  return (
    <BoxMain>
      <BoxContent>{ text }</BoxContent>
    </BoxMain>
  )
}

/**
 * Wrapper for the label text
 */
const LabelWrapper = reStyle(View)(() => ({
  flexDirection: 'column',
  flexShrink: 1,
  paddingRight: 10,
}))

/**
 * When a user is on the waiting list, we need to display a waiting visual right of the text
 * @param {Object} props
 * @param {string} props.name
 * @param {string?} props.textClassName - classname for name of attendee
 * @param {object} props.style
 * @param {object} props.textStyle
 * @param {Function?} props.onPress
 * @param {boolean} props.waiting - true if attendee is waiting
 */
export const AttendeeCheckboxLabel = props => {
  const {
    htmlFor,
    name,
    style,
    textClassName,
    textStyle,
    onPress,
    waiting,
  } = props
  const waitingStyles = useStyle('attendeeCheckboxItem.waitingItem', style)
  const isMobile = isMobileSize(useTheme())

  return (
    <View style={waitingStyles?.main}>
      <LabelWrapper>
        <Label
          htmlFor={htmlFor}
          className={textClassName}
          role='button'
          style={textStyle}
          onPress={onPress}
        >
          { name }
          { isMobile && waiting && ' (waiting)' }
        </Label>
      </LabelWrapper>
      { !isMobile && waiting && <WaitingBox styles={waitingStyles?.waitBox} /> }
    </View>
  )
}

AttendeeCheckboxLabel.propTypes = {
  name: PropTypes.string,
  textClassName: PropTypes.string,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
  waiting: PropTypes.bool,
}
