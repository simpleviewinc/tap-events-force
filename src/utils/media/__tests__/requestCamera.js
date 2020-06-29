import { requestCamera } from '../requestCamera'
//import { Mocks } from 'SVMocks'

describe('Dimensions', () => {
  it('returns error message when navigator || mediaDevices DNE', async () => {
    const spy = jest.spyOn(console, 'error')
    const [err] = await requestCamera(null)
    expect(spy).toHaveBeenCalled()
    expect(err).toBeTruthy()
  })

  it('returns error message when mediaDevices DNE', async () => {
    const spy = jest.spyOn(console, 'error')
    const [err] = await requestCamera(null)
    expect(spy).toHaveBeenCalled()
    expect(err).toBeTruthy()
  })
})
