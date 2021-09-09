import React from 'react'
import { getPresenterFullName } from 'SVUtils/models'
import { useSessionPresenters } from 'SVHooks/models'
import { Row, View, Text } from '@keg-hub/keg-components'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'
import { PresenterLink } from 'SVComponents/presenters/presenterLink'

const ItemView = reStyle(View)((_, props) => ({
  mT: props.isFirst ? 0 : 1,
  flD: 'row',
  alI: 'center',
}))

const PresenterIcon = reStyle(EVFIcons.User)({ mR: 10 }, theme => ({
  fill: theme.colors.iconGray,
  width: 14,
  height: 16,
}))

const PresenterText = reStyle(Text)({
  $xsmall: { lnH: 24, ftSz: 14 },
  $small: { ftSz: 16 },
})

/**
 * @param {boolean} showIcon - show user icon if true
 * @param {String} presenterName
 * @param {String} textClassName - className for presenter text
 * @param {*} ...props - remaining props passed to ItemView
 */
const PresenterItem = ({ presenterName, textClassName, ...viewProps }) => {
  return (
    <ItemView {...viewProps}>
      <PresenterIcon />
      <PresenterText className={textClassName}>{ presenterName }</PresenterText>
    </ItemView>
  )
}

/**
 * Displays the full details of presenter(s) for the given session (name and profession)
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {object} props.textClassName
 */
export const SessionPresenters = React.memo(
  ({ session, textClassName = 'ef-sessions-presenter', ...viewProps }) => {
    if (!session) return null

    const presenters = useSessionPresenters(session)

    return (
      <View {...viewProps}>
        { presenters.map((presenter, idx) => {
          const fullName = getPresenterFullName(presenter)
          return (
            <PresenterItem
              isFirst={idx === 0}
              presenterName={fullName}
              textClassName={textClassName}
              key={presenter.identifier}
            />
          )
        }) }
      </View>
    )
  }
)

const StyledPresenterLink = reStyle(
  PresenterLink,
  'styles'
)({
  m: 0,
})

export const SessionPresentersRow = React.memo(
  ({ session, textClassName = 'ef-sessions-presenter-link', ...viewProps }) => {
    if (!session) return null

    const presenters = useSessionPresenters(session)
    return (
      <Row {...viewProps}>
        { presenters.map((presenter, idx) => {
          const fullName = getPresenterFullName(presenter)
          const includeComma =
            idx !== presenters.length - 1 && presenters.length > 1
          const nameDisplay = fullName + (includeComma ? ', ' : '')
          return (
            <StyledPresenterLink
              presenter={presenter}
              className={textClassName}
              key={presenter.identifier}
            >
              { nameDisplay }
            </StyledPresenterLink>
          )
        }) }
      </Row>
    )
  }
)
