import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, ScrollView, View } from '@keg-hub/keg-components'
import { deepMerge, pickKeys, noPropArr } from '@keg-hub/jsutils'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { useSelector, shallowEqual } from 'react-redux'
import { useSessionLocation } from 'SVHooks/models'
import { format } from 'date-fns'
import { LabelList } from 'SVComponents/labels/labelList'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresenters } from 'SVComponents/sessionDetails'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { reStyle } from '@keg-hub/re-theme/reStyle'

/**
 * SessionDetailsModal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} props.visible
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
export const SessionDetailsModal = ({ session, visible, labels }) => {
  if (!session) return null

  const theme = useTheme()

  const sessionDetailsStyles = theme.get('modal.sessionDetails')

  return (
    <BaseModal
      className='ef-modal-group'
      hasCloseButton={true}
      visible={visible}
      Body={
        <Body
          title={session.name}
          dismissModalCb={hideActiveModal}
          styles={sessionDetailsStyles?.content?.body}
          session={session}
          labels={labels}
        />
      }
      Footer={ null       
        //TODO : Add labels here as part of the new figma template. Most probably part of
        //       https://jira.simpleviewtools.com/browse/ZEN-627
      }
    />
  )
}

const HeaderStyles = {
  $xsmall: {
    ftWt: '600',
    lnH: 19,
    ftSz: 14,
    pR: 5
  },
  $small: {
    ftSz: 16,
    pR: 10
  }
}

const SubHeader = reStyle(Text)(HeaderStyles)
const Header = reStyle(Text)({
  ...HeaderStyles,
  $small: { ...HeaderStyles.$small, ftSz: 20 }
})

const BodyHeader = ({ title, subtitle, }) => {
  return (
    <View>
      <Header
        className='ef-modal-body-header'
      >
        { title }
      </Header>
      <SubHeader className='ef-modal-body-subheader'>
        { subtitle }
      </SubHeader>
    </View>
  )
}

/**
 * Body
 * @param {object} props
 * @param {string} props.title - title of Session
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
const Body = ({ title, styles, session, labels = noPropArr }) => {
  const { settings } = useSelector(
    ({ items }) => pickKeys(items, ['settings']),
    shallowEqual
  )
  const military = settings?.displayProperties?.timeFormat === '24'
  const locationName = useSessionLocation(session)

  const formattedSessionTime = formatSessionDateTime(
    session.startDateTimeLocal,
    session.endDateTimeLocal,
    military
  )

  return (
    <View style={styles?.main}>
      <ScrollView
        style={styles?.scrollView?.main}
        contentContainerStyle={styles?.scrollView?.contentContainer}
      >
        <View style={styles?.row1?.main} >
          <BodyHeader title={title} subtitle={formattedSessionTime} />
          <ActionButton
            style={styles?.row1?.button?.main}
            session={session}
          />
        </View>

        <Text
          className={'ef-modal-body-highlight'}
          style={styles?.locationText}
        >
          { locationName?.name || '' }
        </Text>

        <SessionPresenters
          session={session}
          textClassName={'ef-modal-sub-header'}
        />

        <Text
          className={'ef-modal-body'}
          style={styles.summaryText}
        >
          { session.summary }
        </Text>

        <LabelList
          style={styles?.labelButtons?.main}
          itemStyle={styles?.labelButtons?.button}
          labels={labels}
        />
      </ScrollView>
    </View>
  )
}

/**
 * Booking button
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
const ActionButton = ({ styles, session }) => {
  return (
    <View style={styles?.main}>
      <BookingButton
        session={session}
        styles={styles?.button}
      />
    </View>
  )
}

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
    return `${timeBlock} ${parsedDate && format(parsedDate, 'EEEE, d LLLL y')}`
  }, [ start, end, military ])
}
