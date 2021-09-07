import React from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'

const LocationIcon = reStyle(EVFIcons.MapMarker)(
  { mR: 8 }, 
  theme => ({ fill: theme.colors.iconGray })
)

const LocationRow = reStyle(View)({
  flD: 'row',
  alI: 'center'
})

/**
 * Location icon and text
 * @param {*} param0 
 * @returns 
 */
export const SessionLocation = ({ session, textClass, textStyle, ...viewProps }) => {
  const locationData = useSessionLocation(session)
  const locationName = locationData?.name

  return locationName
    ? (
      <LocationRow {...viewProps}>
        <LocationIcon />
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