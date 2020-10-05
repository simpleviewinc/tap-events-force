import React, { useState } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { View, Text, Drawer, Touchable } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'

/**
 * The content of a grid item when displayed as a row (<= 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {Object} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridRowContent = props => {
  const { labels, labelStyles, listStyles, session, militaryTime } = props

  const theme = useTheme()
  const [ isOpen, setIsOpen ] = useState(false)
  const gridRowContentStyles = theme.get('gridItem.gridRowContent')
  const locationName = useSessionLocation(session)
  const row2Styles = gridRowContentStyles.column2

  return (
    <Touchable
      style={gridRowContentStyles.main}
      onPress={() => setIsOpen(!isOpen)}
    >
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <View style={row2Styles.main}>
        <SessionTime
          style={theme.get('gridItem.sessionTime.main')}
          start={session.startDateTimeLocal}
          end={session.endDateTimeLocal}
          military={militaryTime}
        />
        <SessionLink text={session.name} />
        <Text
          className={'ef-modal-body-highlight'}
          style={row2Styles.locationText}
        >
          { locationName?.name || '' }
        </Text>
        <Drawer
          // styles={ drawerStyles.drawer }
          toggled={isOpen}
        >
          <DrawerContent />
        </Drawer>
      </View>
    </Touchable>
  )
}

const DrawerContent = () => {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. A condimentum vitae
      sapien pellentesque habitant. Vestibulum mattis ullamcorper velit sed
      ullamcorper morbi tincidunt.
    </Text>
  )
}

GridRowContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
