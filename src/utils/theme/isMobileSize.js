import { widthOf } from './widthOf'
/**
 * @param {Object} theme
 * @returns {Boolean} true if the screen is mobile-sized (usually width of 480px or narrower)
 */
export const isMobileSize = theme => theme.RTMeta.width < widthOf('$small')
