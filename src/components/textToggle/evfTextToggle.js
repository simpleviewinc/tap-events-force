import { TextToggle, View, Icon, Text } from '@keg-hub/keg-components'
import React, { useMemo } from 'react'
import { EVFIcons } from 'SVIcons'
import { useStyle } from '@keg-hub/re-theme'

/**
 * EvfTextToggle
 * expandable text component
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.text - text content to display
 */
export const EvfTextToggle = ({ styles, text }) => {
  const textToggleStyles = useStyle('evfTextToggle.textToggle', styles)

  return (
    <TextToggle
      text={text}
      styles={textToggleStyles}
      CustomToggle={CustomToggle}
    />
  )
}

/**
 * Gets the chevron icon and text value based on if the textToggle is expanded or not
 * @param {boolean} isExpanded
 * @returns {object} - {Chevron, text} - the icon component and a string
 */
const useToggleIcon = isExpanded =>
  useMemo(() => {
    return {
      ToggleIcon: isExpanded ? EVFIcons.Minus : EVFIcons.Plus,
      text: isExpanded ? 'Less' : 'More',
    }
  }, [isExpanded])

/**
 * CustomToggle
 * @param {object} props
 * @param {boolean} props.isExpanded - is the text expanded?
 */
const CustomToggle = ({ isExpanded }) => {
  const customStyles = useStyle('evfTextToggle.customToggle')
  const { ToggleIcon, text } = useToggleIcon(isExpanded)

  return (
    <View style={customStyles.main}>
      <Text style={customStyles.text}>{ text }</Text>
      <Icon
        styles={customStyles.icon}
        Component={ToggleIcon}
      />
    </View>
  )
}
