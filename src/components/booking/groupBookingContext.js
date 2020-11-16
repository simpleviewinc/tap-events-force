import React from 'react'

const initialState = {
  bookingList: [],
  waitingList: [],
  capacity: null,
}

const addToList = (state, listKey, { attendeeId }) => {
  const list = state[listKey]
  return {
    ...state,
    [listKey]: !list.includes(attendeeId) ? [ ...list, attendeeId ] : list,
  }
}

const removeFromList = (state, listKey, { attendeeId }) => {
  const list = state[listKey]
  return {
    ...state,
    [listKey]: list.includes(attendeeId)
      ? list.filter(attId => attId !== attendeeId)
      : list,
  }
}

const setCapacity = (state, payload) => ({
  ...state,
  capacity: payload?.capacity,
})

export const groupBookingReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
  case 'ADD_TO_BOOKING':
    return addToList(state, 'bookingList', payload)
  case 'REMOVE_FROM_BOOKING':
    return removeFromList(state, 'bookingList', payload)
  case 'ADD_TO_WAITING':
    return addToList(state, 'waitingList', payload)
  case 'REMOVE_FROM_WAITING':
    return removeFromList(state, 'waitingList', payload)
  case 'SET_CAPACITY':
    return setCapacity(state, payload)
  }
}

export const GroupBookingContext = React.createContext()

export const GroupBookingProvider = ({ children }) => {
  const [ groupBookingState, dispatch ] = useReducer(
    groupBookingReducer,
    initialState
  )

  const actions = {
    addToBookingList: attendeeId =>
      dispatch({ type: 'ADD_TO_BOOKING', payload: { attendeeId } }),
    removeFromBookingList: attendeeId =>
      dispatch({ type: 'REMOVE_FROM_BOOKING', payload: { attendeeId } }),
    addToWaitingList: attendeeId =>
      dispatch({ type: 'ADD_TO_WAITING', payload: { attendeeId } }),
    removeFromWaitingList: attendeeId =>
      dispatch({ type: 'REMOVE_FROM_WAITING', payload: { attendeeId } }),
    setCapacity: capacity =>
      dispatch({ type: 'SET_CAPACITY', payload: { capacity } }),
  }

  return (
    <GroupBookingContext.Provider
      value={{
        state: groupBookingState,
        actions,
      }}
    >
      { children }
    </GroupBookingContext.Provider>
  )
}
