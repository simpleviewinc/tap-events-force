import React from 'react';
import { Text, View, Button } from 'SVComponents'
import { useTheme } from 're-theme'
import PropTypes from 'prop-types'

/**
 * Simple popup modal in absolute positioning with a title, text, and dismiss button.
 * @param {Object} props
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Function} props.onDismiss - the function to execute when the user selects the dismiss button
 * @param {String} props.title 
 * @param {String} props.text 
 */
export const Modal = ({ visible=false, onDismiss, title, text }) => {
  const theme = useTheme()
  return visible
    ? (
      <View style={ { ...theme.modal.view, ...boxShadow } }>

        <Text style={ theme.modal.title }>{ title }</Text>

        <View style={ theme.modal.textContainer }>
            <Text 
              numberOfLines={4}
              style={ theme.modal.text }> { text } </Text>
        </View>

        <Button 
          style={theme.modal.button}
          text='Okay'
          onPress={onDismiss} />

      </View>
    )
    : null
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}

// use theme.shadow.popup instead once the stringify/px issue is resolved
const boxShadow = {
  elevation: 15, // android
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0.5 },
  shadowOpacity: 0.3,
  shadowRadius: 9,
}
