import React from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { SessionLink } from 'SVComponents/sessionLink'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { useFormattedPrice } from 'SVHooks/models/price'
import { BookingButton } from 'SVComponents/button/bookingButton'

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
        <Text
          className={'ef-session-price'}
          style={gridTileContentStyles?.row1?.price}
        >
          { formattedPrice }
        </Text>
      </View>

      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelButton}
        labels={labels}
        onItemPress={onLabelPress}
      />

      <SessionLink
        onPress={() => console.log('Open session details modal')}
        text={session?.name}
      />

      <View style={gridTileContentStyles?.buttonSection?.main}>
        <BookingButton
          session={session}
          styles={gridTileContentStyles?.buttonSection?.bookingButton}
        />
      </View>
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
