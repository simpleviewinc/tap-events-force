import { parseDate } from '../parseDate'

describe('parseDate', () => {
  afterAll(() => jest.clearAllMocks())

  it('returns some number on valid date string', () => {
    const dates = [ '01/02/2020', '01-02-2020', '2020-05-08' ]
    dates.map(date => expect(parseDate(date)).toEqual(expect.any(Number)))
  })

  it('returns some number on valid Date object', () => {
    const dates = [ new Date(), new Date(2002, 5, 24, 18, 30) ]
    dates.map(date => expect(parseDate(date)).toEqual(expect.any(Number)))
  })

  it('returns null on invalid date', () => {
    const values = [ 'just some string', undefined, null ]
    values.map(val => expect(parseDate(val)).toBe(null))
  })
})
