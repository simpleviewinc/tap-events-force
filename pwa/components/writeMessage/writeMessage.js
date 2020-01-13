import React, { useState } from 'react'
import { useTheme } from 're-theme'
import { connect } from 'react-redux'
import { View, Button, Text } from 'SVComponents'
import { get, checkCall } from 'jsutils'
import { TextField } from 'material-bread';
import { Values } from 'SVConstants'
import { buildMessage } from 'SVUtils'
import { upsertDoc } from 'SVActions'

/**
 * Handler for when the message submit button is pressed
 * @param {string} value - Current value of the input field
 * @param {*} user - Current local user
 * @param {*} recipient - User to send the message to
 *
 * @returns {function} - Function to run when the submit button is clicked
 */
const onClick = (value, user, recipient) => evt => {
  const message = checkCall(buildMessage, value, user, recipient)
  upsertDoc(message)  
}

/**
 * Component to Write a new message
 * @param {*} props
 *
 * @returns {React Component}
 */
export const Write = props => {
  const theme = useTheme()
  const { styles, user, recipient } = props
  const [ inputVal, setVal ] = useState('')

  return (
    <View 
      style={
        theme.join(
          get(theme, [ 'write', 'input', 'container' ]),
          get(styles, [ 'input', 'container' ]),
        )
      }
    >
      <View
        style={
          theme.join(
            get(theme, [ 'write', 'input', 'wrapper' ]),
            get(styles, [ 'input', 'wrapper' ])
          )
        }
      >
        <TextField
          containerStyle={
            theme.join(
              get(theme, [ 'write', 'input', 'textField', 'wrapper' ]),
              get(styles, [ 'textField', 'wrapper' ]),
            )
          }
          style={
            theme.join(
              get(theme, [ 'write', 'input', 'textField', 'field' ]),
              get(styles, [ 'textField', 'field' ]),
            )
          }
          type={'outlined'}
          label={ global.__PLATFORM__ == 'web' && 'Enter Message' || '' }
          value={inputVal}
          onChangeText={ setVal }
        />
      </View>
      <Button
        style={
          theme.join(
            get(theme, [ 'write', 'input', 'button' ]),
            get(styles, [ 'button' ]),
          )
        }
        onPress={ onClick(inputVal, user, recipient) }
      >
        <Text
          style={ theme.join(
            get(theme, [ 'write', 'input', 'buttonText' ]),
            get(styles, [ 'buttonText' ]),
          )}
        >
          Submit
        </Text>
      </Button>
    </View>
  )
}

export const WriteMessage = connect(({ items }) => ({
  settings: items[Values.categories.settings] || {},
  user: items[Values.categories.user] || {},
  recipient: items[Values.categories.recipient] || {},
}))(Write)
