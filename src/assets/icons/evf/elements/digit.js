import * as React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { Ellipse } from './ellipse'

/**
 * Digit
 * @param {object} props
 */
export const Digit = props => {
  if (!props.digit) return null

  const { digit, styles } = props

  return (
    <View
      className={'ef-button-text-counter-main'}
      style={styles.main}
    >
      <Ellipse />
      <Text
        className={'ef-button-text-counter'}
        style={styles.content}
      >
        { digit }
      </Text>
    </View>
  )
}
