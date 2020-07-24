import React from 'react'
import { View } from 'react-native'
import { Icon, Text } from 'SVComponents'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'
import moment from 'moment'

const formatTime = (time, military = true) =>
  moment(time).format(military ? 'H:mm' : 'h:mma')

/**
 *
 * @param {object} props
 * @param {string} props.start - ex: 2020-08-03 13:00:00
 * @param {string} props.end - ex: 2020-08-03 13:30:00
 * @param {string} props.military - true if time should be formatted in 24-hour time
 */
export const SessionTime = props => {
  const { start, end, military = true } = props
  const theme = useTheme()
  const clockStyle = theme.get('sessionTime.clockIcon')
  const textStyle = theme.get('sessionTime.timeText')
  return (
    <View style={theme.get('sessionTime.main')}>
      { /* wrap this in evfIcon so we can use custom ttf when it comes */ }
      <Icon
        styles={clockStyle.main}
        Element={Feather}
        name={'clock'}
        size={clockStyle.size}
      />
      <Text style={textStyle.main}>
        { `${formatTime(start, military)} - ${formatTime(end, military)}` }
      </Text>
    </View>
  )
}

SessionTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  military: PropTypes.bool,
}
