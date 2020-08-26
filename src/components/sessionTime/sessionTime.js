import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { View, Text } from '@keg-hub/keg-components'
import { getTimeFromDate } from 'SVUtils/dateTime'
import { EVFIcons } from 'SVIcons'
import { Helmet, style } from 'SVComponents/helmet'

// TODO: need to handle sub style classes
/*
styles = {
  main: {
    ...style rules
  },
  // Current code expects a flat object
  // But styles can come in at any level
  // Need to check for that and handel it properly
  content: {
    main: {
      ...style rules
    },
    content: {
      ...style rules
    }
  }
}

*/

const SessionHelmet = ({ dataSet, styles }) => {
  const convertStyles = Object.keys(dataSet)
    .reduce((styleObj, className) => {
      styles[className] &&
        ( styleObj[`[data-class~="${dataSet[className].class}"]`] = styles[className] )
        
      return styleObj
    }, {})

  return (
    <Helmet styles={ convertStyles } >
      <style>
        {`
          [data-class~="ef-sessions-date-time"] {
            background-color: blue;
            color: yellow !important;
          }
        `}
      </style>
    </Helmet>
  )

}

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
      <SessionHelmet
        dataSet={ SessionTime.dataSet }
        styles={{ ...theme.get('sessionTime'), main: mainStyle }}
      />
      <EVFIcons.Clock style={clockStyle.main} />
      <View style={textStyle.main}>
        <Text dataSet={SessionTime.dataSet.timeText} style={textStyle.content}>
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
