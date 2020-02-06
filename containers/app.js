import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { useSelector } from 'react-redux'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useFirestoreWatch } from 'SVUtils/hooks'
import { CameraCapture } from 'SVComponents/cameraCapture.web' 

const collections = [ Values.categories.event, Values.categories.sessions ]

const AppContainer = props => {

  const theme = useTheme()

  // loads and starts watching the collections. Placing here until we start working on the screens.
  useFirestoreWatch(collections)

  const appCollections = {
    sessions: useSelector(store => store.items.sessions) || {},
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
      <CameraCapture />
    </View>
  )
}

export default AppContainer
