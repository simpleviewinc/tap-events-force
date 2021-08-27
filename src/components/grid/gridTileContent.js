import React from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { SessionLink } from 'SVComponents/sessionLink'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useTheme } from '@keg-hub/re-theme'
import { useFormattedPrice } from 'SVHooks/models/price'
import { useCreateModal } from 'SVHooks/modal'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { Values } from 'SVConstants'
import { useSessionLocation, useSessionPresenters } from 'SVHooks/models'
import { getPresenterFullName } from 'SVUtils/models'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'

const LabelsDivider = reStyle(View)(theme => ({
  $web: {
    mT: 7,
    mB: 7,
    bCB: theme.colors.dimTextGray,
    bWB: 1,
    w: '100%'
  }
}))

/**
 * PresenterLink
 * Clickable Presenter name that opens the presenter details modal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.styles
 */
 const PresenterLink = ({ presenter, styles }) => {
  const displayDetailsModal = useCreateModal(
    Values.MODAL_TYPES.PRESENTER,
    presenter
  )
  return (
    <SessionLink
      className={'ef-sessions-presenter'}
      styles={styles}
      key={presenter.identifier}
      text={getPresenterFullName(presenter)}
      onPress={displayDetailsModal}
    />
  )
}

/**
 * Displays the presenters in the given session
 * Displays each one as interactable that opens the presenter details modal
 * @param {object} props
 * @param {object} props.style
 * @param {import('SVModels/session').Session} props.session
 */
 const PresenterNames = React.memo(({ session, styles }) => {
  const presenters = useSessionPresenters(session)

  return (
    <View style={styles?.main}>
      <View style={styles?.container}>
        { presenters.map(presenter => {
          return (
            <PresenterLink
              key={presenter.identifier}
              styles={styles?.sessionLink}
              presenter={presenter}
            />
          )
        }) }
      </View>
    </View>
  )
})

/**
 * The content of a grid item when displayed as a tile (> 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {import('SVModels/session').Session} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {Func} props.onLabelPress - function called when label is pressed. Receives the pressed label passed to it
 * @param {boolean} props.militaryTime - if true, use military time for dates
 * @param {boolean} props.enableFreeLabel - whether to display 'FREE' on session with no pricing or not
 */
export const GridTileContent = props => {
  const {
    labels,
    labelStyles,
    listStyles,
    session,
    onLabelPress,
    militaryTime,
    enableFreeLabel,
  } = props

  const theme = useTheme()
  const gridTileContentStyles = theme.get('gridItem.gridTileContent')
  const formattedPrice = useFormattedPrice(session?.price, enableFreeLabel)
  const displayDetailsModal = useCreateModal(
    Values.MODAL_TYPES.SESSION_DETAILS,
    {
      session,
      labels,
    }
  )

  const location = useSessionLocation(session)

  return (
    <View
      className={`ef-grid-tile-content`}
      style={gridTileContentStyles?.main}
    >
      <View style={gridTileContentStyles?.row1?.main}>
        <SessionTime
          start={session?.startDateTimeLocal}
          end={session?.endDateTimeLocal}
          military={militaryTime}
        />
        <View style={gridTileContentStyles?.row1?.buttonSection?.main}>
          <BookingButton
            session={session}
            styles={gridTileContentStyles?.row1?.buttonSection?.bookingButton}
          />
        </View>
      </View>

      <SessionLink
        onPress={displayDetailsModal}
        text={session?.name}
      />

      { location?.name && (
        <Text
          className={'ef-session-location'}
          style={gridTileContentStyles?.locationText}
        >
          { location.name }
        </Text>
      ) }

      <PresenterNames
        session={session}
        styles={gridTileContentStyles?.presenters}
      />

      { Boolean(labels?.length) && <LabelsDivider className='ef-session-labels-divider' /> }

      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelButton}
        labels={labels}
        onItemPress={onLabelPress}
      />
    </View>
  )
}

GridTileContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  onItemPress: PropTypes.func,
  labelStyles: PropTypes.object,
}
