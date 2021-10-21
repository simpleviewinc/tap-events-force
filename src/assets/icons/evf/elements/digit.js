import * as React from 'react'
import { Text, View } from '@keg-hub/keg-components'
import { Ellipse } from './ellipse'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const PositionedText = reStyle(Text)({ position: 'absolute' })

/**
 * Digit
 * @param {object} props
 */
export const Digit = props => {
  if (!props.digit) return null

  const { digit, styles } = props
  return (
    <View style={styles?.main}>
      <Ellipse
        className='ef-button-text-circle-icon'
        width={20}
        height={15}
        style={styles?.circle}
      />
      <PositionedText
        className='ef-button-text-counter'
        style={styles?.digit}
      >
        { digit }
      </PositionedText>
    </View>
  )
}
