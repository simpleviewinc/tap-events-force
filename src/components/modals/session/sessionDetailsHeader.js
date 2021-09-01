import React, { useMemo } from 'react'
import { Column, Row, Text, View } from '@keg-hub/keg-components'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { format } from 'date-fns'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { BookingButton } from 'SVComponents/button/bookingButton'


/**
 * Formats the date string
 * @param {string} start
 * @param {string} end
 * @param {boolean} military
 */
const formatSessionDateTime = (start, end, military) => {
  return useMemo(() => {
    const timeBlock = `${getTimeFromDate(start, military)} - ${getTimeFromDate(
      end,
      military
    )}`

    const parsedDate = parseDate(start)
    const formattedDate = parsedDate 
      ? format(parsedDate, 'EEEE, d LLLL y')
      : null

    return [
      timeBlock,
      formattedDate,
    ]
  }, [ start, end, military ])
}

const TitleStyles = {
  $xsmall: {
    ftWt: '600',
    lnH: 19,
    ftSz: 14,
  },
  $small: {
    ftSz: 16,
  }
}

const Subtitle = reStyle(Text)(TitleStyles)

const Title = reStyle(Text)({
  ...TitleStyles,
  $xsmall: { ...TitleStyles.$xsmall, mB: 6 },
  $small: { ...TitleStyles.$small, mB: 10, ftSz: 20 }
})

const VerticalDivider = reStyle(View)(theme => ({ 
  alignSelf: 'center', 
  h: 17, 
  bLC: theme.colors.dimTextGray, 
  bLW: 2, 
  mH: 8 
}))

/**
 * Booking button
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
 const ActionButton = ({ session }) => {
  return (
    <View>
      <BookingButton session={session} />
    </View>
  )
}


const HeaderLayout = reStyle(View)({
  flD: 'row',
  jtC: 'space-between',
  alI: 'center',
  w: '100%'
})

const HeaderTitle = ({ title, start, end, military }) => {
  const [ formattedTime, formattedDate ] = formatSessionDateTime(
    start,
    end,
    military
  )

  return (
    <View>
      <Title className='ef-modal-body-header'>
        { title }
      </Title>
      <Row>
        <Subtitle className='ef-modal-body-subheader-time'>
          { formattedTime }
        </Subtitle>

        <VerticalDivider />

        <Subtitle className='ef-modal-body-subheader-date'>
          { formattedDate }
        </Subtitle>
      </Row>
    </View>
  )
}


export const SessionDetailsHeader = ({ title, session={}, military }) => {
  const { 
    startDateTimeLocal: start, 
    endDateTimeLocal: end 
  } = session

  return (
    <HeaderLayout className='ef-session-details-header-layout'>
      <HeaderTitle 
        military={military} 
        title={title} 
        start={start} 
        end={end} 
      />

      <ActionButton session={session} />
    </HeaderLayout>
  )
}

