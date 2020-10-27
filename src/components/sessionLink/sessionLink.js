import React, { useMemo } from 'react'
import { Text, Touchable } from '@keg-hub/keg-components'
import { useStyle, useTheme, useThemeHover } from '@keg-hub/re-theme'
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
  const sessionLinkStyles = useStyle('sessionLink.default', styles)
  const numberOfLines = useMemo(
    () => (isMobileSize(theme) ? { numberOfLines: 2 } : { numberOfLines: 0 }),
    [theme]
  )
  // apply hover state
  const [ ref, themeStyle ] = useThemeHover(
    theme.join(sessionLinkStyles, styles),
    useStyle(`sessionLink.hover`)
  )

  return (
    <Touchable
      activeOpacity={onPress ? 0.2 : 1}
      onPress={onPress}
      style={themeStyle.main}
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      <Text
        ref={ref}
        {...numberOfLines}
        style={themeStyle.text}
        className='ef-session-name'
      >
        { text }
      </Text>
    </Touchable>
  )
}
