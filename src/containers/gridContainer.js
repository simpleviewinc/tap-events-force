import React, { useMemo } from 'react'
import { View } from 'react-native'
import { GridItem, AppHeader, Text } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import { useTheme } from '@simpleviewinc/re-theme'
import { isMobileSize } from 'SVUtils/theme'

/**
 *
 * @param {object} param
 * @param {string} timeString
 * @param {object} style - left style theme. theme: gridContainer.content.header.content.left
 */
const LeftHeaderText = ({ timeString, style }) => {
  return (
    <View style={style.main}>
      <Text style={style.content.text}> { timeString } </Text>
    </View>
  )
}

/**
 *
 * @param {object} props
 * @param {Date} props.timeBlock - timeblock for this session group
 * @param {Array} props.sessions - sessions within the given timeblock
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 */
export const GridContainer = props => {
  const { sessions, labels } = props
  const theme = useTheme()
  const gridStyles = theme.get('gridContainer')
  const labelsMemo = useMemo(() => sortLabels(labels), [labels])
  return (
    <View
      style={gridStyles.main}
      data-class='grid-container-main'
    >
      {
        // only display the time header on web styles
        !isMobileSize(theme) && (
          <AppHeader
            styles={gridStyles.content.header}
            LeftComponent={
              <LeftHeaderText
                timeString={'10:00'}
                style={gridStyles.content.header.content.left}
              />
            }
          />
        )
      }
      <View
        data-class='grid-container-content-items'
        style={gridStyles.content.items}
      >
        { sessions &&
          sessions.map(session => (
            <GridItem
              key={session.identifier}
              labels={labelsMemo}
              session={session}
              militaryTime={true}
            />
          )) }
      </View>
    </View>
  )
}
