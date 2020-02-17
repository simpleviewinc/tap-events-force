/**
 * @returns { Boolean } true if current device is running iOS on web
 * @see https://stackoverflow.com/a/9039885/4039256
 */
export const isIOSWeb = () => {
  // if the window or navigator globals are undefined, then we are not on web (probably native)
  if (!window || !navigator) return false

  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
