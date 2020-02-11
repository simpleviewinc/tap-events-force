import { useState, useEffect } from 'react'
import { QRReader } from 'qr-reader'

/**
 * Initializes the reader, then returns a function for scanning an image. (resultText) => { }
 * @param { Object } videoElement - a video element (e.g. videoRef.current)
 */
export const useQRReader = (videoElement) => {
  const [ reader, setReader ] = useState(null)
  useEffect(() => {
    if (!videoElement) return

    // initialize the reader (including the web worker)
    QRReader.init(videoElement) 
    setReader(QRReader)

    // clean up by terminating the worker
    return () => QRReader.terminate()

  }, [ videoElement ])

  return [
    (cb) => reader && reader.scan(cb),
    reader
  ]
}