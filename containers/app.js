import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { useSelector } from 'react-redux'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useFirestoreWatch } from 'SVUtils/hooks'

const collections = [
  Values.categories.messages,
  Values.categories.event,
  Values.categories.sessions
]

const AppContainer = props => {

  const theme = useTheme()

  // loads and starts watching the collections
  useFirestoreWatch(collections)

  const appCollections = {
    sessions: useSelector(store => store.items.sessions) || {},
    messages: useSelector(store => store.items.messages) || {},
    event: useSelector(store => store.items.event) || {},
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
            <Text>{ `Number of ${coll} keys:`}</Text>
            <Text>{ Object.keys(appCollections[coll]).length } </Text>
          </React.Fragment>
        ))
      }
    </View>
  )
}

export default AppContainer
