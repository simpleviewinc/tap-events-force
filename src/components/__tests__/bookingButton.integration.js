import React from 'react'
import activeSessionWithPrice from 'SVEvfMocks/eventsforce/bookingButton/activeSessionWithPrice.js'
import activeSessionWithoutPrice from 'SVEvfMocks/eventsforce/bookingButton/activeSessionWithoutPrice.js'
import activeSessionWithPriceWithWaitingList from 'SVEvfMocks/eventsforce/bookingButton/activeSessionWithPriceWithWaitingList.js'
import { Sessions } from 'SVComponents/sessions'
import { render, screen } from 'testUtils'
import '@testing-library/jest-dom'

const getBuyBtnWithTextBuyAndPrice = () =>
  screen.getByRole('button', { name: 'BUY $923' })

const getSelectBtnWithOnlyText = () =>
  screen.getByRole('button', { name: 'SELECT' })

const getWaitingListBtnWithOnlyText = () =>
  screen.getByRole('button', { name: 'WAITING LIST' })

describe('Booking Button', () => {
  it('should display BUY <price> FOR an active session with price and NO waiting list.', async () => {
    render(<Sessions sessionAgendaProps={activeSessionWithPrice} />)

    const buyButton = await getBuyBtnWithTextBuyAndPrice()
    expect(buyButton).toBeInTheDocument()
    expect(() => getSelectBtnWithOnlyText()).toThrow()
    expect(() => getWaitingListBtnWithOnlyText()).toThrow()
  })

  it('should display SELECT with NO price present FOR an active session with NO price and NO waiting list.', async () => {
    render(<Sessions sessionAgendaProps={activeSessionWithoutPrice} />)

    const selectButton = await getSelectBtnWithOnlyText()
    expect(selectButton).toBeInTheDocument()
    expect(() => getWaitingListBtnWithOnlyText()).toThrow()
    expect(() => getBuyBtnWithTextBuyAndPrice()).toThrow()
  })

  it('should display WAITING LIST with NO price present FOR an active session with price and waiting list.', async () => {
    render(
      <Sessions sessionAgendaProps={activeSessionWithPriceWithWaitingList} />
    )

    const waitingListButton = await getWaitingListBtnWithOnlyText()
    expect(waitingListButton).toBeInTheDocument()
    expect(() => getSelectBtnWithOnlyText()).toThrow()
    expect(() => getBuyBtnWithTextBuyAndPrice()).toThrow()
  })
})
