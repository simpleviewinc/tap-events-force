import { useState, useEffect } from 'react'
import { QRReader } from 'qr-reader'

/**
 * Initializes the reader, then provides a function for scanning an image. 
 * @param { Object } videoElement - a video element (e.g. videoRef.current)
 * @returns { Array } [ scanFunction, reader ]
 *  - scanFunction: (resultText) => { ... }
 *  - reader: the reader object (see: https://github.com/mpcarolin/qr-code-scanner/blob/master/app/js/vendor/qrscan.js)
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
    // scan function
    (cb) => reader && reader.scan(cb),

    // reader, if you need more control
    reader
  ]
}