import React from 'react'
import { getPresenterFullName } from 'SVUtils/models'
import { useSessionPresenters } from 'SVHooks/models'
import { View, Text } from '@keg-hub/keg-components'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { EVFIcons } from 'SVIcons'

const PresenterText = reStyle(Text)({
  $xsmall: {
    lnH: 24,
    ftSz: 14,
  },
  $small: {
    ftSz: 16,
  },
})

const ItemView = reStyle(View)({
  $xsmall: {
    flD: 'row',
    alI: 'center',
    mT: 8,
  },
  $small: {
    mT: 20,
  },
})

const PresenterIcon = reStyle(EVFIcons.User)({ mR: 10, w: 3, h: 4 }, theme => ({
  fill: theme.colors.iconGray,
}))

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
  ({ session, textClassName, icons = false, ...viewProps }) => {
    if (!session) return null

    const presenters = useSessionPresenters(session)

    return (
      <View {...viewProps}>
        { presenters.map(presenter => {
          const fullName = getPresenterFullName(presenter)
          return (
            <PresenterItem
              presenterName={fullName}
              textClassName={textClassName || 'ef-sessions-presenter'}
              key={presenter.identifier}
            />
          )
        }) }
      </View>
    )
  }
)
