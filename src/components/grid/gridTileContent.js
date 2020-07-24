import React from 'react'
import { LabelButton, LabelList, SessionTime } from 'SVComponents'
import PropTypes from 'prop-types'

/**
 * The content of a grid item when displayed as a tile (> 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {Object} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridTileContent = props => {
  const { labels, labelStyles, listStyles, session, militaryTime } = props

  return (
    <>
      <SessionTime
        start={session.startDateTimeLocal}
        end={session.endDateTimeLocal}
        military={militaryTime}
      />
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelButton}
        labels={labels}
        onItemPress={console.log}
      />
    </>
  )
}

GridTileContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
