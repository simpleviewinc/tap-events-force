import { useState, useEffect } from 'react'
import { get, limbo } from 'jsutils'

/**
 * Sets up the video to use the camera stream and provides access to play/pause functions
 * @param {Object} ref - reference to a video element
 * @param {Object} stream - a camera stream (see `useCamera` return value)
 * @param {Object} props - options
 * @param {Object} props.playOnInit - true by default. If true, plays the video immediately.
 * @param {Object} props.onReady - a callback that runs once the video is ready to play
 * @returns {Array} [ play, pause ] - play and pause functions for the video
 */
export const useVideoStream = (ref, stream, { playOnInit=true, onReady=null }={}) => {
  const video = get(ref, 'current')

  const play = () => video
    ? video.play()
    : console.warn('Cannot play: video element not yet available from video ref.')

  const pause = () => video 
    ? video.pause()
    : console.warn('Cannot pause: video element not yet available from video ref.')

  // the effect assigns the stream
  useEffect(() => {
    if (!video) return
    if (!stream) return

    video.srcObject = stream
    playOnInit && play()

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
 * Requests access to the camera, given the media constraints, and returns the camera stream
 * @param {Object} navigator - navigator global
 * @param {Object} constraints - media constraints (see https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints)
 * @return {Array} [ mediaError, stream ]
 *  - mediaError: an error that occurred either in requesting the camera or with the stream
 *  - stream: the camera's stream
 */
export const useCamera = (navigator, constraints) => {
  const [ mediaErr, setErr ] = useState(null)
  const [ stream, setStream ] = useState(null)

  const getCamera = async () => {
    const [ err, camStream ] = await requestCamera(navigator, constraints)

    err && console.error(err)
    err && setErr(err)

    camStream && setStream(camStream)
  }

  // attempt to get the camera once
  useEffect(() => {
    !stream && getCamera()
  }, [])

  return [ mediaErr, stream ]
}

/**
 * Requests WebRTC camera
 * @param {Object} navigator - navigator global
 * @param {Object} props - camera access properties 
 * @returns {Promise<Array>} [ err, cameraStream ]
 */
export const requestCamera = async (navigator, { video=true, audio=false }={}) => {
  if (!navigator || !navigator.mediaDevices) {
    const err = 'Platform does not support WebRTC. Could not access navigator.mediaDevices. Also make sure you are running either in https or localhost.'
    console.error(err)
    return [ err, null ]
  }
  
  const constraints = { video, audio }

  return limbo(
    navigator.mediaDevices.getUserMedia(constraints)
  )
}
