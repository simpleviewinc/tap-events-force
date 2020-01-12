import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import { View } from 'SVComponents'
import { Messages } from 'SVComponents/messages'
import { MessageInput } from 'SVComponents/message'
import { get } from 'jsutils'

const Chat = props => {
  const { theme } = props
  
  return (
    <View stlye={ get(theme, [ 'chat', 'container' ], {}) } >
      <Messages />
      <MessageInput />
    </View>
  )
  
}

export const ChatContainer = connect(({ app, tap, items }) => ({
  app,
  tap,
  items
}))(withTheme(Chat))

