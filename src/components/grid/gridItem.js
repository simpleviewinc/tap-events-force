import React from 'react'
import { LabelList } from 'SVComponents'
import { LabelButton, LabelTag, SessionTime } from 'SVComponents'
import { View } from 'react-native'
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
const getLabelsForList = (theme, labels) => labels.slice(0, 3)

/**
 * A grid item for the sessions
 * @param {Object} props
 * @param {Array} props.labels - labels for grid item
 * @param {import('SVModels/session').Session} props.session - sesion item
 */
export const GridItem = props => {
  const { labels = [], session } = props
  if (!session) return null

  const theme = useTheme()
  const labelComponent = getLabelComponent(theme)
  const listLabels = getLabelsForList(theme, labels)
  const labelStyles = theme.get('gridItem.label')
  const listStyles = theme.get('gridItem.labelList')
  return (
    <View style={theme.get('gridItem.main')}>
      <SessionTime
        start={session.startDateTimeLocal}
        end={session.endDateTimeLocal}
      />
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={labelComponent}
        labels={listLabels}
        onItemPress={console.log}
      />
    </View>
  )
}
