import * as React from 'react'
import { SvgIcon } from '@old-keg-hub/keg-components'

export function Plus(props) {
  return (
    <SvgIcon
      width={17}
      height={18}
      viewBox='0 0 14 14'
      svgFill='none'
      stroke='none'
      {...props}
      delta='M13.0508 5.5H8.55078V1C8.55078 0.46875 8.08203 0 7.55078 0H6.55078C5.98828 0 5.55078 0.46875 5.55078 1V5.5H1.05078C0.488281 5.5 0.0507812 5.96875 0.0507812 6.5V7.5C0.0507812 8.0625 0.488281 8.5 1.05078 8.5H5.55078V13C5.55078 13.5625 5.98828 14 6.55078 14H7.55078C8.08203 14 8.55078 13.5625 8.55078 13V8.5H13.0508C13.582 8.5 14.0508 8.0625 14.0508 7.5V6.5C14.0508 5.96875 13.582 5.5 13.0508 5.5Z'
      fill={props.fill || '#fff'}
    />
  )
}
