import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, ScrollView, View } from '@keg-hub/keg-components'
import { pickKeys, noPropArr } from '@keg-hub/jsutils'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { useSelector, shallowEqual } from 'react-redux'
import { useSessionLocation } from 'SVHooks/models'
import { format } from 'date-fns'
import { LabelList } from 'SVComponents/labels/labelList'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresenters } from 'SVComponents/sessionDetails'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'

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
      className={`ef-modal-group`}
      hasCloseButton={true}
      title={session.name}
      visible={visible}
      Body={
        <Body
          dismissModalCb={hideActiveModal}
          styles={sessionDetailsStyles?.content?.body}
          session={session}
          labels={labels}
        />
      }
      Footer={
        <ActionButton
          styles={sessionDetailsStyles?.content?.footer}
          session={session}
        />
      }
    />
  )
}

/**
 * Body
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
const Body = ({ styles, session, labels = noPropArr }) => {
  const { settings } = useSelector(
    ({ items }) => pickKeys(items, ['settings']),
    shallowEqual
  )
  const military = settings?.displayProperties?.timeFormat === '24'
  const locationName = useSessionLocation(session)

  return (
    <View style={styles?.main}>
      <ScrollView
        style={styles?.scrollView?.main}
        contentContainerStyle={styles?.scrollView?.contentContainer}
      >
        <Text
          className={'ef-modal-body-header'}
          style={styles?.dateTimeText}
        >
          { formatSessionDateTime(
            session.startDateTimeLocal,
            session.endDateTimeLocal,
            military
          ) }
        </Text>

        <LabelList
          style={styles?.labelButtons?.main}
          itemStyle={styles?.labelButtons?.button}
          labels={labels}
        />

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
