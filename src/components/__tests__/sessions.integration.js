import React from 'react'
import { render } from 'testUtils'
import { Sessions } from '../sessions'
import testData from '../../mocks/eventsforce/testData.js'

import '@testing-library/jest-dom'

describe('Sessions - Integration', () => {
  it('renders', async () => {
    render(<Sessions sessionAgendaProps={testData} />)
  })
})
