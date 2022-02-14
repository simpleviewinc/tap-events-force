import { Sessions } from '../sessions'
import React from 'react'
import { render } from 'testUtils'
import '@testing-library/jest-dom'
import testData from '../../mocks/eventsforce/testData.js'

describe('Sessions - Integration', () => {
  it('renders', async () => {
    render(<Sessions sessionAgendaProps={testData} />)
  })
})
