import React from 'react'
import { 
  View,
  H2,
  Button
} from 'SVComponents'
import { withTheme } from 're-theme'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { AppHeader } from 'keg-components'
import { isRootStack } from 'SVNavigation/isRootStack'
import { isStandalonePWA, isNative } from 'SVUtils/platform'

export const TestContainer = withTheme(({theme}) => {

  return (
    <>
      {/* only display back button on PWA or native apps */}
      <AppHeader
        shadow
        title={"TestContainer"}
        leftIcon={!isRootStack() && (isStandalonePWA() || isNative())  ? 'arrow-left' : null}
        leftAction={!isRootStack() && (isStandalonePWA() || isNative())  ? () => navigateBack() : null}
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