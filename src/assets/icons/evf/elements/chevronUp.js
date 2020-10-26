import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export const ChevronUp = props => {
  return (
    <SvgIcon
      fill='#020202'
      width='18'
      height='11'
      viewBox='0 0 18 11'
      delta='M17.181 10.148a1.17 1.17 0 000-1.605L9.781.832a1.061 1.061 0 00-1.542 0l-7.4 7.71A1.17 1.17 0 00.8 10.149c.414.454 1.103.47 1.542.04l.038-.04 6.63-6.911 6.63 6.908a1.059 1.059 0 001.541.003c-.002.003 0 0 0 0z'
      {...props}
    />
  )
}
