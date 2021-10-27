import React from 'react'
import testData from '../../../../mocks/eventsforce/testData.js'
import { SessionDetails } from '../sessionDetails'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { render, screen } from 'testUtils'

import '@testing-library/jest-dom'

const testSession = testData.sessions[0]

describe('Session Details', () => {

  let rendered;

  beforeEach(async () => {
    // initialize redux store state
    mapSessionInterface(testData)

    // render full sessions list
    rendered = render(<SessionDetails  
      title={testSession.name}
      session={testSession}
      className='session-details'
    />)
  })

  it('should display the presenters', () => {
    const expectedPresenters = testSession.presenterIdentifiers.map(
      id => testData.presenters.find(presenter => presenter.identifier === id)
    )

    expectedPresenters.map(presenter => {
      const text = screen.getByText(`${presenter.title} ${presenter.firstname} ${presenter.lastname}`)
      expect(text).toBeInTheDocument()
    })
  })

})
