import React from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from 'SVContainers'
import { displayName } from 'SVConfig'

export const RootContainer = withAppHeader(displayName, props => {
  return <SessionsContainer />
})
