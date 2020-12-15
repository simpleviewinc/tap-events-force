import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'
import { noPropObj } from '@keg-hub/jsutils'

/**
 * @param {Object} styles - custom styles
 * @return {Object} styles for the LabelTag component
 */
const useLabelTagStyles = styles => {
  const theme = useTheme()
  const mainStyles = theme.get('labelTag.main')
  const defaultSurfaces = theme.get('colors.surface.default.colors')

  return useMemo(
    () => ({
      ...mainStyles,

      // matches the default Button bg-color, in LabelButton on desktop web
      backgroundColor: defaultSurfaces.dark,

      ...styles,
    }),
    [ styles, defaultSurfaces ]
  )
}

/**
 * LabelTag - a colored, square label without text
 * @param {Object} props
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Object} props.styles - styles for the label. Overwrites styles defined in labelTag.main
 */
export const LabelTag = ({ label = noPropObj, styles }) => {
  const tagStyles = useLabelTagStyles(styles)

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
