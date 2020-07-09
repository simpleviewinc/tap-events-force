import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { LabelButton, LabelTag } from './'
import { useTheme, getSizeMap } from '@simpleviewinc/re-theme'

const widthOf = size => getSizeMap().hash[size]

/**
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 */
export const LabelList = ({
  style = {},
  itemStyle = {},
  labels = [],
  onItemPress,
}) => {
  const theme = useTheme()

  const LabelComponent =
    theme.RTMeta.width <= widthOf('$small') ? LabelTag : LabelButton

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
  labels: PropTypes.array,
}
