/**
 * @returns { Boolean } true if current device is running iOS
 * @see https://stackoverflow.com/a/9039885/4039256
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export const isStandalonePWA = () => {
  const query = '(display-mode: standalone)'
  return navigator.standalone || window.matchMedia(query).matches
}