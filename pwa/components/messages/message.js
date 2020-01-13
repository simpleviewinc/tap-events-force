import React from 'react'
import { useTheme } from 're-theme'
import { ListItem, Divider } from 'material-bread'
import { P, SubtitleAlt, View } from 'SVComponents'
import { get } from 'jsutils'
import { removeDoc } from 'SVActions'

/**
 * Handler for when a message is clicked, to remove the message from the DB
 * @param {Object} message - Message object from the DB
 *
 * @returns {function} - Function to run when the message is clicked
 */
const onClick = (message) => {
  return evt => removeDoc(message.id, message.collection)
}

/**
 * Component to List all message pulled in form the store
 * @param {*} props
 *
 * @returns {React Component}
 */
export const Message = props => {
  const theme = useTheme()
  const { message, styles, user } = props
  const isFrom = message.from == user.name

  return (
    <ListItem
      onPress={ onClick(message) }
      style={theme.join(
        get(theme, [ 'messages', 'message', isFrom && 'fromItem' || 'toItem' ]),
        styles && get(styles, [ 'item' ])
      )}
    >
      <View 
        style={theme.join(
          get(theme, [ 'messages', 'message', 'container' ]),
          get(theme, [ 'messages', 'message', isFrom && 'fromContainer' || 'toContainer' ]),
          styles && get(styles, [ 'container' ])
        )}
      >
        <SubtitleAlt
          style={ theme.join(
            get(theme, [ 'messages', 'message', 'title' ]),
            styles && get(styles, [ 'title' ])
          )}
        >
          { message.from }
        </SubtitleAlt>

        <Divider
          style={ theme.join(
            get(theme, [ 'messages', 'message', 'divider' ]),
            styles && get(styles, [ 'divider' ])
          )}
        />

        <P style={ theme.join(
          get(theme, [ 'messages', 'message', 'content' ]),
          get(theme, [ 'messages', 'message', isFrom && 'fromContent' || 'toContent' ]),
          styles && get(styles, [ 'content' ])
        )} >
          { message.content }
        </P>

      </View>
    </ListItem>
  )
}
