import { setState, getStore, dispatch } from '../../../mocks'
import { ActionTypes, Values } from 'SVConstants'

jest.setMock('SVStore', { getStore, dispatch })
const { removeModal } = require('SVActions/modals/removeModal')

const modalData = {
  modals: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
}

describe('removeModal', () => {
  afterAll(() => jest.clearAllMocks())
  beforeEach(() => dispatch.mockClear())

  it('should return warning if index is not within the array length', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation()
    removeModal(5)
    expect(spy).toHaveBeenCalled()
  })

  it('should remove the last item if nothing is passed in', () => {
    const expectedPayload = {
      category: Values.INTERNAL_CATEGORIES.MODALS,
      items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    }
    setState(modalData)
    removeModal()
    const dispatchArgs = dispatch.mock.calls[0][0]

    expect(dispatchArgs.type).toBe(ActionTypes.SET_ITEMS)
    expect(dispatchArgs.payload).toMatchObject(expectedPayload)
  })

  it('should remove index 2 on modals array', () => {
    const expectedPayload = {
      category: Values.INTERNAL_CATEGORIES.MODALS,
      items: [{ id: 1 }, { id: 2 }, { id: 4 }],
    }
    setState(modalData)
    removeModal(2)
    const dispatchArgs = dispatch.mock.calls[0][0]
    expect(dispatchArgs.type).toBe(ActionTypes.SET_ITEMS)
    expect(dispatchArgs.payload).toMatchObject(expectedPayload)
  })
})
