import React from 'react'
import testData from '../mocks/eventsforce/testData'
import { SessionsContainer } from './sessionsContainer'
import { ModalDemos } from './testContainer'

/**
 * Container exported to demonstrate some features of the Sessions app, like modals
 * @param {Object} props - passed directly to the sessions container
 */
export const EFDemoContainer = props => {
  return (
    <React.Fragment>
      <SessionsContainer {...testData} />
      <ModalDemos />
    </React.Fragment>
  )
}
