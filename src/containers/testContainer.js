import React from 'react'
import { View, H2, Button, withAppHeader } from 'SVComponents'
import { navigateBack } from 'SVActions/navigation/navigateBack'

export const TestContainer = withAppHeader('TestContainer', props => {
  return (
    <>
      <View>
        <H2>Test Page</H2>
        <Button onPress={() => navigateBack()}>Back</Button>
      </View>
    </>
  )
})
