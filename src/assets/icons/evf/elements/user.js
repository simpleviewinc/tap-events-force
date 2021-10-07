import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function User(props) {
  return (
    <SvgIcon
      stroke='none'
      viewBox='0 0 14 16'
      fill='black'
      {...props}
      delta='M7 8C9.1875 8 11 6.21875 11 4C11 1.8125 9.1875 0 7 0C4.78125 0 3 1.8125 3 4C3 6.21875 4.78125 8 7 8ZM9.78125 9H9.25C8.5625 9.34375 7.8125 9.5 7 9.5C6.1875 9.5 5.40625 9.34375 4.71875 9H4.1875C1.875 9 0 10.9062 0 13.2188V14.5C0 15.3438 0.65625 16 1.5 16H12.5C13.3125 16 14 15.3438 14 14.5V13.2188C14 10.9062 12.0938 9 9.78125 9Z'
    />
  )
}
