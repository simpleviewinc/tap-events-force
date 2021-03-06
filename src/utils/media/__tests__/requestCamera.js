import { requestCamera } from 'SVUtils/media'
import { navigator } from '../../../mocks'

describe('requestCamera', () => {
  afterAll(() => jest.clearAllMocks())

  it('returns error message when navigator || mediaDevices DNE', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    const [err] = await requestCamera(null)
    expect(spy).toHaveBeenCalled()
    expect(err).toBeTruthy()

    const [err2] = await requestCamera({})
    expect(spy).toHaveBeenCalled()
    expect(err2).toBeTruthy()
  })

  it('should call getUserMedia', async () => {
    const [err] = await requestCamera(navigator)
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled()
    expect(err).toBeFalsy()
  })
})
