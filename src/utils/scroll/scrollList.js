import { devLog } from 'SVUtils/logs'
import { getPlatform } from '@keg-hub/keg-components'
import { noPropObj } from '@keg-hub/jsutils'

const isWeb = getPlatform() === 'web'

export const scrollList = (element, options = noPropObj) => {
  if (!isWeb || typeof window === 'undefined')
    return devLog.warn(
      'Can not call window.scroll method in non-Browser environment!'
    )

  const boundingRect = element.getBoundingClientRect()
  window.scroll({
    left: 0,
    behavior: 'smooth',
    top: window.scrollY + boundingRect.y - 79,
    ...options,
  })
}
