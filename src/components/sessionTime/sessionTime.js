import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { View, Text } from '@keg-hub/keg-components'
import { getTimeFromDate } from 'SVUtils/dateTime'
import { EVFIcons } from 'SVIcons'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const ClockIcon = reStyle(EVFIcons.Clock)(
  {
    $xsmall: { d: 'none' },
    $small: { d: 'flex', mR: 5 },
  },
  theme => ({ fill: theme.colors.iconGray, className: 'ef-session-clock-icon' })
)

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
  const mainStyle = theme.get(theme.get('sessionTime.main'), style)
  const textStyle = theme.get('sessionTime.timeText')

  return (
    <View
      className='ef-session-time'
      style={mainStyle}
    >
      <ClockIcon className='ef-session-time-clock' />
      <View
        className='ef-session-time-container'
        style={textStyle.main}
      >
        <Text
          className='ef-session-time-text'
          style={textStyle.content}
        >
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
