import React, { useMemo } from 'react'
import { GridItem } from 'SVComponents/grid/gridItem'
import { ItemHeader, Text, View } from '@keg-hub/keg-components'
import { sortLabels, isMobileSize } from 'SVUtils'
import { useTheme } from '@keg-hub/re-theme'

/**
 *
 * @param {object} param
 * @param {string} timeString
 * @param {object} style - left style theme. theme: gridContainer.content.header.content.left
 */
const LeftHeaderText = ({ timeString, style }) => {
  return (
    <Text
      className={`ef-timeslot-header-time-text`}
      style={style.content.text}
    >
      { timeString }
    </Text>
  )
}

/**
 *
 * @param {object} props
 * @param {Date} props.timeBlock - timeblock for this session group
 * @param {Array} props.sessions - sessions within the given timeblock
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 * @param {boolean} props.enableFreeLabel - whether to display 'FREE' on session with no pricing or not
 * @param {boolean} props.militaryTime - whether to display time in 12 hr or 24 hr format
 */
export const GridContainer = props => {
  const { sessions, labels, timeBlock, enableFreeLabel, militaryTime } = props
  if (!sessions || !sessions.length) return null

  const theme = useTheme()
  const gridStyles = theme.get('gridContainer')
  const labelsMemo = useMemo(() => sortLabels(labels), [labels])

  return (
    <View
      className={`ef-grid-container`}
      style={gridStyles.main}
    >
      {
        // only display the time header on web styles
        !isMobileSize(theme) && (
          <ItemHeader
            className={`ef-timeslot-header`}
            styles={gridStyles.content.header}
            LeftComponent={
              <LeftHeaderText
                timeString={timeBlock}
                style={gridStyles?.content?.header?.content?.left}
              />
            }
          />
        )
      }
      <View
        className={`ef-grid-item`}
        style={gridStyles?.content?.items}
      >
        { sessions &&
          sessions.map(session => (
            <GridItem
              enableFreeLabel={enableFreeLabel}
              key={session.identifier}
              labels={labelsMemo}
              session={session}
              militaryTime={militaryTime}
            />
          )) }
      </View>
    </View>
  )
}
