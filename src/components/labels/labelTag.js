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
export const LabelTag = ({ label = {}, styles }) => {
  const theme = useTheme()
  return (
    <View
      className={[ 'ef-label-tag', label.className ]}
      style={[
        theme.get(`eventsForce.labels.${label.className}`),
        theme.get('labelTag.main'),
        styles,
      ]}
    />
  )
}

LabelTag.propTypes = {
  label: PropTypes.object,
  styles: PropTypes.object,
}
