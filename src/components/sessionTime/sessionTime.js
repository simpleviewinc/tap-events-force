import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Style } from '@keg-hub/re-theme/head'
import PropTypes from 'prop-types'
import { View, Text } from '@keg-hub/keg-components'
import { getTimeFromDate } from 'SVUtils/dateTime'
import { EVFIcons } from 'SVIcons'
import { useCss } from 'SVHooks/useCss'

/**
 * SessionTime
 * @param {object} props
 * @param {object} props.style - style object
 * @param {string} props.start - ex: 2020-08-03 13:00:00
 * @param {string} props.end - ex: 2020-08-03 13:30:00
 * @param {string} props.military - true if time should be formatted in 24-hour time
 */
export const SessionTime = props => {
  const { style, start, end, military = true } = props

  const cssProps = useCss('sessionTime', style)

  return (
    <View { ...cssProps.main } >
      <EVFIcons.Clock {...cssProps.clockIcon.main} />
      <View {...cssProps.timeText.main} >
        <Text {...cssProps.timeText.content} >
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
