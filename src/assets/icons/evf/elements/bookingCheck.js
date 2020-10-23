import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

/**
 * BookingCheck
 * @param {object} props
 */
export const BookingCheck = ({ style, styles, ...props }) => {
  return (
    <SvgIcon
      svgFill='none'
      viewBox='0 0 23 23'
      delta='M11.5 23C5.146 23 0 17.854 0 11.5S5.146 0 11.5 0 23 5.146 23 11.5 17.854 23 11.5 23zm5.204-15.266a.868.868 0 00-1.237 0l-5.49 5.635-2.445-2.53a.868.868 0 00-1.236 0 .902.902 0 000 1.265l3.077 3.162a.868.868 0 001.236 0L16.733 9a.931.931 0 00-.03-1.265z'
      fillRule='evenodd'
      clipRule='evenodd'
      {...props}
      style={styles || style}
    />
  )
}
