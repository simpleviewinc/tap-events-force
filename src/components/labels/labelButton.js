import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@simpleviewinc/keg-components'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * Simple label component that can be clicked.
 * @param {Object} props
 * @param {Object} props.style - custom styles that will override those defined in the theme file's main object
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Function} props.onPress - when clicked, calls onPress and passes the label object to it
 */
export const LabelButton = ({ style = {}, label = {}, onPress }) => {
  const theme = useTheme()
  const mainStyle = theme.join(
    theme.get('labelButton'),
    { main: theme.get('eventsForce')[label.className] },
    { main: style }
  )
  const clickHandler = () => onPress && onPress(label)
  return (
    <Button
      styles={mainStyle}
      content={label.name}
      onClick={clickHandler}
    />
  )
}

LabelButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.object,
  onPress: PropTypes.func,
}
