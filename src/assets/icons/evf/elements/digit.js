import * as React from 'react'
import { Text, View } from '@keg-hub/keg-components'

/**
 * Digit
 * @param {object} props
 */
export const Digit = props => {
  if (!props.digit) return null

  const { digit, styles } = props

  return (
    <View style={[{ borderRadius: '50%' }, styles.main ]}>
      <Text style={styles.text}>{ digit }</Text>
    </View>
  )
}
