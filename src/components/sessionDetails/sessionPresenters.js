import React from 'react'
import { getPresenterFullName, getPresenterProfession } from 'SVUtils/models'
import { useSessionPresenters } from 'SVHooks/models'
import {View, Text} from '@keg-hub/keg-components'
import {useTheme} from '@keg-hub/re-theme'

/**
 * Displays the full details of presenter(s) for the given session (name and profession)
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 * @param {object} props.textClassName
 */
export const SessionPresenters = React.memo(({ session, styles, textClassName }) => {
  if (!session) return null

  const theme = useTheme()
  const sessionPresentersStyles = theme.get('sessionDetails.sessionPresenters', styles)

  const presenters = useSessionPresenters(session)
  // format: "[title] [firstname] [lastname], [job title] - [company]"
  return (
    <View style={sessionPresentersStyles.main}>
      { presenters.map(presenter => {
        const fullName = getPresenterFullName(presenter)
        const profession = getPresenterProfession(presenter)
        return (
          <Text
            className={textClassName || 'ef-sessions-presenter'}
            style={sessionPresentersStyles.text}
            key={presenter.identifier}
          >
            { `${fullName}${profession && `, ${profession}`}` }
          </Text>
        )
      }) }
    </View>
  )
})