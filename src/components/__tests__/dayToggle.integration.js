import React from 'react'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen } from 'testUtils'

import '@testing-library/jest-dom'

const getIncrementBtn = () =>
  screen.getByRole('button', { name: 'increment day' })
const getDecrementBtn = () =>
  screen.getByRole('button', { name: 'decrement day' })
const findHeadingByContent = async expectedText =>
  await screen.findByRole('heading', { name: expectedText })

describe('Day Toggle - Integration', () => {
  beforeEach(async () => {
    window.scroll = jest.fn()
    render(<Sessions sessionAgendaProps={testData} />)
  })

  it('Should increment the day', async () => {
    userEvent.click(getIncrementBtn())

    expect(window.scroll).toHaveBeenCalled()

    const heading = await findHeadingByContent(testData.agendaDays[1].dayName)
    expect(heading).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {
        name: 'section header Day 2',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  it('Should not decrement below the first day', async () => {
    userEvent.click(getDecrementBtn())

    expect(window.scroll).not.toHaveBeenCalled()

    const heading = await findHeadingByContent(testData.agendaDays[0].dayName)
    expect(heading).toBeInTheDocument()
  })

  it('Should decrement when not on first day', async () => {
    userEvent.click(getIncrementBtn())
    userEvent.click(getDecrementBtn())

    expect(window.scroll).toHaveBeenCalledTimes(2)

    const heading = await findHeadingByContent(testData.agendaDays[0].dayName)
    expect(heading).toBeInTheDocument()
  })

  it('Should not increment further than the last day', async () => {
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())
    userEvent.click(getIncrementBtn())

    // there are only 4 days, and we begin on
    expect(window.scroll).toHaveBeenCalledTimes(testData.agendaDays.length - 2)

    const lastDayName = testData.agendaDays[2].dayName
    const heading = await findHeadingByContent(lastDayName)
    expect(heading).toBeInTheDocument()
  })
})
