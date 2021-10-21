import React from 'react'
import { View } from '@keg-hub/keg-components'
import { SessionLink } from 'SVComponents/sessionLink'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useTheme } from '@keg-hub/re-theme'
import { useCreateModal } from 'SVHooks/modal'
import { SessionLocation } from 'SVComponents/sessionLocation'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { Values } from 'SVConstants'
import { SessionPresentersRow } from 'SVComponents/sessionDetails/sessionPresentersRow'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'
// import { useFormattedPrice } from 'SVHooks/models/price'

const LabelsDivider = reStyle(View)(theme => ({
  mB: 7,
  mT: 10,
  bBC: theme.colors.borderGray,
  bBW: 1,
  w: '100%',
}))

const SessionName = reStyle(SessionLink)({
  $xsmall: { mT: 5, mR: 20 },
  $small: { mT: 29, mR: 79 },
})

const ExpandingView = reStyle(View)({ flG: 1 })

const PresenterLinks = reStyle(SessionPresentersRow)({ mT: 10 })

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
    // enableFreeLabel,
  } = props

  const theme = useTheme()
  const gridTileContentStyles = theme.get('gridItem.gridTileContent')

  // Commented out to avoid linter complaints, but will be used again in a ticket soon before release v3.2 or v4 (whichever comes first)
  // const formattedPrice = useFormattedPrice(session?.price, enableFreeLabel)

  const displayDetailsModal = useCreateModal(
    Values.MODAL_TYPES.SESSION_DETAILS,
    {
      session,
      labels,
    }
  )

  return (
    <View
      className='ef-grid-tile-content'
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

      <SessionName
        onPress={displayDetailsModal}
        text={session?.name}
      />

      <SessionLocation
        session={session}
        textClass='ef-session-location'
        style={gridTileContentStyles?.location?.main}
        textStyle={gridTileContentStyles?.location?.text}
        iconGap={22}
      />

      <ExpandingView>
        <PresenterLinks
          session={session}
          icon
        />
      </ExpandingView>

      { Boolean(labels?.length) && (
        <LabelsDivider className='ef-session-labels-divider' />
      ) }

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
