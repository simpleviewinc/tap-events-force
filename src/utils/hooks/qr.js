import { useState, useEffect } from 'react'
import { QRReader } from 'qr-reader'

/**
 * Initializes the reader, then provides a function for scanning an image. 
 * @param { Object } element - a video or image element (e.g. videoRef.current)
 * @returns { Array } [ scanFunction, reader ]
 *  - scanFunction: (resultText) => { ... }
 *  - reader: the reader object (see: https://github.com/mpcarolin/qr-code-scanner/blob/master/app/js/vendor/qrscan.js)
 * @example
 * const [ scan ] = useQRReader(imageRef.current)
 * scan(result => {
 *  doSomethingWithQRText(result)
 * })
 */
export const useQRReader = (element) => {
  const [ reader, setReader ] = useState(null)
  useEffect(() => {
    if (!element) return

    // initialize the reader (including the web worker)
    const qrReader = new QRReader(element)

    setReader(qrReader)

    // clean up by terminating the worker
    return () => qrReader.terminate()

  }, [ element ])

  return [
    // scan function
    (cb) => reader && reader.scan(cb),
    reader
  ]
}