import React from 'react'
import { SessionLink } from 'SVComponents/sessionLink'
import { useCreateModal } from 'SVHooks/modal'
import { Values } from 'SVConstants'
import { getPresenterFullName } from 'SVUtils/models'
import PropTypes from 'prop-types'

/**
 * PresenterLink
 * Clickable Presenter name that opens the presenter details modal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.styles
 */
export const PresenterLink = ({ text, presenter, styles, className }) => {
  const displayDetailsModal = useCreateModal(
    Values.MODAL_TYPES.PRESENTER,
    presenter
  )

  const linkText = text || getPresenterFullName(presenter)

  const classNames =
    'ef-sessions-presenter' + (className ? ` ${className}` : '')

  return (
    <SessionLink
      className={classNames}
      styles={styles}
      key={presenter.identifier}
      text={linkText}
      onPress={displayDetailsModal}
    />
  )
}

PresenterLink.propTypes = {
  presenter: PropTypes.object.isRequired,
  styles: PropTypes.object,
}
