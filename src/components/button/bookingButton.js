import React, { useCallback } from 'react'
import { selectSession } from 'SVActions/session/selectSession'
import { EvfButton } from 'SVComponents/button/evfButton'
/**
 * @todo - to be completed on
 *       - https://jira.simpleviewtools.com/browse/ZEN-371
 *       - https://jira.simpleviewtools.com/browse/ZEN-268
 * @param {object} props
 * @param {object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const BookingButton = ({ styles, session }) => {
  if (!session) return null

  // placeholder logic for 'disabled' btn
  // this should be removed once button states logic / ui are implemented
  if (
    session.capacity?.remainingPlaces <= 0 &&
    !session.capacity?.isWaitingListAvailable
  )
    return null

  const selectSessionCb = useCallback(() => selectSession(session), [session])
  // we want to show the SELECT btn if:
  // - waiting list is available
  // - remainingPlaces > 0
  return (
    <EvfButton
      type={'primary'}
      styles={styles}
      onClick={selectSessionCb}
      text={'SELECT'}
    />
  )
}
