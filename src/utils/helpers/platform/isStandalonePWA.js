const hasWindow = typeof window !== 'undefined'
const hasNavigator = typeof navigator !== 'undefined'
/**
 * @returns { Boolean } - true if the app is running as a standalone pwa on web
 */
export const isStandalonePWA = () => {
  // if window or navigator are undefined, then we are not on web (probably native)
  if (!hasWindow || !hasNavigator) return false

  const query = '(display-mode: standalone)'
  return navigator.standalone || window.matchMedia(query).matches
}