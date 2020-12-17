import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { Text } from '@keg-hub/keg-components'

const defaultMessage = 'No sessions to display.'

/**
 * Message to display when the current day has no sessions scheduled
 * @param {Object} props
 * @param {string} props.message
 */
export const EmptyDayMessage = ({ message = defaultMessage }) => {
  const styles = useStyle('emptyDayMessage')
  return <Text style={styles.main}>{ message }</Text>
}
