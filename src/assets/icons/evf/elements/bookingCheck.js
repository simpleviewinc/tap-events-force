import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

/**
 * BookingCheck
 * @param {object} props
 */
export const BookingCheck = ({ style, styles, ...props }) => {
  return (
    <SvgIcon
      viewBox='0 0 512 512'
      delta='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
      {...props}
      style={styles || style}
    />
  )
}
