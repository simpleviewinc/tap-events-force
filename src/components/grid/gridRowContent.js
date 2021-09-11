import React, { useState, useCallback } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useStyle } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { EvfTextToggle } from 'SVComponents/textToggle'
import { View, Text, Drawer, Touchable } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresentersRow } from 'SVComponents/sessionDetails'
import { StateLabel } from '../labels/stateLabel'
import { reStyle } from '@keg-hub/re-theme/reStyle'

/**
 * The content of a grid item when displayed as a row (<= 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {import('SVModels/session').Session} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridRowContent = props => {
  const { labels, labelStyles, listStyles, session, militaryTime } = props
  const [ isOpen, setIsOpen ] = useState(false)
  const gridRowContentStyles = useStyle('gridItem.gridRowContent')
  const gridRowSessionTimeStyles = useStyle('gridItem.sessionTime')
  const locationName = useSessionLocation(session)
  const column2Styles = gridRowContentStyles.column2

  const onToggle = useCallback(event => setIsOpen(!isOpen), [ isOpen, setIsOpen ])

  return (
    <Touchable
      style={gridRowContentStyles.main}
      onPress={onToggle}
    >
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <View style={column2Styles.main}>
        <View style={column2Styles.row1.main}>
          <SessionTime
            style={gridRowSessionTimeStyles.main}
            start={session.startDateTimeLocal}
            end={session.endDateTimeLocal}
            military={militaryTime}
          />
          { !isOpen && <StateLabel session={session} /> }
        </View>
        <SessionLink text={session.name} />
        <Text
          className={'ef-modal-body-highlight'}
          style={column2Styles.locationText}
        >
          { locationName?.name || '' }
        </Text>
        <Drawer toggled={isOpen}>
          <DrawerContent
            session={session}
            styles={column2Styles.drawerContent}
          />
        </Drawer>
      </View>
    </Touchable>
  )
}

const PresenterNames = reStyle(SessionPresentersRow)({ mB: 10 })
const StyledBookingButton = reStyle(BookingButton)({ mB: 10 })

/**
 *
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const DrawerContent = ({ session, styles }) => {
  return (
    <View style={styles?.main}>
      <StyledBookingButton
        session={session}
        styles={styles?.bookingButton}
      />
      <PresenterNames session={session} />
      <EvfTextToggle text={session.summary} />
    </View>
  )
}

GridRowContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
