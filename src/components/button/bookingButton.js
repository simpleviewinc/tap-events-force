import React from 'react'
import { setSessionSelected } from 'SVActions/session/setSessionSelected'
import { EvfButton } from 'SVComponents/button/evfButton'
/**
 * @todo - to be completed on
 *       - https://jira.simpleviewtools.com/browse/ZEN-371
 *       - https://jira.simpleviewtools.com/browse/ZEN-268
 * @param {object} props
 */
export const BookingButton = ({ styles, session }) => {
  if (!session) return null

  // placeholder logic for 'disabled' btn
  // this should be removed once button states logic / ui are implemented
  if (session.capacity?.remainingPlaces <= 0) return null

  return (
    <EvfButton
      type={'primary'}
      styles={styles}
      onClick={() => setSessionSelected(session)}
      text={'SELECT'}
    />
  )
}
