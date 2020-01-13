import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { Message, View } from 'SVComponents'
import { List } from 'material-bread'
import { initDB, getCollection } from 'SVActions'
import { Values, ActionTypes } from 'SVConstants'
import { sortMessages } from 'SVUtils'

/**
 * Component to List all message pulled in form the store
 * @param {*} props
 *
 * @returns {React Component}
 */
export const MessagesList = props => {

  const theme = useTheme()
  const { settings, user, styles } = props
  const messages = sortMessages(props.messages)
  const dbInit = settings[ActionTypes.DB_INIT]

  useEffect(() => {
    initDB()

    dbInit &&
      !Object.keys(messages).length &&
      getCollection(Values.categories.messages, true)

  }, [ dbInit ])

  return (
    <View
      style={theme.join(
        get(theme, [ 'messages', 'container' ]),
        get(styles, [ 'container' ])
      )}
    >
    <ScrollView>
        <List
          style={theme.join(
            get(theme, [ 'messages', 'list' ]),
            get(styles, [ 'list' ])
          )}
        >
          { Object.entries(messages).map(([ id, message ]) => (
            <Message
              user={ user }
              key={ id }
              message={ message }
              styles={ get(styles, [ 'message' ]) }
            />
          )) }
        </List>
      </ScrollView>
    </View>
  )
  
}

export const Messages = connect(({ items }) => ({
  messages: items[Values.categories.messages] || {},
  settings: items[Values.categories.settings] || {},
  user: items[Values.categories.user] || {},
  recipient: items[Values.categories.recipient] || {},
}))(MessagesList)
