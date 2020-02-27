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
 * @param {String} props.dismissText - content text of dismiss button
 */
export const ModalContentBox = (props) => {
  const {
    onDismiss, 
    title, 
    text,
    dismissText='Okay'
  } = props

  const theme = useTheme()

  return (
    <>
      <Text style={ theme.get('modal.title') }>{ title }</Text>

      <View style={ theme.get('modal.textContainer') }>
        <Text 
          numberOfLines={4}
          style={ theme.get('modal.text') }> 
            { text } 
        </Text>
      </View>

      <Button 
        style={ theme.get('modal.button') }
        onPress={ onDismiss }>
          { dismissText }
      </Button>
    </>
  )
}

ModalContentBox.propTypes = {
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}