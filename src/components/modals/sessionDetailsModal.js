import React, { useRef, useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { Text, ScrollView, View } from '@keg-hub/keg-components'
import { checkCall, pickKeys } from '@keg-hub/jsutils'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'
import { useSelector, shallowEqual } from 'react-redux'
import { useSessionLocation, useSessionPresenters } from 'SVHooks/models'
import { format } from 'date-fns'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { getPresenterFullName, getPresenterProfession } from 'SVUtils/models'
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
        labels={labels}
      />
    </BaseModal>
  )
}

/**
 * Body
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
const Body = ({ styles, session, labels = [] }) => {
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
      <View style={styles?.labelButtons?.main}>
        { labels.map(label => (
          <LabelButton
            styles={styles?.labelButtons?.button}
            key={label.name}
            label={label}
          />
        )) }
      </View>
      <Text
        className={'ef-modal-body-highlight'}
        style={styles?.locationText}
      >
        { locationName?.name || '' }
      </Text>
      <SessionPresenters
        session={session}
        styles={styles.presenters}
      />
    </ScrollView>
  )
}

/**
 * Displays the full details of presenter(s) for the given session
 * @param {object} props
 * @param {import('SVModels/session').Session} session
 * @param {object} styles
 */
const SessionPresenters = React.memo(({ session, styles }) => {
  const presenters = useSessionPresenters(session)
  // format: "[title] [firstname] [lastname], [job title] - [company]"
  return (
    <View style={styles.main}>
      { presenters.map(presenter => {
        const fullName = getPresenterFullName(presenter)
        const profession = getPresenterProfession(presenter)
        return (
          <Text
            className={'ef-modal-sub-header'}
            style={styles.text}
            key={presenter.identifier}
          >
            { `${fullName}${profession && `, ${profession}`}` }
          </Text>
        )
      }) }
    </View>
  )
})

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
