import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function Close(props) {
  return (
    <SvgIcon
      width={14}
      height={15}
      viewBox='0 0 14 15'
      svgFill='none'
      {...props}
      delta='M2 .82l-2 2 5 5-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5z'
      fill={props.fill || '#fff'}
    />
  )
}
