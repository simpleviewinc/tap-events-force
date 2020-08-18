import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * Returns the label styles based on the given label className
 * this is so we can customize the hover and active button if needed
 * @param {Object} theme
 * @param {import('SVModels/label').Label} label - the label model instance
 * @returns {Object} - style obj
 */
const getEvfLabelStyle = (theme, label) => {
  const evfMainStyle = theme.get('eventsForce')[label.className]
  return {
    default: { main: evfMainStyle },
    hover: { main: evfMainStyle },
    active: { main: { ...evfMainStyle, opacity: 0.4 } },
  }
}
/**
 * Simple label component that can be clicked.
 * @param {Object} props
 * @param {Object} props.style - custom button styles that will override those defined in the theme file's main object
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Function} props.onPress - when clicked, calls onPress and passes the label object to it
 */
export const LabelButton = ({ style = {}, label = {}, onPress }) => {
  const theme = useTheme()

  // merge with eventsForce color style and custom button style if exists
  const mainStyle = theme.join(
    theme.get('labelButton'),
    getEvfLabelStyle(theme, label),
    { style }
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
