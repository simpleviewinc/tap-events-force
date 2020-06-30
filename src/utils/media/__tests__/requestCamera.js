import { requestCamera } from 'SVUtils/media'
import { Globals } from 'SVMocks'

describe('Dimensions', () => {
  it('returns error message when navigator || mediaDevices DNE', async () => {
    const spy = jest.spyOn(console, 'error')
    const [err] = await requestCamera(null)
    expect(spy).toHaveBeenCalled()
    expect(err).toBeTruthy()

    const navigator = {}
    const [err2] = await requestCamera(navigator)
    expect(spy).toHaveBeenCalled()
    expect(err2).toBeTruthy()
  })

  it('should call getUserMedia', async () => {
    const [err] = await requestCamera(Globals.navigator)
    expect(Globals.navigator.mediaDevices.getUserMedia).toHaveBeenCalled()
    expect(err).toBeFalsy()
  })
})
