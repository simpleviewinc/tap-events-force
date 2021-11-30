import React from 'react'
import activeSessionWithPrice from 'SVEvfMocks/eventsforce/testDataBookingButton/activeSessionWithPrice.js'
import activeSessionWithoutPrice from 'SVEvfMocks/eventsforce/testDataBookingButton/activeSessionWithoutPrice.js'
import activeSessionWithPriceWithWaitingList from 'SVEvfMocks/eventsforce/testDataBookingButton/activeSessionWithPriceWithWaitingList.js'
import { Sessions } from 'SVComponents/sessions'
import { render, screen } from 'testUtils'
import '@testing-library/jest-dom'

const getBuyBtnWithTextBuyAndPrice = () =>
  screen.getByRole('button', { name: 'BUY $923' })

const getSelectBtnWithOnlyText = () =>
  screen.getByRole('button', { name: 'SELECT' })

const getWaitingListBtnWithOnlyText = () =>
  screen.getByRole('button', { name: 'WAITING LIST' })

describe('Booking button with price integration test', () => {
  it('For an active session with price and NO waiting list : Should have state displaying BUY with price present', async () => {
    render(<Sessions sessionAgendaProps={activeSessionWithPrice} />)

    const buyButton = await getBuyBtnWithTextBuyAndPrice()
    expect(buyButton).toBeInTheDocument()
  })

  it('For an active session with NO price and NO waiting list : Should have state displaying SELECT with NO price present', async () => {
    render(<Sessions sessionAgendaProps={activeSessionWithoutPrice} />)

    const selectButton = await getSelectBtnWithOnlyText()
    expect(selectButton).toBeInTheDocument()
  })

  it('For an active session with price and waiting list: Should have state displaying WAITING LIST with NO price present', async () => {
    render(
      <Sessions sessionAgendaProps={activeSessionWithPriceWithWaitingList} />
    )

    const waitingListButton = await getWaitingListBtnWithOnlyText()
    expect(waitingListButton).toBeInTheDocument()
  })
})
