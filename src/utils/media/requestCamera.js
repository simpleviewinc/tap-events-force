import { limbo } from '@svkeg/jsutils'

/**
 * Requests WebRTC camera stream
 * @param {Object} navigator - navigator global
 * @param {Object} props - camera access properties (video and audio media constraints)
 * @returns {Promise<Array>} [ err, cameraStream ]
 */
export const requestCamera = async (
  navigator,
  { video = true, audio = false } = {}
) => {
  if (!navigator || !navigator.mediaDevices) {
    const err =
      'Platform does not support WebRTC. Could not access navigator.mediaDevices. Also make sure you are running either in https or localhost.'
    console.error(err)
    return [ err, null ]
  }

  const constraints = { video, audio }

  return limbo(navigator.mediaDevices.getUserMedia(constraints))
}
