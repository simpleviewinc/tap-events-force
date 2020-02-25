import React from 'react';
import { Text, View } from 'SVComponents'
import PropTypes from 'prop-types'

/**
 * Not yet implemented on native. confirmModal.web should be multiplatform, but the dependency
 * 'modal-enhanced-react-native-web' tries importing react-native-web and react-dom which fail.
 * Stubbing this for now.
 */
export const ConfirmModal = ({ visible=false, onDismiss, title, text }) => {
  return visible && (
    <View>
      <Text>
        Not yet implemented on native
      </Text>    
    </View>
  )
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}
