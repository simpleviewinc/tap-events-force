import React from 'react'

export const EvfCheckbox = props => {
  const { id, isWaitingList, checked, onChange, disabled } = props

  let classes = 'ef-modal-body-session-attendee-checkbox'
  if (isWaitingList) {
    classes += ' ef-modal-body-session-attendee-checkbox-waiting-list'
  }

  return (
    <input
      type='checkbox'
      id={id}
      className={classes}
      checked={checked}
      value='true'
      onChange={onChange}
      disabled={disabled}
      role='checkbox'
    />
  )
}
