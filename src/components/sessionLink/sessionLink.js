import React from 'react'
import { Text, Touchable } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'

export const SessionLink = ({ styles, onPress, text }) => {
  const theme = useTheme()
  const sessionLinkStyles = theme.join(theme.get('sessionLink'), styles)

  return (
    <Touchable
      onPress={onPress}
      style={sessionLinkStyles.main}
    >
      <Text
        style={sessionLinkStyles.text}
        className='EF-Session-name'
      >
        { text }
      </Text>
    </Touchable>
  )
}
