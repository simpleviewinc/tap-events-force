import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { Message, View } from 'SVComponents'
import { List } from 'material-bread'
import { FBService } from 'SVServices/firebase'

export const MessagesList = props => {
  const theme = useTheme()
  const { messages, styles } = props

  useEffect(() => {

    !FBService.initialized && FBService.initialize()

  }, [ messages ])

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
          { messages.map((message, index) => (
            <Message
              key={ message.id }
              message={ message }
              index={ index }
              styles={ get(styles, [ 'message' ]) }
            />
          )) }
        </List>
      </ScrollView>
    </View>
  )
  
}

export const Messages = connect(({ items }) => ({
  messages: items && items.messages || []
}))(MessagesList)