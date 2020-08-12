import React from 'react'
import { Text, View } from '@simpleviewinc/keg-components'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/SessionTime/sessionTime'
import PropTypes from 'prop-types'

/**
 * The content of a grid item when displayed as a tile (> 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {import('SVModels/session').Session} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {Func} props.onLabelPress - function called when label is pressed. Receives the pressed label passed to it
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridTileContent = props => {
  const {
    labels,
    labelStyles,
    listStyles,
    session,
    onLabelPress,
    militaryTime,
  } = props

  return (
    <View>
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
        onItemPress={onLabelPress}
      />

      { /* TODO: remove later - placeholder text to verify item ordering */ }
      <View style={placeholderStyle}>
        <Text>{ session.name }</Text>
      </View>
    </View>
  )
}

// TODO: remove after grid Item is implemented
const placeholderStyle = { flex: 1, paddingTop: 10 }

GridTileContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  onItemPress: PropTypes.func,
  labelStyles: PropTypes.object,
}
