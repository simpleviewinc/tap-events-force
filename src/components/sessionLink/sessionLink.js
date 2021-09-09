import React, { useMemo } from 'react'
import { Text, Touchable } from '@keg-hub/keg-components'
import { useStyle, useTheme, useThemeHover } from '@keg-hub/re-theme'
import { noOpObj } from '@keg-hub/jsutils'
import { isMobileSize } from 'SVUtils/theme'
import { isNative } from 'SVUtils/platform'

/**
 * SessionLink
 * @param {object} props
 * @param {Function} props.onPress
 * @param {string} props.text - text to display
 * @param {object} props.styles
 * @param {string} props.className
 */
export const SessionLink = ({ onPress, text, styles, className }) => {
  const theme = useTheme()
  const sessionLinkStyles = useStyle('sessionLink.default')
  const numberOfLines = useMemo(
    () => ({ numberOfLines: isMobileSize(theme) ? 2 : 0 }),
    [theme]
  )
  // apply hover state
  const [ ref, themeStyle ] = useThemeHover(
    useStyle(sessionLinkStyles, styles),
    useStyle(`sessionLink.hover`)
  )

  // text.includes('cloud') && console.log('SessionLink', { styles, className })

  return (
    <Touchable
      className={className}
      activeOpacity={onPress ? 0.2 : 1}
      onPress={onPress}
      style={themeStyle.main}
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      <Text
        {...(isNative() ? noOpObj : { ref: ref })}
        {...numberOfLines}
        style={themeStyle.text}
        className='ef-session-name'
      >
        { text }
      </Text>
    </Touchable>
  )
}
