import React, { useMemo } from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function DayToggleLeft(props) {
  const { style } = props

  const dimStyles = useMemo(() => {
    return {
      height: style?.height || style?.fontSize || 17,
      width: style?.width || style?.fontSize || 10,
    }
  }, [ style?.height, style?.width, style?.fontSize ])

  return (
    <SvgIcon
      viewBox='0 0 10 17'
      svgFill='none'
      {...props}
      style={[ style, dimStyles ]}
      delta='M9.648.319a1.17 1.17 0 00-1.605 0l-7.711 7.4a1.061 1.061 0 000 1.542l7.71 7.4a1.17 1.17 0 001.606.039c.454-.414.47-1.103.04-1.542l-.04-.038-6.911-6.63 6.908-6.63A1.059 1.059 0 009.648.32c.003.002 0 0 0 0z'
      fill={props.fill || '#020202'}
    />
  )
}
