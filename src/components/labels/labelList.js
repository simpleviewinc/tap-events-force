import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { LabelButton } from './'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * A list of labels
 * @param {Object} props
 * @param {Object} props.style - style for the root list
 * @param {Object} props.itemStyle - style for individual labels
 * @param {Function} props.onItemPress - callback fired when a label is pressed. Has form: (label) => { ... }
 * @param {Component} props.LabelComponent - optional custom component that will be used for rendering the individual labels.
 * @param {Array<import('SVModels/label').Label>} props.labels - the label model instance
 */
export const LabelList = props => {
  const {
    style = {},
    itemStyle = {},
    labels = [],
    LabelComponent = LabelButton,
    onItemPress,
  } = props

  const theme = useTheme()
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
  LabelComponent: PropTypes.elementType,
  onItemPress: PropTypes.function,
}