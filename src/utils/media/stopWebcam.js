/**
 * Stops all camera tracks on the stream
 * @param {Object} stream - media stream for webcam (@see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
 * @returns {Void}
 */
export const stopWebcam = (stream) => {
  if (!stream) return
  stream
    .getTracks()
    .map(track => track.stop())
}

