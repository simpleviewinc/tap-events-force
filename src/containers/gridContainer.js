import React, { useMemo } from 'react'
import { View } from 'react-native'
import { GridItem, AppHeader, Text } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
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

const VerticalDivider = () => {
  return <View style={{ height: '100%', width: 8 }}></View>
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
  const gridStyles = theme.get('gridContainer') || {}
  const headerStyles = get(gridStyles, [ 'content', 'header' ], {})
  const labels = useMemo(() => sortLabels(props.labels), [props.labels])

  return (
    <View style={gridStyles.main}>
      <AppHeader
        styles={headerStyles.main}
        LeftComponent={
          <LeftText
            timeString={'10:00'}
            style={headerStyles.content.left}
          />
        }
      />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <GridItem
          labels={labels}
          session={props.sessions[0]}
          militaryTime={true}
        />
        <VerticalDivider />
        <GridItem
          labels={labels}
          session={props.sessions[0]}
          militaryTime={true}
        />
      </View>
    </View>
  )
}
