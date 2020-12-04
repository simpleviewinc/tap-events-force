import { setState, getStore, dispatch } from '../../../mocks'
import { ActionTypes, Values } from 'SVConstants'

jest.setMock('SVStore', { getStore, dispatch })
const { removeModal } = require('SVActions/modals/removeModal')

const modalData = {
  modals: {
    activeModal: {},
  },
}

describe('removeModal', () => {
  afterAll(() => jest.clearAllMocks())
  beforeEach(() => dispatch.mockClear())

  it('should remove the active modal', () => {
    const expectedPayload = {
      category: Values.CATEGORIES.MODALS,
      key: 'activeModal',
      item: null,
    }
    setState(modalData)
    removeModal()
    const dispatchArgs = dispatch.mock.calls[0][0]

    expect(dispatchArgs.type).toBe(ActionTypes.SET_ITEM)
    expect(dispatchArgs.payload).toMatchObject(expectedPayload)
  })
})
