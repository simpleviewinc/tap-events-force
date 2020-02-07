import React, { useState, useEffect } from 'react'
import { get } from 'jsutils'
import { View, H3 } from 'SVComponents'
import { useTheme } from 're-theme'

export const Appbar = props => {
  
  const theme = useTheme()
  
  return (
    <View style={theme.get('appbar.container')} >
      <H3 style={theme.get('appbar.text')} >
        Mobile X5
      </H3>
    </View>
  )
}
