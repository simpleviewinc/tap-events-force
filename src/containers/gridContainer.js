import React, { useMemo } from 'react'
import { View } from 'react-native'
import { GridItem, AppHeader, Text } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 *
 * @param {object} param
 * @param {string} timeString
 * @param {object} style - left style theme. theme: gridContainer.content.header.content.left
 */
const LeftText = ({ timeString, style }) => {
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
  const theme = useTheme()
  const gridStyles = theme.get('gridContainer')
  const labels = useMemo(() => sortLabels(props.labels), [props.labels])

  return (
    <View
      style={gridStyles.main}
      data-class='grid-container-main'
    >
      <AppHeader
        styles={gridStyles.content.header}
        LeftComponent={
          <LeftText
            timeString={'10:00'}
            style={gridStyles.content.header.content.left}
          />
        }
      />
      <View
        data-class='grid-container-content-items'
        style={gridStyles.content.items}
      >
        <GridItem
          labels={labels}
          session={props.sessions[0]}
          militaryTime={true}
        />
        <GridItem
          labels={labels}
          session={props.sessions[0]}
          militaryTime={true}
        />
        <GridItem
          labels={labels}
          session={props.sessions[0]}
          militaryTime={true}
        />
      </View>
    </View>
  )
}
