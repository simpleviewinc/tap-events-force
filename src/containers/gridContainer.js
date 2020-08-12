import React, { useMemo } from 'react'
import { View } from 'react-native'
import { AppHeader, Text } from '@simpleviewinc/keg-components'
import { GridItem } from 'SVComponents/grid/gridItem'
import { sortLabels, isMobileSize } from 'SVUtils'
import { useTheme } from '@simpleviewinc/re-theme'

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
  const { sessions, labels, timeBlock } = props
  if (!sessions || !sessions.length) return null

  const theme = useTheme()
  const gridStyles = theme.get('gridContainer')
  const labelsMemo = useMemo(() => sortLabels(labels), [labels])
  return (
    <View
      style={gridStyles.main}
      dataSet={useMemo(() => GridContainer.dataSet.main(timeBlock), [
        timeBlock,
      ])}
    >
      {
        // only display the time header on web styles
        !isMobileSize(theme) && (
          <AppHeader
            dataSet={GridContainer.dataSet.content.header}
            styles={gridStyles.content.header}
            LeftComponent={
              <LeftHeaderText
                timeString={timeBlock}
                style={gridStyles.content.header.content.left}
              />
            }
          />
        )
      }
      <View
        dataSet={GridContainer.dataSet.content.items}
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

GridContainer.dataSet = {
  main: timeBlock => {
    return { class: `grid-container-main-${timeBlock}` }
  },
  content: {
    header: { class: 'grid-container-content-header' },
    items: { class: 'grid-container-content-items' },
  },
}
