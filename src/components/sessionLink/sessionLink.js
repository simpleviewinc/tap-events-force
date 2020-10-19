import React, { useMemo } from 'react'
import { Text, Touchable } from '@keg-hub/keg-components'
import { useStyle, useTheme } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme'

/**
 * SessionLink
 * @param {object} props
 * @param {Function} props.onPress
 * @param {string} props.text - text to display
 * @param {object} props.styles
 */
export const SessionLink = ({ onPress, text, styles }) => {
  const theme = useTheme()
  const sessionLinkStyles = useStyle('sessionLink', styles)
  const numberOfLines = useMemo(
    () => (isMobileSize(theme) ? { numberOfLines: 2 } : { numberOfLines: 0 }),
    [theme]
  )

  return (
    <Touchable
      activeOpacity={onPress ? 0.2 : 1}
      onPress={onPress}
      style={sessionLinkStyles.main}
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      <Text
        {...numberOfLines}
        style={sessionLinkStyles.text}
        className='ef-session-name'
      >
        { text }
      </Text>
    </Touchable>
  )
}
