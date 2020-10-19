import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

/**
 * Returns an array of presenters for a given session
 * @param {import('SVModels/session').Session} session
 * @returns {Array.<import('SVModels/presenter').Presenter>}
 */
export const useSessionPresenters = session => {
  const presenters = useStoreItems('presenters')
  return useMemo(() => {
    return presenters.filter(presenter =>
      session?.presenterIdentifiers?.includes(presenter.identifier)
    )
  }, [ session, presenters ])
}
