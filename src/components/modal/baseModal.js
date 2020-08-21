import React, { useState } from 'react'
import { useTheme, useDimensions } from '@simpleviewinc/re-theme'
import { View, Text } from 'react-native'
import { TouchableIcon, Modal } from 'SVComponents'
import { removeModal } from 'SVActions'
/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.theme - presenter theme from global theme
 * @param {object} props.setMount - used to state the modals visible state for animation
 * @param {boolean=} props.hasCloseButton - display the close button on top right or not
 */
const Header = ({ title, styles, setMount, hasCloseButton = true }) => {
  return (
    <View style={styles?.main}>
      <Text
        style={styles?.content?.title}
        numberOfLines={1}
      >
        { title }
      </Text>
      { hasCloseButton && (
        <View style={styles?.content?.closeButton}>
          <TouchableIcon
            onPress={() => setMount(false)}
            name={'close'}
            color={'white'}
            size={22}
          />
        </View>
      ) }
    </View>
  )
}

const modalMaxHeight = 772
/**
 *
 * @param {object} props
 * @param {object} props.styles
 */
export const BaseModal = ({
  title,
  visible,
  BodyComponent,
  hasCloseButton,
  styles,
}) => {
  // two possible cases for a non visible modal
  // 1. modal is mounted/in store but has been animated out of view by another modal
  // 2. modal has been removed from the store
  const [ mount, setMount ] = useState(true)
  const theme = useTheme()
  const dim = useDimensions()
  const maxHeight = dim.height <= modalMaxHeight ? '90%' : modalMaxHeight

  const baseStyles = theme.join(theme.get('modal.base'), styles)

  return (
    <Modal
      styles={{ content: { ...baseStyles.content.main, maxHeight } }}
      visible={visible && mount}
      onAnimateOut={mount ? null : removeModal}
      onBackdropTouch={() => setMount(false)}
    >
      <Header
        title={title}
        styles={baseStyles.content.header}
        setMount={setMount}
        hasCloseButton={hasCloseButton}
      />

      { BodyComponent }
    </Modal>
  )
}
