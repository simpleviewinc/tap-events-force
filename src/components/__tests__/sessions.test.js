import { Sessions } from '../Sessions'
import React from 'react'
import { render } from 'testUtils'
import '@testing-library/jest-dom'
import testData from '../../mocks/eventsforce/testData.js'

describe('Sessions', () => {
  it('renders', async () => {
    render(<Sessions sessionAgendaProps={testData} />)
  })
})
