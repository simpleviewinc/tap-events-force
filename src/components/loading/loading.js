import React from 'react'
import { Animated, Easing } from 'react-native'
import { useFromToAnimation } from '@keg-hub/keg-components'
// import { EVFIcons } from 'SVIcons'
// import { Loading as LoadingIcon } from 'SVIcons/evf/elements'

const CustomIndicator = () => {
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
      { /* <EVFIcons.Clock
        className={`ef-session-time-clock`}
        style={clockStyle.main}
      /> */ }
      { /* <Icon
        Component={LoadingIcon}
        color={'#2196F3'}
        size={40}
      /> */ }
    </Animated.View>
  )
}

export const Loading = () => {
  return <Loading indicator={CustomIndicator} />
}
