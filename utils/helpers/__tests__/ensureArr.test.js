import { ensureArr } from '../ensureArr'

describe('ensureArr', () => {
  it ('should return the input if it is an array', () => {
    const input = [1]
    expect(ensureArr(input)).toEqual(input)
  })

  it ('should wrap the input if it isn\'t an array', () => {
    const input = 1
    expect(ensureArr(input)).toEqual([1])
  })
})
