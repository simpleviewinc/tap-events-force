import {TextToggle, View, Icon, Text } from '@keg-hub/keg-components'
import React, { useState } from 'react'
import { EVFIcons } from 'SVIcons'
import { useTheme } from '@keg-hub/re-theme'

/**
 * EvfTextToggle
 * expandable text component
 * @param {object} props 
 * @param {object} props.styles
 * @param {object} props.text - text content to display
 */
export const EvfTextToggle = ({styles, text}) => {

  const theme = useTheme()
  const textToggleStyles = theme.get('evfTextToggle.textToggle', styles)

  return (
    <TextToggle
      text={text}
      styles={textToggleStyles}
      CustomToggle={CustomToggle}
    />
  )
}

/**
 * CustomToggle
 * @param {object} props
 * @param {boolean} props.isExpanded - is the text expanded?
 */
const CustomToggle = ({isExpanded}) => {

  const theme = useTheme()
  const customStyles = theme.get('evfTextToggle.customToggle')

  let Chevron = EVFIcons.ChevronDown
  let text = 'More'
  if (isExpanded) {
    Chevron = EVFIcons.ChevronUp
    text = 'Less'
  }
  return (
    <View style={customStyles.main}>
      <Text style={customStyles.text}
      >
        {text}  
      </Text>
      <Icon
        styles={customStyles.icon}
        Component={Chevron}
      />
    </View>
  )
}