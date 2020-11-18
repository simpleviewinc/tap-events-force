import React, { useState, useEffect, useCallback } from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'
import { EVFIcons } from 'SVIcons'
import { ModalContext } from 'SVComponents/modals/modalContext'

/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.styles
 * @param {object} props.setDismissed - used to state the modals visible state for animation
 * @param {boolean=} props.hasCloseButton - display the close button on top right or not
 */
const Header = ({ title, styles, setDismissed, hasCloseButton = true }) => {
  return (
    <View
      className={`ef-modal-title`}
      style={styles?.main}
    >
      <Text
        className={`ef-modal-title-text`}
        style={styles?.content?.title}
        numberOfLines={2}
        ellipsizeMode={'tail'}
      >
        { title }
      </Text>
      { hasCloseButton && (
        <View
          className={`ef-button-close`}
          style={styles?.content?.closeButton?.main}
        >
          <EVFIcons.Close onPress={setDismissed} />
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
 * @param {React.MutableRefObject=} props.dismissedCBRef - pass this in when you want to dismiss modal from child
 *                                                        -  call `childRef.current(true)` to dismiss
 * @param {Component} props.BodyComponent - Component for the body. contains 'setDismissed' prop if the child wants to be able to dismiss the modal by other means other than close button || backdrop click
 * @param {boolean=} props.hasCloseButton - to display the close button on the header or not
 * @param {Function=} props.onDismiss - function to call when the modal is being dismissed
 * @param {number?} props.index - index of this modal in the modal stack. Define it to ensure that the right modal
 * is removed from the modal stack when this modal is dismissed.
 * @example
 *  <BaseModal
      dismissedCBRef={dismissedCBRef}
      styles={errorStyles}
      title={title}
      visible={visible}
      index={modalStackIndex}
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
    dismissedCBRef,
    children,
    onDismiss,
    index,
  } = props
  // two possible cases for a non visible modal
  // 1. modal is mounted/in store but has been animated out of view by another modal
  // 2. modal has been removed from the store
  const [ dismissed, setDismissed ] = useState(false)
  useEffect(() => {
    if (dismissedCBRef) {
      dismissedCBRef.current = setDismissed
      return () => {
        dismissedCBRef.current = undefined
      }
    }
  }, [ setDismissed, dismissedCBRef ])

  const theme = useTheme()
  const baseStyles = theme.join(theme.get('modal.base'), styles)
  const onModalClose = useCallback(() => {
    checkCall(onDismiss, true)
    setDismissed(true)
    removeModal(index)
  }, [ setDismissed, onDismiss ])

  return (
    <ModalContext.Consumer>
      { ModalComponent => {
        return (
          <ModalComponent
            modalHeader={
              <Header
                title={title}
                styles={baseStyles.content.header}
                setDismissed={onModalClose}
                hasCloseButton={hasCloseButton}
              />
            }
            modalBody={
              <View style={baseStyles.content.bodyWrapper}>{ children }</View>
            }
            toggle={onModalClose}
            isOpen={visible && !dismissed}
          />
        )
      } }
    </ModalContext.Consumer>
  )
}

BaseModal.propTypes = {
  styles: PropTypes.object,
  visible: PropTypes.bool,
  BodyComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  hasCloseButton: PropTypes.bool,
  index: PropTypes.number,
}
