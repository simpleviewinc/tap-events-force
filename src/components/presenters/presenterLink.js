import React from 'react'
import { SessionLink } from 'SVComponents/sessionLink'
import { getPresenterFullName } from 'SVUtils/models'
import PropTypes from 'prop-types'

/**
 * PresenterLink
 * Clickable Presenter name that opens the presenter details modal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.styles
 */
export const PresenterLink = ({
  text,
  presenter,
  className,
  showPresenterDetailsModal,
}) => {
  const linkText = text || getPresenterFullName(presenter)

  const classNames = [ 'ef-sessions-presenter-link', className ].join(' ')

  return (
    <SessionLink
      containerClassName='ef-sessions-presenter-link-container'
      className={classNames}
      key={presenter.identifier}
      text={linkText}
      onPress={() => showPresenterDetailsModal(presenter.identifier)}
    />
  )
}

PresenterLink.propTypes = {
  presenter: PropTypes.object.isRequired,
  styles: PropTypes.object,
}
