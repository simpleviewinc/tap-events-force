import React from 'react'
import { Text, ScrollView, View } from '@keg-hub/keg-components'
import { noPropArr } from '@keg-hub/jsutils'
import { useSessionLocation } from 'SVHooks/models'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionPresenters } from 'SVComponents/sessionDetails'
import { SessionDetailsHeader } from './sessionDetailsHeader'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values

const ContentDivider = reStyle(View)(theme => ({
  mV: 20,
  bBC: theme.colors.borderGray,
  bBW: 1,
  w: '100%',
}))

/**
 * Session Details Header element, containing title, subtitle, and booking button
 * @param {Session} session - session object
 * @param {string} title - Header title
 * @returns
 */
const Header = ({ session }) => {
  const settings = useStoreItems(CATEGORIES.SETTINGS)
  const military = settings?.displayProperties?.timeFormat === '24'

  return (
    <SessionDetailsHeader
      title={session?.name}
      session={session}
      military={military}
    />
  )
}

/**
 * Session summary text
 */
const Summary = reStyle(Text)({
  $xsmall: {
    lnH: 22,
    ftSz: 14,
    ftWt: 400,
  },
  $small: {
    ftSz: 16,
  },
})

/**
 * Session subheader, containing location and presenters
 * @param {*} param0
 * @returns
 */
const SubHeader = ({ styles, session }) => {
  const location = useSessionLocation(session)

  return (
    <>
      <Text
        className={'ef-modal-body-highlight'}
        style={styles?.locationText}
      >
        { location?.name }
      </Text>

      <SessionPresenters
        session={session}
        textClassName={'ef-modal-sub-header'}
      />
    </>
  )
}

/**
 * SessionDetails
 * @param {object} props
 * @param {string} props.title - title of Session
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
export const SessionDetails = ({
  title,
  styles,
  session,
  labels = noPropArr,
}) => {
  return (
    <ScrollView
      style={styles?.scrollView?.main}
      contentContainerStyle={styles?.scrollView?.contentContainer}
    >
      <Header
        title={title}
        session={session}
      />
      <SubHeader
        styles={styles}
        session={session}
      />

      { Boolean(session.summary) && <ContentDivider /> }

      <Summary className={'ef-modal-body'}>{ session?.summary }</Summary>

      { Boolean(labels?.length) && <ContentDivider /> }

      <LabelList
        style={styles?.labelButtons?.main}
        itemStyle={styles?.labelButtons?.button}
        labels={labels}
      />
    </ScrollView>
  )
}
