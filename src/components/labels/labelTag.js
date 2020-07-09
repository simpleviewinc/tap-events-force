import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * LabelTag
 * @param {Object} props
 */
export const LabelTag = ({ label = {}, style = {} }) => {
  const theme = useTheme()
  const mainStyle = theme.join(
    theme.get('labelTag.main'),
    theme.get('eventsForce')[label.className],
    style
  )
  return <View style={mainStyle} />
}

LabelTag.propTypes = {
  label: PropTypes.object,
}
