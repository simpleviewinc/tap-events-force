import React from 'react'
import { SessionsProvider } from '../store/sessionsStore'
import { SessionsComponent } from 'SVComponents'

export const SessionsContainer = props => {
  return (
    <SessionsProvider>
      <SessionsComponent />
    </SessionsProvider>
  )
}
