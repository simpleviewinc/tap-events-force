import { requestCamera } from 'SVUtils/helpers/media/requestCamera'
import { useState, useEffect, useRef } from 'react'

/**
 * Requests access to the camera, given the media constraints, and returns the camera stream
 * @param {Object} navigator - navigator global
 * @param {Object} constraints - media constraints (see https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints)
 * @return {Array} [ mediaError, stream ]
 *  - mediaError: an error that occurred either in requesting the camera or with the stream. Will be null if no error was encountered.
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

  // store a reference to the stream so that the cleanup func in useEffect has
  // access to the latest stream
  const streamRef = useRef()
  streamRef.current = stream

  // attempt to get the camera once
  useEffect(() => {
    !stream && getCamera()

    // when component unmounts, stop the webcam, otherwise the cam light remains on
    return () => stopWebcam(streamRef.current)

  }, [])

  return [ mediaErr, stream ]
}

/**
 * Stops all camera tracks on the stream
 * @param {Object} stream - camera stream
 */
const stopWebcam = (stream) => {
  stream
    .getTracks()
    .map(track => track.stop())
}

