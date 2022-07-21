import React from 'react'
import PropTypes from 'prop-types'
import { View } from '@old-keg-hub/keg-components'
import { useStyle } from '@keg-hub/re-theme'
import { noPropObj } from '@keg-hub/jsutils'

/**
 * LabelTag - a colored, square label without text
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Object} props.styles - styles for the label. Overwrites styles defined in labelTag.main
 */
export const LabelTag = ({ label = noPropObj, styles }) => {
  const tagStyles = useStyle('labelTag.main', styles)

  return (
    <View
      className={[ 'ef-label-tag', label.className ]}
      style={tagStyles}
    />
  )
}

LabelTag.propTypes = {
  label: PropTypes.object,
  styles: PropTypes.object,
}
