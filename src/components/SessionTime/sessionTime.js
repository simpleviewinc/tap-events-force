import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { EVFIcons } from '../../fonts'
import PropTypes from 'prop-types'
import { getTimeFromDate } from 'SVUtils/dateTime'

/**
 *
 * @param {object} props
 * @param {object} props.style - style object
 * @param {string} props.start - ex: 2020-08-03 13:00:00
 * @param {string} props.end - ex: 2020-08-03 13:30:00
 * @param {string} props.military - true if time should be formatted in 24-hour time
 */
export const SessionTime = props => {
  const { style = {}, start, end, military = true } = props
  const theme = useTheme()
  const clockStyle = theme.get('sessionTime.clockIcon')
  const textStyle = theme.get('sessionTime.timeText')
  const mainStyle = theme.join(theme.get('sessionTime.main'), style)

  return (
    <View style={mainStyle}>
      { /* wrap this in evfIcon so we can use custom ttf when it comes */ }
      <Icon
        styles={clockStyle.main}
        Element={EVFIcons}
        name={'clock'}
        size={clockStyle.size}
      />
      { /* <ClockIconSVG /> */ }
      <View style={textStyle.main}>
        <Text style={textStyle.content}>
          { `${getTimeFromDate(start, military)} - ${getTimeFromDate(
            end,
            military
          )}` }
        </Text>
      </View>
    </View>
  )
}

SessionTime.propTypes = {
  style: PropTypes.object,
  start: PropTypes.string,
  end: PropTypes.string,
  military: PropTypes.bool,
}
