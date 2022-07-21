import * as React from 'react'
import { SvgIcon } from '@old-keg-hub/keg-components'

export function Minus(props) {
  return (
    <SvgIcon
      width={15}
      height={4}
      viewBox='0 0 15 4'
      svgFill='none'
      stroke='none'
      {...props}
      delta='M13.0537 0.555878H1.05371C0.491211 0.555878 0.0537109 1.02463 0.0537109 1.55588V2.55588C0.0537109 3.11838 0.491211 3.55588 1.05371 3.55588H13.0537C13.585 3.55588 14.0537 3.11838 14.0537 2.55588V1.55588C14.0537 1.02463 13.585 0.555878 13.0537 0.555878Z'
      fill={props.fill || '#fff'}
    />
  )
}
