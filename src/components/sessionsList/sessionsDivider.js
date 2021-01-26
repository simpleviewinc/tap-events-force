import React from 'react'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Divider } from '@keg-hub/keg-components/divider'
import { EmptyDayMessage } from 'SVComponents/grid/emptyDayMessage'
import { noOpObj } from '@keg-hub/jsutils'

/**
 * Component that renders the dividers between each section of the session list
 * @param {object} props
 * @param {object} props.styles - styles obj
 * @param {string} props.dayText - Text to display the day number and name
 * @param {string} props.dayNum - Day number of the current section
 * @param {boolean} props.hasSessions - If the section has sessions
 * @param {boolean} props.isMobile - If the viewport is mobile sized
 */
export const SessionsDivider = React.memo(props => {
  const {
    dayNum,
    dayText,
    first,
    hasSessions,
    hide,
    last,
    isMobile,
    styles
  } = props

  const firstEmpty = first && !hasSessions
  const lastEmpty = last && !hasSessions
  const dividerStyles = styles?.content?.dividers
  
  const type = hide
    ? 'hidden'
    : firstEmpty
      ? 'firstEmpty'
      : first
        ? 'first'
        : lastEmpty
          ? 'lastEmpty'
          : !hasSessions
            ? 'empty'
            : undefined

  const divStyles = dividerStyles[type] || noOpObj
  const divType = type || 'standard'

  return (
    <View
      className={`ef-${divType}-main`}
      style={[
        dividerStyles?.standard?.main,
        divStyles.main,
      ]}
    >
      {!first && dayText && (
        <Text
          className={`ef-${divType}-text`}
          style={[
            dividerStyles?.standard?.text,
            divStyles.text,
          ]}
        >
          { dayText }
        </Text>
      )}
      <Divider
        className={`ef-${divType}-divider`}
        style={[
          dividerStyles?.standard?.divider,
          divStyles.divider,
          (isMobile && dividerStyles?.mobile?.divider)
        ]}
      />
      {!hasSessions && (<EmptyDayMessage />)}
    </View>
  )
})