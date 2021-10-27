import React from 'react'
import testData from '../../../mocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { SessionsList } from '../sessionsList'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { render, screen } from 'testUtils'
import { mockSettings } from './mockSettings'

import '@testing-library/jest-dom'

const getIncrementBtn = () => screen.getByRole('button', { name: 'increment day'})
const getDecrementBtn = () => screen.getByRole('button', { name: 'decrement day'})
const findHeadingByContent = async expectedText => await screen.findByRole('heading', { name: expectedText })

describe('SessionsList - Day Toggle', () => {

  const mockLabels = []

  beforeEach(async () => {
    // initialize redux store state
    mapSessionInterface(testData)

    // render full sessions list
    render(<SessionsList  
      labels={mockLabels}
      enableFreeLabel={true}
      onDayChange={jest.fn()}
      settings={mockSettings}
      sessions={testData.sessions}
      militaryTime={false}
    />)
  })

  it('Should increment the day', async () => {
    const incrementBtn = getIncrementBtn()
    userEvent.click(incrementBtn)

    const heading = await findHeadingByContent(testData.agendaDays[1].dayName)
    expect(heading).toBeInTheDocument()
  })

  it('Should not decrement below the first day', async () => {
    const decrementBtn = getDecrementBtn()
    userEvent.click(decrementBtn)

    const heading = await findHeadingByContent(testData.agendaDays[0].dayName)
    expect(heading).toBeInTheDocument()
  })

  it('Should decrement when not on first day', async () => {
    const incrementBtn = getIncrementBtn()
    userEvent.click(incrementBtn)
    const decrementBtn = getDecrementBtn()
    userEvent.click(decrementBtn)

    const heading = await findHeadingByContent(testData.agendaDays[0].dayName)
    expect(heading).toBeInTheDocument()
  })

  it('Should not increment further than the last day', async () => {
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())

    const lastDayName = testData.agendaDays[2].dayName
    const heading = await findHeadingByContent(lastDayName)
    expect(heading).toBeInTheDocument()
  })
})
