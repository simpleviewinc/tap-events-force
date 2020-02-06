import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { useSelector } from 'react-redux'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useFirestoreWatch, useCollection } from 'SVUtils/hooks'

const { events, sessions } = Values.categories
const collections = [ events, sessions ]

const AppContainer = props => {

  const theme = useTheme()

  // loads and starts watching the collections. Placing here until we start working on the screens.
  const appCollections = {
    'events': useCollection({ name: events, subscribe: true }, []),
    'sessions': useCollection({ name: sessions, subscribe: true }, [])
  }

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      {
        collections.map(coll => (
          <React.Fragment key={coll}>

            <Text>{ `Number of ${coll}:`}</Text>

            <Text>{ Object.keys(appCollections[coll]).length } </Text>

          </React.Fragment>
        ))
      }
    </View>
  )
}

export default AppContainer
