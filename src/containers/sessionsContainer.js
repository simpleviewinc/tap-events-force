import React from 'react'
import { Sessions } from 'SVComponents'
import testData from '../mocks/eventsforce/testData'

/**
 * Container for Sessions
 * @param {Object} props - session data, structured like src/mocks/eventsforce/testData
 */
export const SessionsContainer = props => {
  return <Sessions {...testData} />
}
