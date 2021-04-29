import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export const Checkmark = props => {
  return (
    <SvgIcon
      viewBox='0 0 10 7'
      delta='M8.532.136A1.649 1.649 0 007.515.042a1.477 1.477 0 00-.464.192 1.177 1.177 0 00-.338.32L4.23 4.152 2.81 3.008a1.383 1.383 0 00-.435-.242 1.619 1.619 0 00-1.034-.007 1.396 1.396 0 00-.439.235 1.093 1.093 0 00-.292.354.896.896 0 00-.1.417.901.901 0 00.109.416c.07.131.172.25.3.35l2.674 2.153c.253.204.594.316.946.316l.185-.01c.205-.024.4-.085.571-.18.17-.093.312-.218.413-.364L9.05 1.6a.937.937 0 00.16-.4.876.876 0 00-.043-.418A1.02 1.02 0 008.93.408a1.306 1.306 0 00-.398-.272z'
      fill='#fff'
      {...props}
    />
  )
}
