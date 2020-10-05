import React, { useRef, useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, ScrollView } from '@keg-hub/keg-components'
import { checkCall, pickKeys } from '@keg-hub/jsutils'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { useSelector, shallowEqual } from 'react-redux'
import { useSessionLocation } from 'SVHooks/models'
/**
 *
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 */
export const SessionDetailsModal = ({ session, visible }) => {
  if (!session) return null

  const theme = useTheme()

  const sessionDetailsStyles = theme.get('modal.sessionDetails')
  const dismissedCBRef = useRef()

  return (
    <BaseModal
      className={`ef-modal-group`}
      dissmissedCBRef={dismissedCBRef}
      styles={sessionDetailsStyles}
      hasCloseButton={true}
      title={session.name}
      visible={visible}
    >
      <Body
        dismissModalCb={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
        styles={sessionDetailsStyles?.content?.body}
        session={session}
      />
    </BaseModal>
  )
}

import { format } from 'date-fns'

/**
 *
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const Body = ({ styles, session }) => {
  const { settings } = useSelector(
    ({ items }) => pickKeys(items, ['settings']),
    shallowEqual
  )
  const { timeFormat } = settings?.agendaSettings?.agendaDisplayProperties
  const military = timeFormat === '24'
  const locationName = useSessionLocation(session)

  return (
    <ScrollView style={styles?.main}>
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
      <Text
        className={'ef-modal-body-highlight'}
        style={styles?.locationText}
      >
        { locationName?.name || '' }
      </Text>
    </ScrollView>
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

    return `${timeBlock} ${format(parseDate(start), 'EEEE, d LLLL y')}`
  }, [ start, end, military ])
}
