import React from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'

const LocationIcon = reStyle(EVFIcons.MapMarker)(
  (_, props) => ({ mR: props.gap || 12 }), 
  theme => ({ fill: theme.colors.iconGray })
)

const LocationRow = reStyle(View)({
  flD: 'row',
  alI: 'center'
})

/**
 * Location icon and text
 * @returns 
 */
export const SessionLocation = ({ session, textClass, iconGap, textStyle, ...viewProps }) => {
  const locationData = useSessionLocation(session)
  const locationName = locationData?.name

  return locationName
    ? (
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
    : null
}