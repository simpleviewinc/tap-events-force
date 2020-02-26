import { requestCamera } from 'SVUtils/media/requestCamera'
import { useState, useEffect } from 'react'

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

  // attempt to get the camera once
  useEffect(() => {
    if (stream) return

    requestCamera(navigator, constraints)
      .then(([err, camStream]) => {
        err && console.error(err)
        err && setErr(err)
        camStream && setStream(camStream)
      })

  }, [])

  return [ mediaErr, stream ]
}
