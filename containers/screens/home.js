import React from 'react'
import { View, SelectEvent, Email, Appbar, Continue } from 'SVComponents'
import { useTheme } from 're-theme'

export const HomeScreen = props => {

  const theme = useTheme()
  
  return (
    <>
      <Appbar />
      <View
        style={ theme.get(
          'app.container',
          'display.content.center',
          { justifyContent: 'flex-start' }
        )}
      >
        <Email />
        <SelectEvent />
        <Continue />
      </View>
    </>
  )

}
