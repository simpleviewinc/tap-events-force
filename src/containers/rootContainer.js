import React from 'react'
import { useTheme } from 're-theme'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useCollection } from 'SVUtils/hooks/useCollection'
import { View, Button, Icon, Text } from 'SVComponents'
import { navigateTo } from 'SVActions/navigation/navigateTo'

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

      <View style={theme.navigation.button}>
        <Button
          styles={{ main: { flexDirection: 'row'} }}
          onPress={() => navigateTo('/test')}
        >
          <Icon color={ "#FFFFFF" } name='chevron-right' size={ 20 } />
          <Text style={{ color: "#FFF", marginLeft: 10 }} >
            Navigate (test)
          </Text>
        </Button>
      </View>

      <View style={theme.navigation.button}>
        <Button
          styles={{ main: { flexDirection: 'row', marginTop: 15 } }}
          onPress={() => navigateTo('/qr')}
        >
          <Icon color={ "#FFFFFF" } name='qrcode' size={ 20 } />
          <Text style={{ color: "#FFF", marginLeft: 10 }} >
            Scan QR Code
          </Text>
        </Button>
      </View>

    </View>
  )
}