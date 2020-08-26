import React, { useState } from 'react'
import { useTheme, useDimensions } from '@svkeg/re-theme'
import { View, Modal, Text } from 'SVComponents'
import { removeModal } from 'SVActions'
import PropTypes from 'prop-types'
import { EVFIcons } from 'SVIcons'

/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.theme - presenter theme from global theme
 * @param {object} props.setDismissed - used to state the modals visible state for animation
 * @param {boolean=} props.hasCloseButton - display the close button on top right or not
 */
const Header = ({ title, styles, setDismissed, hasCloseButton = true }) => {
  return (
    <View
      dataSet={BaseModal.dataSet.content.header.main}
      style={styles?.main}
    >
      <Text
        dataSet={BaseModal.dataSet.content.header.content.text}
        style={styles?.content?.title}
        numberOfLines={2}
        ellipsizeMode={'tail'}
      >
        { title }
      </Text>
      { hasCloseButton && (
        <View
          style={styles?.content?.closeButton?.main}
          dataSet={BaseModal.dataSet.content.header.content.closeButton.main}
        >
          <EVFIcons.Close
            dataSet={
              BaseModal.dataSet.content.header.content.closeButton.content
            }
            onPress={() => setDismissed(true)}
          />
        </View>
      ) }
    </View>
  )
}

export const contentDefaultMaxHeight = 772
/**
 *
 * @param {object} props
 * @param {object} props.styles
 * @param {boolean} props.visible
 * @param {Component} props.BodyComponent - Component for the body. contains 'setDismissed' prop if the child wants to be able to dismiss the modal by other means other than close button || backdrop click
 * @param {boolean} props.hasCloseButton - to display the close button on the header or not
 * @example
 *  <BaseModal
 *    title={'Modal Title'}
 *    BodyComponent={({ setDismissed }) => <Button onPress={setDismissed} /> }
 *  />
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
  const [ dismissed, setDismissed ] = useState(false)
  const theme = useTheme()
  const dim = useDimensions()
  const maxHeight =
    dim.height <= contentDefaultMaxHeight ? '90%' : contentDefaultMaxHeight

  const baseStyles = theme.join(theme.get('modal.base'), styles)

  return (
    <Modal
      styles={{ content: { ...baseStyles.content.main, maxHeight } }}
      visible={visible && !dismissed}
      onAnimateOut={dismissed ? removeModal : null}
      onBackdropTouch={() => setDismissed(true)}
    >
      <Header
        title={title}
        styles={baseStyles.content.header}
        setDismissed={setDismissed}
        hasCloseButton={hasCloseButton}
      />

      { BodyComponent && <BodyComponent setDismissed={setDismissed} /> }
    </Modal>
  )
}

BaseModal.dataSet = {
  main: { class: `base-modal-main` },
  content: {
    header: {
      main: { class: 'base-modal-content-header-main' },
      content: {
        text: { class: 'base-modal-content-header-content-text' },
        closeButton: {
          main: {
            class: 'base-modal-content-header-content-close-button-main',
          },
          content: {
            class: 'base-modal-content-header-content-close-button-content',
          },
        },
      },
    },
  },
}

BaseModal.propTypes = {
  styles: PropTypes.object,
  visible: PropTypes.bool,
  BodyComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  hasCloseButton: PropTypes.bool,
}
