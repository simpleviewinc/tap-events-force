import React from 'react'
import { getPresenterFullName } from 'SVUtils/models'
import { useSessionPresenters } from 'SVHooks/models'
import { Row, View } from '@keg-hub/keg-components'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { PresenterLink } from 'SVComponents/presenters/presenterLink'
import { EVFIcons } from 'SVIcons'

const iconLayout = { alS: 'start' }

const GroupIcon = reStyle(EVFIcons.Users)(
  { ...iconLayout, mR: 9 }, 
  theme => ({ 
    color: theme.colors.iconGray,
    width: 30,
    height: 28,
  })
)

const SingleIcon = reStyle(EVFIcons.User)(
  { ...iconLayout, mR: 9 }, 
  theme => ({
    color: theme.colors.iconGray,
    width: 21,
    height: 28,
  })
)

const Icon = ({ count }) => (count <= 0)
  ? null
  : count === 1
    ? <SingleIcon />
    : <GroupIcon />

const StyledPresenterLink = reStyle(PresenterLink, 'styles')({ m: 0, })

const CenteredRow = reStyle(View)({ flD: 'row', alI: 'center', alS: 'start' })

const RowWrap = reStyle(View)({ flD: 'row', flWr: 'wrap', w: '100%' })

/**
 * Helper for SessinPresenterRow
 * @param {Presenter} presenter 
 * @param {Number} idx - index in row
 * @param {Number} count - total number of presenters
 * @returns {String} display text for presenter
 */
const getPresenterDisplayText = (presenter, idx, count) => {
  const fullName = getPresenterFullName(presenter)
  const includeComma = (idx !== count - 1) && (count > 1)
  return fullName + (includeComma ? ', ' : '')
}

/**
 * Row of presenters each with link to corresponding details modal
 */
export const SessionPresentersRow = React.memo(
  ({ session, textClassName = 'ef-sessions-presenter-link', icon, ...viewProps }) => {
    if (!session) return null

    const presenters = useSessionPresenters(session)
    const presenterCount = presenters?.length || 0

    return (
      <CenteredRow {...viewProps}>
        { icon && <Icon count={presenterCount} /> }
        <RowWrap>
        { presenters.map((presenter, idx) => {
          const nameDisplay = getPresenterDisplayText(presenter, idx, presenterCount)
          return (
            <StyledPresenterLink
              text={nameDisplay}
              presenter={presenter}
              className={textClassName}
              key={presenter.identifier}
            />
          )
        }) }
        </RowWrap>
      </CenteredRow>
    )
  }
)
