import { devLog } from 'SVUtils/logs'
import { getPlatform } from '@keg-hub/keg-components'
const isWeb = getPlatform() === 'web'

const defOpts = {
  offset: 0,
  behavior: 'smooth',
}

/**
 * Helper method to scroll to an item in a list in a **BROWSER ENVIRONMENT ONLY**
 * <br/> Native does not have a window.scroll, so the helpers must be defined separately
 * @function
 * @param {object} props
 * @param {object} [props.offset=0] - Offset the final scroll position
 * @param {object} [props.left] - Horizontal scroll to position (Web Only)
 * @param {object} [props.position=0] - Not valid on web platform
 * @param {object} [props.behavior=smooth] - Type of scrolling ( auto | smooth )
 */
export const scrollList = ({ layout, ...options }) => {
  if (!isWeb || typeof window === 'undefined')
    return devLog.warn(
      'Can not call window.scroll method in non-Browser environment!'
    )

  // Build the scroll options, pulling out unneeded keys
  const { offset, position, ...scrollOpts } = { ...defOpts, ...options }

  // Set the scroll top based on the scroll position and the Y axis and offset
  scrollOpts.top = window.scrollY + layout.y - offset

  window.scroll(scrollOpts)
}
