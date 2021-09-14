import React from 'react'
import { Text, View, ScrollView } from '@keg-hub/keg-components'
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
    flG: 1,
  },
  $small: {
    ftSz: 16,
  },
})

/**
 * Location name
 */
const LocationText = reStyle(Text)(theme => ({
  $xsmall: {
    c: theme.colors.lightGray,
    ftWt: 600,
    ftSz: 14,
    lnH: 19,
    ltrS: 0.105,
    mT: 13,
    pR: 5,
  },
  $small: { ftSz: 16 },
}))

/**
 * Session subheader, containing location and presenters
 * @param {*} param0
 * @returns
 */
const SubHeader = ({ styles, session }) => {
  const location = useSessionLocation(session)

  return (
    <>
      <LocationText
        className={'ef-modal-body-highlight'}
        style={styles?.locationText}
      >
        { location?.name }
      </LocationText>

      <SessionPresenters
        session={session}
        textClassName={'ef-modal-sub-header'}
      />
    </>
  )
}

const SessionLabelsList = reStyle(LabelList)({ flD: 'row', mT: -5 })

const DetailsScroll = reStyle(ScrollView)(
  {},
  {
    contentContainerStyle: {
      height: '100%',
      flexGrow: 1,
    },
  }
)

/**
 * SessionDetails
 * @param {object} props
 * @param {string} props.title - title of Session
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.style
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels for this session
 */
export const SessionDetails = ({
  title,
  session,
  style,
  className,
  labels = noPropArr,
}) => {
  return (
    <DetailsScroll
      style={style}
      className={className}
    >
      <Header
        title={title}
        session={session}
      />
      <SubHeader session={session} />

      { Boolean(session.summary) && <ContentDivider /> }

      <Summary className='ef-modal-body'>{ session?.summary }</Summary>

      <View>
        { Boolean(labels?.length) && <ContentDivider /> }
        <SessionLabelsList labels={labels} />
      </View>
    </DetailsScroll>
  )
}
