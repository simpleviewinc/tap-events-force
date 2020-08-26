import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from '@svkeg/keg-components'
import { useTheme } from '@svkeg/re-theme'
import { getTimeFromDate } from 'SVUtils/dateTime'
import { EVFIcons } from 'SVIcons'

/**
 * SessionTime
 * @param {object} props
 * @param {object} props.style - style object
 * @param {string} props.start - ex: 2020-08-03 13:00:00
 * @param {string} props.end - ex: 2020-08-03 13:30:00
 * @param {string} props.military - true if time should be formatted in 24-hour time
 */
export const SessionTime = props => {
  const { style = {}, start, end, military = true } = props
  const theme = useTheme()
  const mainStyle = theme.join(theme.get('sessionTime.main'), style)
  const clockStyle = theme.get('sessionTime.clockIcon')
  const textStyle = theme.get('sessionTime.timeText')

  return (
    <View style={mainStyle}>
      <EVFIcons.Clock style={clockStyle.main} />
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
