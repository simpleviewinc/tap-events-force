import React from 'react'
import { LabelList } from 'SVComponents'
import { LabelButton, LabelTag } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { isMobileSize } from 'SVUtils'

const getLabelComponent = theme =>
  isMobileSize(theme) ? LabelTag : LabelButton

/**
 * A grid item for the sessions
 * @param {Object} props
 * @param {Array} props.labels - labels for grid item
 */
export const GridItem = props => {
  const { labels = [] } = props
  const theme = useTheme()
  const labelComponent = getLabelComponent(theme)
  const labelStyles = theme.get('gridItem.label')
  const listStyles = theme.get('gridItem.labelList')
  return (
    <div
      style={{
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        border: 'solid',
      }}
    >
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={labelComponent}
        labels={labels}
        onItemPress={console.log}
      />
      <p style={{ marginLeft: 15 }}>Test Grid Item Title</p>
    </div>
  )
}
