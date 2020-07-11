import React from 'react'
import { LabelList } from 'SVComponents'
import { LabelButton, LabelTag } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { isMobileSize } from 'SVUtils/theme'

/**
 * Returns the right label component for the screen size
 * @param {Object} theme
 */
const getLabelComponent = theme =>
  isMobileSize(theme) ? LabelTag : LabelButton

/**
 * Returns the right labels for the list. If mobile, we are showing label-tags,
 * so there should only be the first 3 labels. Otherwise show all
 * @param {Object} theme
 * @param {Array} labels
 */
const getLabelsForList = (theme, labels) =>
  isMobileSize(theme) ? labels.slice(0, 3) : labels

/**
 * A grid item for the sessions
 * @param {Object} props
 * @param {Array} props.labels - labels for grid item
 */
export const GridItem = props => {
  const { labels = [] } = props
  const theme = useTheme()
  const labelComponent = getLabelComponent(theme)
  const listLabels = getLabelsForList(theme, labels)
  const labelStyles = theme.get('gridItem.label')
  const listStyles = theme.get('gridItem.labelList')
  return (
    <div
      style={{
        height: 110,
        display: 'flex',
        flexDirection: 'row',
        border: 'solid',
      }}
    >
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={labelComponent}
        labels={listLabels}
        onItemPress={console.log}
      />
      <p style={{ marginLeft: 15 }}>Test Grid Item Title</p>
    </div>
  )
}
