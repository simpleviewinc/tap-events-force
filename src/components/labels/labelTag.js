import React from 'react'
import PropTypes from 'prop-types'
import { View } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'

/**
 * LabelTag - a colored, square label without text
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Object} props.styles - styles for the label. Overwrites styles defined in labelTag.main
 */
export const LabelTag = ({ label = {}, styles = {} }) => {
  const theme = useTheme()
  const mainStyle = theme.join(
    theme.get('eventsForce')[label.className],
    theme.get('labelTag.main'),
    styles
  )
  return <View style={mainStyle} />
}

LabelTag.propTypes = {
  label: PropTypes.object,
  style: PropTypes.object,
}
