import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { LabelButton, LabelTag } from './'
import { useTheme, getSizeMap } from '@simpleviewinc/re-theme'

const widthOf = size => getSizeMap().hash[size]
const getLabelComponent = theme =>
  theme.RTMeta.width <= widthOf('$small') ? LabelTag : LabelButton

/**
 * A list of labels
 * @param {Object} props
 * @param {Object} props.style - style for the root list
 * @param {Object} props.itemStyle - style for individual labels
 * @param {Function} props.onItemPress - callback fired when a label is pressed. Has form: (label) => { ... }
 * @param {Array<import('SVModels/label').Label>} props.labels - the label model instance
 */
export const LabelList = props => {
  const { style = {}, itemStyle = {}, labels = [], onItemPress } = props

  const theme = useTheme()
  const LabelComponent = getLabelComponent(theme)
  const listStyles = theme.join(theme.get('labelList.main', style))
  const labelStyle = theme.join(theme.get('labelList.item'), itemStyle)

  return (
    <View style={listStyles}>
      { labels.map(label => (
        <LabelComponent
          key={label.name}
          style={labelStyle}
          label={label}
          onPress={onItemPress}
        />
      )) }
    </View>
  )
}

LabelList.propTypes = {
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.object),
  onItemPress: PropTypes.function,
}
