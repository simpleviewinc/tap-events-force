import React from 'react'
import { 
  View,
  H2,
  Button,
  AppHeader, 
  useHistory
} from 'SVComponents'
import { withTheme } from 're-theme'
import { navigateBack } from 'SVActions/navigation/navigateBack'

export const TestContainer = withTheme(({theme}) => {

  const history = useHistory()
  const isRootStack = history && history.index > 0

  return (
    <>
      <AppHeader
        shadow
        title={"TestContainer"}
        leftIcon={isRootStack ? null : 'arrow-left'}
        leftAction={isRootStack ? null : () => navigateBack()}
      />

      <View>
        <H2>Test Page</H2>
        <Button 
          onPress={() => navigateBack()}
        >
        Back
        </Button>
      </View>

    </>

  )
})