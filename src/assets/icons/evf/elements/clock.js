import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Clock(props) {
  return (
    <Svg
      width={22}
      height={23}
      viewBox='0 0 22 23'
      fill='none'
      {...props}
    >
      <Path
        d='M10.75 7.516v4.42l3.094 3.314m6.187-3.315c0 1.306-.24 2.6-.706 3.806a10.019 10.019 0 01-2.012 3.226 9.266 9.266 0 01-3.011 2.155 8.748 8.748 0 01-3.552.757 8.748 8.748 0 01-3.552-.757 9.266 9.266 0 01-3.01-2.155 10.018 10.018 0 01-2.013-3.226 10.563 10.563 0 01-.706-3.806c0-2.637.978-5.166 2.718-7.03 1.74-1.865 4.101-2.913 6.563-2.913 2.461 0 4.822 1.048 6.563 2.912 1.74 1.865 2.718 4.394 2.718 7.031z'
        stroke='#000'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
