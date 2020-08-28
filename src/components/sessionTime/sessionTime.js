import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { View, Text } from '@keg-hub/keg-components'
import { getTimeFromDate } from 'SVUtils/dateTime'

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

  // TODO: This should be moved to ReTheme
  // It should use a lookup table instead of all these get calls
  const dataRefs = get(theme, `eventsForce.dataClasses.objRef`)
  const dataClassRef = dataRefs[SessionTime.dataSet.timeText.class]
  const dataClassStyles = get(
    theme,
    `eventsForce.dataClasses.asObj.${dataClassRef}`
  )
  const cssProps = useCss(textStyle.content, dataClassStyles)

  return (
    <View style={mainStyle}>
      <View style={textStyle.main}>
      <EVFIcons.Clock style={clockStyle.main} />
        <Text {...cssProps}>
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

SessionTime.dataSet = {
  main: { class: 'session-time-main' },
  clockIcon: { class: 'ef-sessions-date-time' },
  timeText: { class: 'ef-sessions-date-time' },
}
