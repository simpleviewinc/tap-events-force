import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Close(props) {
  return (
    <Svg
      width={14}
      height={15}
      viewBox='0 0 14 15'
      fill='none'
      {...props}
    >
      <Path
        d='M2 .82l-2 2 5 5-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5z'
        fill={props.fill || '#fff'}
      />
    </Svg>
  )
}
