import React from 'react'
import { 
  View,
  H2,
  Button,
} from 'SVComponents'
import { withTheme } from 're-theme'
import { navigateBack } from 'SVActions/navigation/navigateBack'

export const TestContainer = withTheme(({theme}) => {

  return (
      <View>
        <H2>Test Page</H2>
        <Button 
          onPress={() => navigateBack()}
        >
        Back
        </Button>
      </View>
  )
})