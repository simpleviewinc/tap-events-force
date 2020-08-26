import React from 'react'
import { useTheme } from '@svkeg/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from 'SVComponents'

/**
 * GroupBooking Modal
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {Array.<import('SVModels/attendee').Attendee>} props.attendees
 */
export const GroupBooking = ({ visible, session, attendees }) => {
  if (!session || !attendees) return

  const theme = useTheme()
  const groupBookingStyles = theme.get('modal.groupBooking')
  const { capacity } = session

  // get the remaining spots for the session
  const remainingCount = capacity.isUnlimited ? null : capacity.remainingPlaces

  return (
    <BaseModal
      styles={groupBookingStyles}
      hasCloseButton={false}
      title={session.name}
      visible={visible}
      BodyComponent={() => (
        <Body
          styles={groupBookingStyles.content.body}
          remainingCount={remainingCount}
        />
      )}
    />
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles
 * @param {number} props.remainingCount - spots left in this session
 */
const Body = ({ styles, remainingCount }) => {
  const topSectionStyles = styles?.content?.topSection || {}
  const middleSectionStyles = styles?.content?.middleSection || {}
  const bottomSectionStyles = styles?.content?.bottomSection || {}

  return (
    <View style={styles.main}>
      <TopSection
        styles={topSectionStyles}
        remainingCount={remainingCount}
      />
      <MiddleSection styles={middleSectionStyles} />
      <BottomSection styles={bottomSectionStyles} />
    </View>
  )
}

/**
 * TopSection - contains the instruction text and spots remaining
 * @param {object} props
 * @param {object} props.styles
 */
const TopSection = ({ styles, remainingCount }) => {
  // use correct syntax based on how many spot is left
  const placeText = remainingCount && remainingCount > 1 ? 'places' : 'place'

  return (
    <View style={styles?.main}>
      <Text style={styles?.content?.instructionText}>
        Select sessions for your group:
      </Text>
      { remainingCount && (
        <Text style={styles?.content?.infoText}>
          { `${remainingCount} ${placeText} remaining` }
        </Text>
      ) }
    </View>
  )
}

const MiddleSection = ({ styles }) => {
  // TODO
  return null
}

const BottomSection = ({ styles }) => {
  return <View style={styles.main}>{ /* TODO */ }</View>
}
