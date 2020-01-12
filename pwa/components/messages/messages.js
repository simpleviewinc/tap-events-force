import React from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import { Message } from 'SVComponents'
import { List } from 'material-bread'

export const MessagesList = props => {
  
  const { messages } = props

  return (
    <List>
      { messages.map((message, index) => <Message key={ message.id } message={ message } index={ index } />) }
    </List>
  )
  
}

export const Messages = connect(({ items }) => ({
  messages: items && items.messages || []
}))(withTheme(MessagesList))