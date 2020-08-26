import React from 'react'
import { LabelTag, LabelList, SessionTime } from 'SVComponents'
import { useTheme } from '@svkeg/re-theme'
import PropTypes from 'prop-types'

/**
 * The content of a grid item when displayed as a row (<= 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {Object} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridRowContent = props => {
  const { labels, labelStyles, listStyles, session, militaryTime } = props

  const theme = useTheme()

  return (
    <>
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <SessionTime
        style={theme.get('gridItem.sessionTime.main')}
        start={session.startDateTimeLocal}
        end={session.endDateTimeLocal}
        military={militaryTime}
      />
    </>
  )
}

GridRowContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
