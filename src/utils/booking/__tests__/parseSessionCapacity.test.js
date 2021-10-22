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
      remainingCount: 10,
    })
  })

  it('should use defaults if session capacity is undefined', () => {
    expect(parseSessionCapacity(undefined)).toEqual({
      isUnlimited: false,
      waitingListIsAvailable: false,
      remainingCount: 0,
    })
  })

  it('should set defaults if properties are undefined', () => {
    expect(parseSessionCapacity({})).toEqual({
      isUnlimited: false,
      waitingListIsAvailable: false,
      remainingCount: 0,
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
      remainingCount: Infinity,
    })
  })
})
