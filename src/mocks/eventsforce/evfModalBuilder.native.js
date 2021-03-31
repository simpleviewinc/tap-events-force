// IMPORTANT - should not be imported into the main sessions component export
// This is for DEVELOPMENT only

import React from 'react'
import { Modal, Card } from '@keg-hub/keg-components'

/**
 * Placeholder component for rendering on Mobile
 * @param {object} props
 * @param {object} props.styles - styles obj
 * @param {string} props.dayText - Text to display the day number and name
 * @param {string} props.dayNum - Day number of the current section
 * @param {boolean} props.hasSessions - If the section has sessions
 * @param {boolean} props.isMobile - If the viewport is mobile sized
 */
export const evfModalBuilder = parentProps => {
  return ({ modalHeader, modalBody, modalFooter, toggle, isOpen }) => {
    const cardProps = {}
    modalHeader && (cardProps.Header = modalHeader)
    modalFooter && (cardProps.Footer = modalFooter)

    return (
      <Modal
        {...parentProps}
        isOpen={isOpen}
        toggle={toggle}
      >
        <Card {...cardProps}>{ modalBody }</Card>
      </Modal>
    )
  }
}
