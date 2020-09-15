import React, { useState, useEffect } from 'react'
import { View, Modal, Text } from '@keg-hub/keg-components'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { removeModal } from 'SVActions'
import PropTypes from 'prop-types'
import { EVFIcons } from 'SVIcons'

/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.styles
 * @param {object} props.dataSet
 * @param {object} props.setDismissed - used to state the modals visible state for animation
 * @param {boolean=} props.hasCloseButton - display the close button on top right or not
 */
const Header = ({
  title,
  styles,
  setDismissed,
  hasCloseButton = true,
  dataSet,
}) => {
  return (
    <View
      dataSet={dataSet.header.main}
      style={styles?.main}
    >
      <Text
        dataSet={dataSet.header.content.text}
        style={styles?.content?.title}
        numberOfLines={2}
        ellipsizeMode={'tail'}
      >
        { title }
      </Text>
      { hasCloseButton && (
        <View
          style={styles?.content?.closeButton?.main}
          dataSet={dataSet.header.content.closeButton.main}
        >
          <EVFIcons.Close
            dataSet={dataSet.header.content.closeButton.content}
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
 * @param {object} props.title
 * @param {object} props.styles
 * @param {boolean} props.visible
 * @param {Component} props.children
 * @param {React.MutableRefObject=} props.dissmissedCBRef - pass this in when you want to dismiss modal from child
 *                                                        -  call `childRef.current(true)` to dismiss
 * @param {Component} props.BodyComponent - Component for the body. contains 'setDismissed' prop if the child wants to be able to dismiss the modal by other means other than close button || backdrop click
 * @param {boolean=} props.hasCloseButton - to display the close button on the header or not
 * @example
 *  <BaseModal
      dissmissedCBRef={dismissedCBRef}
      styles={errorStyles}
      title={title}
      visible={visible}
    >
      <Children />
    </BaseModal>
 */
export const BaseModal = props => {
  const {
    title,
    visible,
    hasCloseButton,
    styles,
    dissmissedCBRef,
    children,
  } = props
  // two possible cases for a non visible modal
  // 1. modal is mounted/in store but has been animated out of view by another modal
  // 2. modal has been removed from the store
  const [ dismissed, setDismissed ] = useState(false)
  useEffect(() => {
    if (dissmissedCBRef) {
      dissmissedCBRef.current = setDismissed
      return () => {
        dissmissedCBRef.current = undefined
      }
    }
  }, [ setDismissed, dissmissedCBRef ])

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
        dataSet={BaseModal.dataSet.content}
        title={title}
        styles={baseStyles.content.header}
        setDismissed={setDismissed}
        hasCloseButton={hasCloseButton}
      />

      { children }
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