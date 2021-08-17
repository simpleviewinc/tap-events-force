import React, { useState, useCallback, useMemo } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { EvfTextToggle } from 'SVComponents/textToggle'
import { View, Text, Drawer, Touchable } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresenters } from 'SVComponents/sessionDetails'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { Values } from 'SVConstants/values'

const { SESSION_BOOKING_STATES } = Values

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
  const theme = useTheme()
  const [ isOpen, setIsOpen ] = useState(false)
  const gridRowContentStyles = theme.get('gridItem.gridRowContent')
  const locationName = useSessionLocation(session)
  const column2Styles = gridRowContentStyles.column2
  const sessionState = useMemo(() => getBookingState(session), [ session ])
  let labelToDisplay = sessionState
  
  //Don't diplay select and Read_Only labels as per requirement in zen-626
  if (sessionState == SESSION_BOOKING_STATES.SELECT || sessionState == SESSION_BOOKING_STATES.READ_ONLY) { labelToDisplay = ''}

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
            style={theme.get('gridItem.sessionTime.main')}
            start={session.startDateTimeLocal}
            end={session.endDateTimeLocal}
            military={militaryTime}
          />
          { !(isOpen) && (
            <Text style={column2Styles.row1.statusLabel}>
              {labelToDisplay.toUpperCase()}
            </Text>
          )
          }
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

/**
 *
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const DrawerContent = ({ session, styles }) => {
  return (
    <View style={styles?.main}>
      <BookingButton
        session={session}
        styles={styles?.bookingButton}
      />
      <SessionPresenters session={session} />
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
