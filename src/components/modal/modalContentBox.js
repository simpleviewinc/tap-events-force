import React from 'react'
import { useTheme } from 're-theme'
import { Button, Text, View } from 'keg-components'
import PropTypes from 'prop-types'

/**
 * The pop-up box that appears in the confirm modal
 * @param {Object} props 
 * @param {Function} props.onDismiss - callback that runs when user requests modal close
 * @param {String} props.title - title of modal
 * @param {String} props.text - content text of modal
 */
export const ModalContentBox = ({ onDismiss, title, text }) => {
  const theme = useTheme()
  return (
    <>
      <Text style={ theme.modal.title }>{ title }</Text>

      <View style={ theme.modal.textContainer }>
        <Text 
          numberOfLines={4}
          style={ theme.modal.text }> 
            { text } 
        </Text>
      </View>

      <Button 
        style={theme.modal.button}
        onPress={onDismiss}>
          Okay
      </Button>
    </>
  )
}

ModalContentBox.propTypes = {
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}