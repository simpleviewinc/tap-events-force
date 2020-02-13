import React from 'react'
import { 
  View,
  Text,
  Button,
} from 'SVComponents'
import { withTheme } from 're-theme'
import { navigateBack } from 'SVActions'

export const TestContainer = withTheme(({theme}) => {

  return (
      <View>
        <Text style={theme.text.h2}>Test Page</Text>
        <Button 
          text={"Back"}
          onPress={() => navigateBack()}
        />
      </View>
  )
})