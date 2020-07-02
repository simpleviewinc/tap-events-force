import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { LabelButton, LabelTag } from './'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 */
export const LabelList = ({ style = {}, labels = [], onItemPress }) => {
  const theme = useTheme()
  const LabelComponent = theme.RTMeta.width <= 480 ? LabelTag : LabelButton
  return (
    <View style={theme.join(theme.get('labelList.main'), style)}>
      { labels.map(label => (
        <LabelComponent
          key={label.name}
          style={theme.join(theme.get('labelList.item'), {
            backgroundColor: randomBG(),
          })}
          label={label}
          onPress={onItemPress}
        />
      )) }
    </View>
  )
}

// just for testing -- remove once we figure out css colors
const randomBG = () => {
  const colors = [ 'blue', 'red', 'orange', 'coral', 'green', 'purple', 'tan' ]
  return colors[Math.floor(Math.random() * colors.length)]
}

LabelList.propTypes = {
  labels: PropTypes.array,
}
