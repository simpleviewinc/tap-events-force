import React from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'
import { isMobileSize } from 'SVUtils/theme/isMobileSize'

/**
 * Icon for SessionLocation
 * Changes its width and height between mobile and desktop sizes and has a configurable gap
 */
const LocationIcon = reStyle(EVFIcons.MapMarker)(
  (_, props) => ({ mR: props.gap || 12 }),
  theme => {
    const isMobile = isMobileSize(theme)
    return {
      fill: theme.colors.iconGray,
      width: isMobile ? 15 : 19,
      height: isMobile ? 29 : 28,
      className: 'ef-session-location-icon',
    }
  }
)

const LocationRow = reStyle(View)({
  flD: 'row',
  alI: 'center',
})

/**
 * Location icon and text
 * @param {Session} session
 * @param {string} textClass - class for location text
 * @param {number?} iconGap - optional gap between icon and text
 * @param {Object} textStyle - style object for text
 * @param {...*} - remaining props passesd to root view
 */
export const SessionLocation = ({
  session,
  textClass,
  iconGap,
  textStyle,
  ...viewProps
}) => {
  const locationData = useSessionLocation(session)
  const locationName = locationData?.name

  if (!locationName) return null
  return (
    <LocationRow {...viewProps}>
      <LocationIcon gap={iconGap} />
      <Text
        className={textClass}
        style={textStyle}
      >
        { locationName }
      </Text>
    </LocationRow>
  )
}
