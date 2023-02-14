import React, { useState, useCallback } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { EvfTextToggle } from 'SVComponents/textToggle'
import { View, Divider, Drawer, Touchable } from '@old-keg-hub/keg-components'
import { SessionLocation } from 'SVComponents/sessionLocation'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresentersRow } from 'SVComponents/sessionDetails'
import { StateLabel } from '../labels/stateLabel'
import { useSessionPresenters } from 'SVHooks/models'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { EvfButton } from 'SVComponents/button/evfButton'

/**
 * @summary - Root Grid Row Container component
 * @type {React.Component}
 */
const GridRowMain = reStyle(View)({
  fl: 1,
  flD: 'row',
  w: '100%',
})

/**
 * @summary - Container for holding content excluding labels
 * @type {React.Component}
 */
const ColumnMain = reStyle(View)({
  fl: 1,
  flD: 'column',
  pB: 10,
  pL: 10,
})

/**
 * @summary - Row container for displaying session time
 * @type {React.Component}
 */
const SessionTimeRow = reStyle(Touchable)({
  flD: 'row',
  alI: 'flex-end',
})

/**
 * @summary - Wrapper around the session name and toggle icon for formatting
 * @type {React.Component}
 */
const InfoRow = reStyle(Touchable)({
  fl: 1,
  flD: 'row',
  jtC: 'space-between',
  alI: 'flex-end',
  mT: 8,
})

/**
 * @summary - Drawer Icon to display it current toggle state
 * @type {React.Component}
 */

/**
 * @summary - Root Drawer Container for holder all drawer content
 * @type {React.Component}
 */
const DrawerMain = reStyle(View)({
  flex: 1,
  pR: 15,
  pT: 10,
})

/**
 * @summary - Names of presenters
 * @type {React.Component}
 */
const PresenterNames = reStyle(SessionPresentersRow)({ mB: 10 })

/**
 * @summary - Renders the content of the drawer component when opened
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const DrawerContent = ({
  session,
  showPresenterDetailsModal,
  hasPresenters,
}) => {
  return (
    <DrawerMain>
      <BookingButton
        session={session}
        style={{ main: { marginBottom: 10 }, marginBottom: 10 }}
      />
      <PresenterNames
        session={session}
        showPresenterDetailsModal={showPresenterDetailsModal}
      />
      { hasPresenters && session.summary ? <Divider /> : null }
      <EvfTextToggle text={session.summary} />
    </DrawerMain>
  )
}

/**
 * @summary - SessionLocation with shortened text styles
 * @type {React.Component}
 */
const SessionLocationSmall = reStyle(
  SessionLocation,
  'textStyle'
)({
  ftSz: 16,
  lnH: 19,
  ftWt: '600',
})

/**
 * The content of a grid item when displayed as a row (<= 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {import('SVModels/session').Session} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridRowContent = props => {
  const {
    labels,
    labelStyles,
    listStyles,
    session,
    militaryTime,
    showPresenterDetailsModal,
  } = props
  const [ isOpen, setIsOpen ] = useState(false)
  const gridRowSessionTimeStyles = useStyle('gridItem.sessionTime')

  const bookingModel = useBookingState(session)
  const hasBookingButton = bookingModel?.text ? true : false

  const presenters = useSessionPresenters(session)
  const presenterCount = presenters?.length || 0
  const hasPresenters = presenterCount > 0

  const hasSummary = session.summary ? true : false

  const hasExtraContent = hasBookingButton || hasPresenters || hasSummary

  const onToggle = useCallback(
    event => {
      hasExtraContent && setIsOpen(!isOpen)
    },
    [ isOpen, setIsOpen ]
  )

  return (
    <GridRowMain>
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <ColumnMain>
        <SessionTimeRow onPress={onToggle}>
          <SessionTime
            style={gridRowSessionTimeStyles.main}
            start={session.startDateTimeLocal}
            end={session.endDateTimeLocal}
            military={militaryTime}
          />
          { !isOpen && (
            <StateLabel
              className='ef-session-state-label-mobile'
              session={session}
            />
          ) }
        </SessionTimeRow>
        <SessionLink
          text={session.name}
          className='ef-session-name-link ef-session-name-mobile'
          onPress={onToggle}
        />

        <InfoRow onPress={onToggle}>
          <SessionLocationSmall
            className='ef-session-location-mobile'
            session={session}
            textClass='ef-session-location'
            iconGap={5}
          />
          <EvfButton
            title='none'
            onClick={onToggle}
            buttonType={
              isOpen
                ? 'sessionDetailsChevronOpen'
                : 'sessionDetailsChevronClosed'
            }
            session={session}
          ></EvfButton>
        </InfoRow>
        <Drawer toggled={isOpen}>
          <DrawerContent
            session={session}
            showPresenterDetailsModal={showPresenterDetailsModal}
            hasPresenters={hasPresenters}
          />
        </Drawer>
      </ColumnMain>
    </GridRowMain>
  )
}

GridRowContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
