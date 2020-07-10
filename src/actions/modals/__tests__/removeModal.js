import { setState, getStore, dispatch } from '../../../mocks'
import { ActionTypes, Values } from 'SVConstants'

// TODO: this needs to be 'SVStore' once rollup config is done
jest.setMock('../../../store/sessionsStore', { getStore, dispatch })
const { removeModal } = require('SVActions/modals/removeModal')

const modalData = {
  modals: [{}, {}, {}, {}],
}

describe('removeModal', () => {
  afterAll(() => jest.clearAllMocks())
  beforeEach(() => dispatch.mockClear())

  it('should return warning if index is not within the array length', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation()
    removeModal(5)
    expect(spy).toHaveBeenCalled()
  })

  it('should call dispatch on last index if nothing is passed in', () => {
    const expectedPayload = {
      category: Values.CATEGORIES.MODALS,
      key: modalData.modals.length - 1,
    }
    setState(modalData)
    removeModal()
    const dispatchArgs = dispatch.mock.calls[0][0]

    expect(dispatchArgs.type).toBe(ActionTypes.REMOVE_ITEM)
    expect(dispatchArgs.payload).toMatchObject(expectedPayload)
  })

  it('should call dispatch on valid index', () => {
    const expectedPayload = {
      category: Values.CATEGORIES.MODALS,
      key: 2,
    }
    setState(modalData)
    removeModal(2)
    const dispatchArgs = dispatch.mock.calls[0][0]
    expect(dispatchArgs.type).toBe(ActionTypes.REMOVE_ITEM)
    expect(dispatchArgs.payload).toMatchObject(expectedPayload)
  })
})