import * as React from 'react'
import { Text } from '@keg-hub/keg-components'

/**
 * Digit
 * @param {object} props
 */
export const Digit = props => {
  const { digit = 0 } = props

  return <Text>{ digit }</Text>
}
