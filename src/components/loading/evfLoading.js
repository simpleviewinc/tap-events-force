import React from 'react'
import { Animated, Easing } from 'react-native'
import {
  useFromToAnimation,
  Loading as KegLoading,
} from '@keg-hub/keg-components'
import { EVFIcons } from 'SVIcons'
import { useTheme } from '@keg-hub/re-theme'

const CustomIndicator = ({ size, styles }) => {
  const [spinVal] = useFromToAnimation(
    {
      from: 0,
      to: 1,
      duration: 1500,
      loop: true,
      easing: Easing.linear,
    },
    []
  )
  const spinInterpolate = spinVal.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
  })
  console.log({ styles })
  return (
    <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
      <EVFIcons.Loading
        className={`ef-loading-icon`}
        color={styles.icon.color}
        width={size}
        height={size}
      />
    </Animated.View>
  )
}

export const EvfLoading = ({ size }) => {
  const theme = useTheme()
  const loadingStyles = theme.get('evfLoading')

  return (
    <KegLoading
      indicator={CustomIndicator}
      size={size || 15}
      styles={loadingStyles}
    />
  )
}
