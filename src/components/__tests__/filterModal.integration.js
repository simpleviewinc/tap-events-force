import React from 'react'
import testData from 'SVEvfMocks/eventsforce/testData.js'
import userEvent from '@testing-library/user-event'
import { Sessions } from 'SVComponents/sessions'
import { render, screen } from 'testUtils'

import '@testing-library/jest-dom'

const openModal = () => {
  const btn = screen.getByRole('button', { name: 'Filter' })
  expect(btn).toBeDefined()
  return userEvent.click(btn)
}

const getLabel = text => screen.getByRole('button', { name: text })

const applyFilter = () => {
  const btn = screen.getByRole('button', { name: 'APPLY' })
  return userEvent.click(btn)
}

describe('Filter Modal - Integration', () => {
  beforeEach(async () => {
    window.scroll = jest.fn()
    render(<Sessions sessionAgendaProps={testData} />)
  })

  it('should open', async () => {
    openModal()
    expect(await screen.findByText('Only Show:')).toBeInTheDocument()
  })

  it('should apply waiting list filter', async () => {
    openModal()
    const label = getLabel('Waiting List')
    userEvent.click(label)

    expect(await screen.findByText('1 result')).toBeInTheDocument()
    applyFilter()

    expect(
      await screen.queryByRole('button', { name: 'SELECT' })
    ).not.toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'WAITING LIST' })
    ).toBeInTheDocument()
  })
})
