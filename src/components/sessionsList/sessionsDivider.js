import React from 'react'
import { Divider, Text, View } from '@old-keg-hub/keg-components'
import { EmptyDayMessage } from 'SVComponents/grid/emptyDayMessage'

/**
 * Component that renders the dividers between each section of the session list
 * @param {object} props
 * @param {string} props.dayText - Text to display the day number and name
 * @param {boolean} props.hasSessions - If the section has sessions
 * @param {boolean} props.isMobile - If the viewport is mobile sized
 */
export const SessionsDivider = React.memo(props => {
  const { dayText, first, hasSessions, isMobile } = props

  return (
    <View>
      { !first && dayText && (
        <>
          { !isMobile && <Divider className='ef-day-divider' /> }
          <Text
            className='ef-day-heading'
            accessibilityRole='heading'
            accessibilityLabel={`section header ${dayText}`}
            accessibilityLevel='2'
          >
            { dayText }
          </Text>
        </>
      ) }
      { !hasSessions && <EmptyDayMessage /> }
    </View>
  )
})
