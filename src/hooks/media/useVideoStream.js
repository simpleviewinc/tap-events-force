import { useEffect } from 'react'
import { get } from 'jsutils'

/**
 * Sets up the video to use the camera stream and provides access to play/pause functions
 * @param {Object} ref - reference to a video element
 * @param {Object} stream - a camera stream (see `useCamera` return value)
 * @param {Object} props - options
 * @param {Object} props.playOnInit - true by default. If true, plays the video immediately.
 * @param {Object} props.onReady - a callback that runs once the video is ready to play
 * @returns {Array} [ play, pause ] functions that play/pause the video. You must pass them the current video element
 */
export const useVideoStream = (
  ref,
  stream,
  { playOnInit = true, onReady = null } = {}
) => {
  const video = get(ref, 'current')

  // the effect assigns the stream
  useEffect(() => {
    if (!video) return
    if (!stream) return

    video.srcObject = stream
    playOnInit && play(video)
  }, [ stream, ref.current ])

  // assign event listeners to the video
  useEffect(() => {
    if (!video) return
    if (!onReady) return
    video.addEventListener('canplay', onReady)
    return () => video.removeEventListener('canplay', onReady)
  })

  return [ play, pause ]
}

/**
 * Helper that plays the video, if available
 * @param {Object} video
 */
const play = video =>
  video
    ? video.play()
    : console.warn(
      'Cannot play: video element not yet available from video ref.'
    )

/**
 * Helper that pauses the video, if available
 * @param {Object} video
 */
const pause = video =>
  video
    ? video.pause()
    : console.warn(
      'Cannot pause: video element not yet available from video ref.'
    )
