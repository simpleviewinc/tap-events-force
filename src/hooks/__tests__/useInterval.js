import React from 'react'

// Mocked useEffect function to test that it's called
let effectCB = null
const useEffect = jest.fn(cb => {
  effectCB = cb
  return effectCB()
})

let refObj = { current: undefined }
const useRef = jest.fn(initialVal => {
  refObj.current = initialVal
  return refObj
})

jest.setMock('react', { ...React, useRef, useEffect })

const { useInterval } = require('SVHooks/useInterval')

describe('useInterval', () => {
  it('will execute the callback after 100ms', () => {
    return new Promise(done => {
      const cb = jest.fn()
      useInterval(cb, 100)

      setTimeout(() => {
        expect(cb).toHaveBeenCalled()
        done()
      }, 110)
    })
  })
})
