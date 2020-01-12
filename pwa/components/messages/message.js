import React from 'react'
import { withTheme } from 're-theme'
import { ListItem, Divider } from 'material-bread'
import { P, SubtitleAlt, View } from 'SVComponents'
import { get } from 'jsutils'

export const Message = withTheme(props => {
  const { message, theme, styles, index } = props
  const isFrom = Boolean(index % 2)
  

  return (
    <ListItem>
      <View 
        style={theme.join(
          get(theme, [ 'messages', 'message', 'container' ]),
          get(theme, [ 'messages', 'message', isFrom && 'fromContainer' || 'toContainer' ]),
          styles && get(styles, [ 'container' ])
        )}
      >
        <SubtitleAlt style={ get(theme, [ 'messages', 'message', 'title' ]) } >
          { message.from }
        </SubtitleAlt>
        <Divider style={ get(theme, [ 'messages', 'message', 'divider' ]) } />

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
  
})