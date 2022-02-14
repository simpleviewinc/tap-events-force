import { parseSessionCapacity } from '../parseSessionCapacity'
describe('parseSessionCapacity', () => {
  it('should parse the session capacity with defined values', () => {
    expect(
      parseSessionCapacity({
        isUnlimited: false,
        isWaitingListAvailable: true,
        remainingPlaces: 10,
      })
    ).toEqual({
      isUnlimited: false,
      waitingListIsAvailable: true,
      remainingBookingPlaces: 10,
      remainingWaitingPlaces: 0,
    })
  })

  it('should use defaults if session capacity is undefined', () => {
    expect(parseSessionCapacity(undefined)).toEqual({
      isUnlimited: false,
      waitingListIsAvailable: false,
      remainingBookingPlaces: 0,
      remainingWaitingPlaces: 0,
    })
  })

  it('should set defaults if properties are undefined', () => {
    expect(parseSessionCapacity({})).toEqual({
      isUnlimited: false,
      waitingListIsAvailable: false,
      remainingBookingPlaces: 0,
      remainingWaitingPlaces: 0,
    })
  })

  it('should set remaining count to Infinity if isUnlimited is true', () => {
    expect(
      parseSessionCapacity({
        isUnlimited: true,
      })
    ).toEqual({
      isUnlimited: true,
      waitingListIsAvailable: false,
      remainingBookingPlaces: Infinity,
      remainingWaitingPlaces: 0,
    })
  })

  it('should parse the remaining waiting count', () => {
    expect(
      parseSessionCapacity({
        isUnlimited: false,
        remainingPlaces: 0,
        isWaitingListAvailable: true,
        waitingListRemainingPlaces: 3,
      })
    ).toEqual({
      isUnlimited: false,
      remainingBookingPlaces: 0,
      waitingListIsAvailable: true,
      remainingWaitingPlaces: 3,
    })
  })
})
