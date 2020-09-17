import { formatPrice } from '../formatPrice'
import { Price } from 'SVModels/price'

describe('formatPrice', () => {
  it('format the price model to string', () => {
    const prices = [
      new Price({ currency: 'USD', amount: 50 }),
      new Price({ currency: 'EUR', amount: 120 }),
      new Price({ currency: 'JPY', amount: 1 }),
    ]
    const formattedPrices = prices.map(price => formatPrice(price))
    const expected = [ '$50', '€120', '¥1' ]
    expect(formattedPrices).toEqual(expected)
  })

  it('returns null when amount or currency is null', () => {
    const prices = [
      new Price({ currency: 'FOO', amount: null }),
      new Price({ currency: null, amount: 1 }),
    ]
    const formattedPrices = prices.map(price => formatPrice(price))
    const expected = [ null, null ]
    expect(formattedPrices).toEqual(expected)
  })
})
