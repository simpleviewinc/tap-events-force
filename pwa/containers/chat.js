import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import { View, Messages, WriteMessage } from 'SVComponents'
import { get } from 'jsutils'

const Chat = props => {
  const { theme } = props

  return (
    <View stlye={ get(theme, [ 'chat', 'container' ], {}) } >
      <Messages />
      <WriteMessage />
    </View>
  )
  
}

export const ChatContainer = connect(({ app, tap, items }) => ({
  app,
  tap,
  items
}))(withTheme(Chat))

