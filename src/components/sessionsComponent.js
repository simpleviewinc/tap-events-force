import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { setActiveSession } from 'SVActions'

export const SessionsComponent = props => {
  useEffect(() => {
    setActiveSession({
      id: 1,
      bookingState: null,
    })
  }, [])
  const store = useSessionsStore()

  console.log(store)
  return (
    <View>
      <Text>{ store.activeSession }</Text>
    </View>
  )
}
