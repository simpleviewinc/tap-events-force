import React from 'react'
// import { SessionsProvider } from '../store/sessionsStore'
import { Sessions } from 'SVComponents'

export const SessionsContainer = props => {
  return (
    // <SessionsProvider>
    <Sessions {...props} />
    // </SessionsProvider>
  )
}
