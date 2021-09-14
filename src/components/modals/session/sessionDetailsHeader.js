import React, { useMemo } from 'react'
import { Row, Text, View } from '@keg-hub/keg-components'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { format } from 'date-fns'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { deepMerge } from '@keg-hub/jsutils'
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

    return [ timeBlock, formattedDate ]
  }, [ start, end, military ])
}

const SubtitleStyles = {
  $xsmall: {
    ftWt: '600',
    lnH: 19,
    ftSz: 14,
  },
  $small: {
    ftSz: 16,
  },
}

const Subtitle = reStyle(Text)(SubtitleStyles)

const Title = reStyle(Text)(
  deepMerge(SubtitleStyles, {
    $xsmall: { mB: 6 },
    $small: { mB: 10, ftSz: 20 },
  })
)

const VerticalDivider = reStyle(View)(theme => ({
  alS: 'center',
  h: 17,
  bLC: theme.colors.dimTextGray,
  bLW: 2,
  mH: 8,
}))

const ActionWrap = reStyle(View)({ fl: 1, minW: 'fit-content' })

/**
 * Booking button
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
const ActionButton = React.memo(({ session }) => {
  return (
    <ActionWrap>
      <BookingButton session={session} />
    </ActionWrap>
  )
})

const TitleWrap = reStyle(View)({ fl: 4 })

const HeaderTitle = ({ title, start, end, military }) => {
  const [ formattedTime, formattedDate ] = formatSessionDateTime(
    start,
    end,
    military
  )

  return (
    <TitleWrap>
      <Title className='ef-modal-body-header'>{ title }</Title>
      <Row>
        <Subtitle className='ef-modal-body-subheader-time'>
          { formattedTime }
        </Subtitle>

        <VerticalDivider />

        <Subtitle className='ef-modal-body-subheader-date'>
          { formattedDate }
        </Subtitle>
      </Row>
    </TitleWrap>
  )
}

const HeaderLayout = reStyle(View)({
  flD: 'row',
  jtC: 'space-between',
  alI: 'center',
  w: '100%',
})

export const SessionDetailsHeader = ({ title, session = {}, military }) => {
  const { startDateTimeLocal: start, endDateTimeLocal: end } = session

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
