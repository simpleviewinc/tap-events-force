import React, { useState } from 'react'
import { withTheme } from 're-theme'
import { View, Button, Text } from 'SVComponents'
import { get } from 'jsutils'
import { TextField } from 'material-bread';

const onClick = value => evt => {
  console.log(`---------- Pass to an message action ----------`)
  console.log(value)
}

export const WriteMessage = withTheme(props => {
  const { theme, styles } = props
  const [ inputVal, setVal ] = useState('')

  return (
    <View 
      style={
        theme.join(
          get(theme, [ 'chat', 'input', 'container' ]),
          get(styles, [ 'input', 'container' ]),
        )
      }
    >
      <View
        style={
          theme.join(
            get(theme, [ 'chat', 'input', 'wrapper' ]),
            get(styles, [ 'input', 'wrapper' ])
          )
        }
      >
        <TextField
          containerStyle={
            theme.join(
              get(theme, [ 'chat', 'input', 'textField', 'wrapper' ]),
              get(styles, [ 'textField', 'wrapper' ]),
            )
          }
          style={
            theme.join(
              get(theme, [ 'chat', 'input', 'textField', 'field' ]),
              get(styles, [ 'textField', 'field' ]),
            )
          }
          label={ global.__PLATFORM__ == 'web' && 'Enter Message' || '' }
          value={inputVal}
          onChangeText={ setVal }
        />
      </View>
      <Button
        style={
          theme.join(
            get(theme, [ 'chat', 'input', 'button' ]),
            get(styles, [ 'button' ]),
          )
        }
        onPress={ onClick(inputVal) }
      >
        <Text style={{ color: "#ffffff" }} >
          Submit
        </Text>
      </Button>
    </View>
  )
})