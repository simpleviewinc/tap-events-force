import { checkCall } from '@keg-hub/jsutils'
import React, { useContext, useCallback } from 'react'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

/**
 * EvfButton
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.onClick
 * @param {('default'|'primary')} props.type - button type. defaults to 'default'
 * @param {string} props.text - text to display on button
 * @param {boolean} props.isProcessing - to display processing content
 */
export const EvfButton = props => {
  const { buttonType, disabled, isProcessing, onClick, text } = props

  const { ButtonComponent } = useContext(ComponentsContext)

  // Wrap the onClick, so we can catch the event
  // Then stop it from propagating to the parent elements
  const onBtnClick = useCallback(
    event => {
      event.stopPropagation()
      checkCall(onClick, event)
    },
    [onClick]
  )

  // EVF will only accept these props for their button component
  // The buttonType should be one of “selectSession” | "modalPrimary" | "modalSecondary"
  return (
    <ButtonComponent
      disabled={Boolean(disabled || isProcessing)}
      buttonType={buttonType}
      onClick={onBtnClick}
      sessionBookingState={props.sessionBookingState}
      bookedCount={props.bookedCount}
      bookingMode={props.bookingMode}
      isProcessing={isProcessing}
      text={text}
      className={props.className}
    ></ButtonComponent>
  )
}
