import { Text, View } from 'SVComponents'
import React, { useCallback } from 'react'
import { EvfButton } from 'SVComponents/button/evfButton'
import { selectSession } from 'SVActions/session/selectSession'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { useStylesCallback } from '@keg-hub/re-theme'
import { noPropObj } from '@keg-hub/jsutils'

const buildStyles = (theme, _, disabled, state, style) => {
  const stateStyles = theme?.button?.evfButton[state] || noPropObj
  const bookingStyles = stateStyles?.content?.bookingState || noPropObj
  const disabledStyles = disabled
    ? stateStyles?.content?.button?.disabled
    : noPropObj

  return {
    ...bookingStyles,
    text: {
      ...style,
      ...bookingStyles.text,
      ...disabledStyles.content,
    },
  }
}

/**
 * Renders the booking button children based on the passed in booking state
 * @param {import('SVModels/session/bookingState').BookingState} model
 * @param {Object} styles - Booking button child theme styles
 */
const RenderBookingState = props => {
  const { model, style, styles, ...attrs } = props
  const { displayAmount, icon: Icon, text, state } = model
  const bookingStyles = useStylesCallback(buildStyles, [
    model.disabled,
    state,
    style,
    styles,
  ])

  return (
    <View style={bookingStyles.main}>
      { text && <Text
        {...attrs}
        style={bookingStyles.text}
        children={text}
      /> }
      { Icon && (
        <Icon
          digit={displayAmount}
          styles={bookingStyles?.icon[Icon.name]}
        />
      ) }
    </View>
  )
}

/**
 * Booking button for each session component
 * @param {Object} props
 * @param {Object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = props => {
  if (!props.session) return null

  const { session } = props
  const selectSessionCb = useCallback(() => selectSession(session), [session])
  const stateModel = useBookingState(session)

  return (
    (stateModel?.text && (
      <EvfButton
        type={stateModel.state}
        onClick={selectSessionCb}
        disabled={stateModel.disabled}
      >
        { buttonProps => (
          <RenderBookingState
            {...props}
            {...buttonProps}
            model={stateModel}
          />
        ) }
      </EvfButton>
    )) ||
    null
  )
}
