import { pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'

/**
 * returns the location object for a given session or undefined
 * @param {import('SVModels/session').Session} session
 * @returns {import('SVModels/location').Location=}
 */
export const useSessionLocation = session => {
  const { locations } = useSelector(
    ({ items }) => pickKeys(items, ['locations']),
    shallowEqual
  )
  return locations.filter(
    location => location.identifier === session?.locationIdentifier
  )[0]
}
