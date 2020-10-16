import { Text, View } from 'SVComponents'
import React, { useCallback } from 'react'
import { EvfButton } from 'SVComponents/button/evfButton'
import { selectSession } from 'SVActions/session/selectSession'
import { useBookingState } from 'SVHooks/booking/useBookingState'
import { useTheme } from '@keg-hub/re-theme'

/**
 * Gets the booking button children based on the passed in state
 * @param {import('SVModels/session/bookingState').BookingState} model
 * @param {Object} styles - Booking button child theme styles
 */
const RenderBookingState = props => {
  const { model, style, styles, ...attrs } = props
  const theme = useTheme()
  const { displayAmount, icon: Icon, text, state } = model

  const stateStyles = theme?.button?.evfButton[state]

  const iconProps =
    Icon && Icon.name
      ? Icon.name !== 'Digit'
          ? { style }
          : {
              digit: displayAmount,
              styles: {
                main: {
                  ...style,
                  backgroundColor:
                  style.color || style.backgroundColor || stateStyles.color,
                },
                text: { color: `#22B3C4`, fontWeight: 'bold' },
              },
            }
      : null

  return (
    <View style={{ flexDirection: 'row' }}>
      { text && (
        <Text
          {...attrs}
          style={style}
        >
          { text }
        </Text>
      ) }
      { iconProps && <Icon {...iconProps} /> }
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
