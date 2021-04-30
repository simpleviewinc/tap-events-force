import React from 'react'
import { Animated, Easing } from 'react-native'
import {
  useFromToAnimation,
  Loading as KegLoading,
} from '@keg-hub/keg-components'
import { useStyle } from '@keg-hub/re-theme'
import { Loading } from 'SVIcons/evf/elements'
import { set } from '@keg-hub/jsutils'
/**
 * Custom Indicator component using the spinner from FontAwesome 4
 * @param {object} props
 * @param {number} props.size
 * @param {object} props.styles
 */
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

  return (
    <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
      <Loading
        className={`ef-loading-indicator ef-button-text-icon`}
        size={size || 22}
      />
    </Animated.View>
  )
}

/**
 *
 * @param {object} props
 * @param {number} props.size - size of the loading indicator
 * @param {string} props.color - color
 */
export const EvfLoading = ({ size, color }) => {
  const customColor = React.useMemo(
    () => color && set({}, 'indicator.icon.color', color),
    [color]
  )
  const loadingStyles = useStyle('evfLoading', customColor)

  return (
    <KegLoading
      className={'ef-loading'}
      indicator={CustomIndicator}
      size={size}
      styles={loadingStyles}
    />
  )
}
