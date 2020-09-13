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
  
  // Use this to build the class
  // className = useMemo(() => { return `grid-container-main-${timeBlock}`, [ timeBlock ] }
  
  return (
    <View style={gridStyles.main} >
      {
        // only display the time header on web styles
        !isMobileSize(theme) && (
          <ItemHeader
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
      <View style={gridStyles.content.items} >
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

