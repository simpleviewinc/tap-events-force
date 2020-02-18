import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useCollection } from 'SVUtils/hooks/useCollection'
import { Button } from 'SVComponents'
import { navigateTo } from 'SVActions/navigation/navigateTo'
import { AppHeader } from 'SVComponents'
const { events, sessions } = Values.categories

export const RootContainer = props => {

  const theme = useTheme()

  // loads and starts watching the collections.
  // Placing this here until we start working on the screens that will have their own containers to call these functions.
  const collections = {
    [events]: useCollection(events),
    [sessions]: useCollection(sessions),
  }

  return (
    <>
      <AppHeader
        shadow
        title={"Mobile X5"}
      />

    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >

      {
        [ events, sessions ].map(coll => (
          <React.Fragment key={coll}>

            <Text>{ `Number of ${coll}:`}</Text>

            <Text>{ Object.keys(collections[coll]).length } </Text>

          </React.Fragment>
        ))
      }
      <Button onPress={() => navigateTo('/test')}>
        Navigate (test)
      </Button>

      <Button style={{marginTop: 15}} onPress={() => navigateTo('/qr')}>
        Scan QR Code
      </Button>

    </View>

    </>
    
  )
}