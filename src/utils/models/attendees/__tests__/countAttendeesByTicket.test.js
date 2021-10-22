import { countAttendeesByTicket } from '../countAttendeesByTicket'

describe('countAttendeesByTicket', () => {
  const map = {
    ticket1: [ '1', '2', '3' ],
    ticket2: [ '4', '5', '6' ],
    ticket3: ['7'],
    ticket4: [],
  }

  const expectedTotal =
    map.ticket1.length +
    map.ticket2.length +
    map.ticket3.length +
    map.ticket4.length

  it('should count all the items in the arrays', () => {
    const count = countAttendeesByTicket(map)
    expect(count).toEqual(expectedTotal)
  })

  it('should handle nullish lists', () => {
    const test = { ...map, ticket5: null }
    const count = countAttendeesByTicket(test)
    expect(count).toEqual(expectedTotal)
  })
})
