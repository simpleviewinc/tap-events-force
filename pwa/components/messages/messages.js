import React from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'

export const MessagesList = props => {
  
  return (
    <ul>
      <li>
        message list
      </li>
    </ul>
  )
  
}

export const Messages = connect(({ items }) => ({
  items
}))(withTheme(MessagesList))