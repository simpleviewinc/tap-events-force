
import React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export function Ellipse(props) {
  return (
    <SvgIcon
      viewBox='0 0 20 20'
      size={20}
      className='keg-svg-children'
      {...props}
    >
      <SvgIcon.Circle 
        cx='10'
        cy='10'
        r='10'
        fill={props.fill || '#356C99'}
      />
      { props.children }
    </SvgIcon>
  )
}


