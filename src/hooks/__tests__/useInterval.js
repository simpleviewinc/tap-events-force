import { renderHook } from '@testing-library/react-hooks'
import { useInterval } from 'SVHooks/useInterval'

describe('useInterval', () => {
  it('will execute the callback after 100ms', () => {
    return new Promise(done => {
      const cb = jest.fn()
      renderHook(() => useInterval(cb, 100))

      setTimeout(() => {
        expect(cb).toHaveBeenCalled()
        done()
      }, 100)
    })
  })
})
