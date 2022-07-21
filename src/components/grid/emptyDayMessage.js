import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { H5 } from '@old-keg-hub/keg-components'

const defaultMessage = 'There are no sessions to display for this day'

/**
 * Message to display when the current day has no sessions scheduled
 * @param {Object} props
 * @param {string} props.message
 */
export const EmptyDayMessage = ({ message = defaultMessage }) => {
  const styles = useStyle('emptyDayMessage')
  return (
    <H5
      className={'ef-sessions-empty-text'}
      style={styles?.main}
    >
      { message }
    </H5>
  )
}
