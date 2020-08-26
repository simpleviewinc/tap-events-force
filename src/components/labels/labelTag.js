import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { useTheme } from '@svkeg/re-theme'

/**
 * LabelTag - a colored, square label without text
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Object} props.style - styles for the label. Overwrites styles defined in labelTag.main
 */
export const LabelTag = ({ label = {}, style = {} }) => {
  const theme = useTheme()
  const mainStyle = theme.join(
    theme.get('eventsForce')[label.className],
    theme.get('labelTag.main'),
    style
  )
  return <View style={mainStyle} />
}

LabelTag.propTypes = {
  label: PropTypes.object,
  style: PropTypes.object,
}
