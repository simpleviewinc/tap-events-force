import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { CameraCaptureInput, CameraCaptureLive } from 'SVComponents/cameraCapture' 
import { useCollection } from 'SVUtils/hooks'

const AppContainer = props => {
  const theme = useTheme()

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <CameraCaptureInput />
      {/* <CameraCaptureLive /> */}
    </View>
  )
}

const { events, sessions } = Values.categories

export const Test = () => {
  // loads and starts watching the collections.
  // Placing this here until we start working on the screens that will have their own containers to call these functions.
  const collections = {
    [events]: useCollection(events),
    [sessions]: useCollection(sessions),
  }

  return <View>
    [ events, sessions ].map(coll => (
      <React.Fragment key={coll}>
        <Text>{ `Number of ${coll}:`}</Text>
        <Text>{ Object.keys(collections[coll]).length } </Text>
      </React.Fragment>
    ))
  </View>
}


export default AppContainer
