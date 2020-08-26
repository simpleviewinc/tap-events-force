import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function DayToggleRight(props) {
  return (
    <Svg
      width={10}
      height={17}
      viewBox='0 0 10 17'
      fill='none'
      {...props}
    >
      <Path
        d='M.352 16.681a1.17 1.17 0 001.605 0l7.711-7.4a1.061 1.061 0 000-1.542l-7.71-7.4A1.17 1.17 0 00.351.3a1.062 1.062 0 000 1.58l6.911 6.63-6.908 6.63a1.059 1.059 0 00-.003 1.541c-.003-.002 0 0 0 0z'
        fill={props.fill || '#020202'}
      />
    </Svg>
  )
}
