import React, { useState, useCallback, useMemo } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { EvfTextToggle } from 'SVComponents/textToggle'
import { View, Drawer, Touchable, Icon } from '@old-keg-hub/keg-components'
import { SessionLocation } from 'SVComponents/sessionLocation'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresentersRow } from 'SVComponents/sessionDetails'
import { StateLabel } from '../labels/stateLabel'
import { EVFIcons } from 'SVIcons'

/**
 * @summary - Root Grid Row Container component
 * @type {React.Component}
 */
const GridRowMain = reStyle(Touchable)({
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
const SessionTimeRow = reStyle(View)({
  flD: 'row',
  alI: 'flex-end',
})

/**
 * @summary - Wrapper around the session name and toggle icon for formatting
 * @type {React.Component}
 */
const InfoRow = reStyle(View)({
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
const ToggleIcon = reStyle(
  Icon,
  'styles'
)({
  container: {
    pR: 10,
    top: 2,
  },
})

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
const DrawerContent = ({ session, showPresenterDetailsModal }) => {
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

  const onToggle = useCallback(event => setIsOpen(!isOpen), [ isOpen, setIsOpen ])
  const Chevron = useMemo(
    () => (isOpen ? EVFIcons.ChevronUp : EVFIcons.ChevronDown),
    [isOpen]
  )

  return (
    <GridRowMain onPress={onToggle}>
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <ColumnMain>
        <SessionTimeRow>
          <SessionTime
            style={gridRowSessionTimeStyles.main}
            start={session.startDateTimeLocal}
            end={session.endDateTimeLocal}
            military={militaryTime}
          />
          { !isOpen && <StateLabel session={session} /> }
        </SessionTimeRow>
        <SessionLink
          text={session.name}
          className='ef-session-name-link ef-session-name-link-row'
        />
        <InfoRow>
          <SessionLocationSmall
            session={session}
            textClass='ef-session-location'
            iconGap={5}
          />
          <ToggleIcon
            Element={Chevron}
            height={23}
            width={18}
          />
        </InfoRow>
        <Drawer toggled={isOpen}>
          <DrawerContent
            session={session}
            showPresenterDetailsModal={showPresenterDetailsModal}
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
