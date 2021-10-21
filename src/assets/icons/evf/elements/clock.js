import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function Clock(props) {
  return (
    <SvgIcon
      width={22}
      height={25}
      color='#C8C8C8'
      viewBox='0 0 22 22'
      className='ef-session-clock-icon'
      {...props}
      delta='M11 0.09375C5.11328 0.09375 0.34375 4.86328 0.34375 10.75C0.34375 16.6367 5.11328 21.4062 11 21.4062C16.8867 21.4062 21.6562 16.6367 21.6562 10.75C21.6562 4.86328 16.8867 0.09375 11 0.09375ZM14.9531 13.543L14.0938 14.6172C13.9648 14.7891 13.793 14.918 13.5352 14.918C13.4062 14.918 13.2344 14.832 13.1484 14.7461L10.2695 12.5977C9.83984 12.2969 9.625 11.8242 9.625 11.2656V4.5625C9.625 4.21875 9.92578 3.875 10.3125 3.875H11.6875C12.0312 3.875 12.375 4.21875 12.375 4.5625V10.75L14.8672 12.5977C14.9961 12.7266 15.125 12.8984 15.125 13.1133C15.125 13.2852 15.0391 13.457 14.9531 13.543Z'
    />
  )
}
