import { pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import { useMemo } from 'react'

/**
 * Returns an array of presenters for a given session
 * @param {import('SVModels/session').Session} session
 * @returns {Array.<import('SVModels/presenter').Presenter>}
 */
export const useSessionPresenters = session => {
  const { presenters = [] } = useSelector(
    ({ items }) => pickKeys(items, ['presenters']),
    shallowEqual
  )
  return useMemo(() => {
    return presenters.filter(presenter =>
      session?.presenterIdentifiers?.some(id => id === presenter.identifier)
    )
  }, [ session, presenters ])
}
