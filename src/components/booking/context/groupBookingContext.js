import { useContext, createContext } from 'react'

export const GroupBookingContext = createContext()

export const useGroupBookingContext = () => useContext(GroupBookingContext)
