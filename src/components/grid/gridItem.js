import React, { useMemo } from 'react'
import { GridRowContent } from './gridRowContent'
import { GridTileContent } from './gridTileContent'
import { View } from '@old-keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'
import { isMobileSize } from 'SVUtils/theme'
import PropTypes from 'prop-types'
import { isArr } from '@keg-hub/jsutils'

/**
 * Filter the labels based on the session
 * On mobile view, we display 3 labels max
 * @param {Array<import('SVModels/label').Label>} labels
 * @param {import('SVModels/session').Session} session
 * @param {object} theme
 */
const useLabelsForList = (theme, labels, session) =>
  useMemo(() => {
    // filter by the session label ids
    const filteredLabels = isArr(session.labelIdentifiers)
      ? labels.filter(label =>
          session.labelIdentifiers.some(id => label.identifier === id)
        )
      : []
    return isMobileSize(theme) ? filteredLabels.slice(0, 3) : filteredLabels
  }, [ labels, theme, session ])

/**
 * A grid item for the sessions
 * @param {Object} props
 * @param {Array} props.labels - labels for grid item
 * @param {import('SVModels/session').Session} props.session - sesion item
 * @param {boolean} props.militaryTime - if true, use military time for dates
 * @param {Func} props.onLabelPress - function called when label is pressed. Receives the pressed label passed to it
 * @param {boolean} props.enableFreeLabel - whether to display 'FREE' on session with no pricing or not
 */
export const GridItem = props => {
  const {
    labels = [],
    session,
    militaryTime,
    onLabelPress,
    enableFreeLabel,
  } = props
  if (!session) return null

  const theme = useTheme()
  const listLabels = useLabelsForList(theme, labels, session)
  const labelStyles = theme.get('gridItem.label.main')
  const listStyles = theme.get('gridItem.labelList.main')
  const GridContent = isMobileSize(theme) ? GridRowContent : GridTileContent

  return (
    <View
      className={`ef-grid-item-content`}
      style={theme.get('gridItem.main')}
    >
      <GridContent
        labels={listLabels}
        listStyles={listStyles}
        labelStyles={labelStyles}
        session={session}
        militaryTime={militaryTime}
        onLabelPress={onLabelPress}
        enableFreeLabel={enableFreeLabel}
      />
    </View>
  )
}

GridItem.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
}
