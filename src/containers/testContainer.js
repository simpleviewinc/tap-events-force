import React from 'react'
import { 
  View,
  h2,
  Button,
} from 'SVComponents'
import { withTheme } from 're-theme'
import { navigateBack } from 'SVActions/navigation/navigateBack'

export const TestContainer = withTheme(({theme}) => {

  return (
      <View>
        <h2>Test Page</h2>
        <Button 
          onPress={() => navigateBack()}
        >
        Back
        </Button>
      </View>
  )
})