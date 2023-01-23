import React, { useMemo } from 'react'
import { Text, Touchable } from '@old-keg-hub/keg-components'
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
export const SessionLink = ({
  onPress,
  text,
  styles,
  className,
  containerClassName,
}) => {
  const theme = useTheme()
  const sessionLinkStyles = useStyle('sessionLink.default')
  const numberOfLines = useMemo(
    () => (isMobileSize(theme) ? { numberOfLines: 2 } : { numberOfLines: 0 }),
    [theme]
  )
  // apply hover state
  const [ ref, themeStyle ] = useThemeHover(
    useStyle(sessionLinkStyles, styles),
    useStyle(`sessionLink.hover`)
  )

  const classes = [ 'ef-session-link', className ].join(' ')

  return (
    <Touchable
      className={containerClassName}
      activeOpacity={onPress ? 0.2 : 1}
      onPress={onPress}
      style={themeStyle.main}
      pointerEvents={!onPress && 'none'}
    >
      <Text
        {...(isNative() ? noOpObj : { ref: ref })}
        {...numberOfLines}
        className={classes}
        accessibilityRole='link'
        accessibilityLabel='session-link'
      >
        { text }
      </Text>
    </Touchable>
  )
}
