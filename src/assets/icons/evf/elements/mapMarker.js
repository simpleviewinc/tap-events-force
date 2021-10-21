import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function MapMarker(props) {
  return (
    <SvgIcon
      stroke='none'
      viewBox='0 0 19 25'
      width={19}
      height={25}
      fill='black'
      className='ef-session-mapmarker-icon'
      {...props}
      delta='M8.396 23.5312C8.81787 24.1875 9.80225 24.1875 10.2241 23.5312C17.0679 13.6875 18.3335 12.6562 18.3335 9C18.3335 4.03125 14.3022 0 9.3335 0C4.31787 0 0.333496 4.03125 0.333496 9C0.333496 12.6562 1.55225 13.6875 8.396 23.5312ZM9.3335 12.75C7.22412 12.75 5.5835 11.1094 5.5835 9C5.5835 6.9375 7.22412 5.25 9.3335 5.25C11.396 5.25 13.0835 6.9375 13.0835 9C13.0835 11.1094 11.396 12.75 9.3335 12.75Z'
    />
  )
}
