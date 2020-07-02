import React from 'react'
import PropTypes from 'prop-types'
import { View, P } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * LabelTag
 * @param {Object} props
 */
export const LabelTag = ({ label = {}, style = {} }) => {
  const theme = useTheme()
  const mainStyle = theme.join(theme.get('labelTag'), style)
  return (
    <View style={mainStyle}>
      <P>X</P>
    </View>
  )
}

LabelTag.propTypes = {
  label: PropTypes.object,
}
