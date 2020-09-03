import React, { useMemo } from 'react'
import { GridRowContent } from './gridRowContent'
import { GridTileContent } from './gridTileContent'
import { View } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme'
import PropTypes from 'prop-types'

/**
 * Returns the right labels for the list
 * @param {Array} labels
 */
const useLabelsForList = (theme, labels) =>
  useMemo(() => (isMobileSize(theme) ? labels.slice(0, 3) : labels), [
    labels,
    theme,
  ])

/**
 * A grid item for the sessions
 * @param {Object} props
 * @param {Array} props.labels - labels for grid item
 * @param {import('SVModels/session').Session} props.session - sesion item
 * @param {boolean} props.militaryTime - if true, use military time for dates
 * @param {Func} props.onLabelPress - function called when label is pressed. Receives the pressed label passed to it
 */
export const GridItem = props => {
  const { labels = [], session, militaryTime, onLabelPress } = props
  if (!session) return null

  const theme = useTheme()
  const listLabels = useLabelsForList(theme, labels)
  const listStyles = theme.get('gridItem.labelList.main')
  const GridContent = isMobileSize(theme) ? GridRowContent : GridTileContent
  return (
    <View
      dataSet={GridItem.dataSet.main}
      style={theme.get('gridItem.main')}
    >
      <GridContent
        labels={listLabels}
        listStyles={listStyles}
        session={session}
        militaryTime={militaryTime}
        onLabelPress={onLabelPress}
      />
    </View>
  )
}

GridItem.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
}
GridItem.dataSet = {
  main: { class: 'grid-item-main' },
}
