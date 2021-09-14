import React from 'react'
import { getPresenterFullName, getPresenterProfession } from 'SVUtils/models'
import { useSessionPresenters } from 'SVHooks/models'
import { View, Text } from '@keg-hub/keg-components'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const PresenterText = reStyle(Text)({
  $xsmall: {
    mT: 8,
    ftSz: 14,
  },
  $small: {
    mT: 20,
    ftSz: 16,
  }
})

/**
 * Displays the full details of presenter(s) for the given session (name and profession)
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {object} props.textClassName
 */
export const SessionPresenters = React.memo(({ session, textClassName }) => {
  if (!session) return null

  const presenters = useSessionPresenters(session)

  return (
    <View>
      { presenters.map(presenter => {
        const fullName = getPresenterFullName(presenter)
        const profession = getPresenterProfession(presenter)
        return (
          <PresenterText
            className={textClassName || 'ef-sessions-presenter'}
            key={presenter.identifier}
          >
            { `${fullName}${profession && `, ${profession}`}` }
          </PresenterText>
        )
      }) }
    </View>
  )
})
