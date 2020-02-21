import React, { useState, useEffect, useRef } from 'react'
import { useInterval } from 'SVUtils/hooks/useInterval'
import { useQRReader } from 'SVUtils/hooks/useQRReader'
import { FilePicker } from 'keg-components'
import PropTypes from 'prop-types'

/**
 * An input component that uses the camera to capture/select a photo and scan it for a qr code.
 * Use the onScan callback to do something with the result.
 * @param { Object } props 
 * @param { Object } props.style - style object for the wrapping div
 * @param { Object } props.inputStyle - style for the input element
 * @param { Number } props.delay - delay interval between scans of the stream
 * @param { Function } props.onScanStart - callback of form (imgElement) => { ... } - Gets called when the user has selected an image and the scan begins
 * @param { Function } props.onScan - callback of form (qrScanText) => { ... } - Gets called when the qr reader scans the image and finds a qr code result
 * @param { Boolean } props.scanOnInit - if true, will start the qr capture process as soon as possible
 */
export const QRImageCapture = ({ style={}, inputStyle={}, delay=1000, timeout=3000, onScanStart=()=>{}, onScan=()=>{}, onScanFail=()=>{}, onScanStop=()=>{}, scanOnInit=false }) => {
  const [ imageURL, setImageURL ] = useState(null)

  // capture the url to the image on the user's device; create and save the object url
  const captureURL = (file) => {
    const url = URL.createObjectURL(file)
    setImageURL(url) 
  }

  // use the natural dimensions of the image so that the QR code is not stretched in any odd way
  const [ dimensions, setDimensions ] = useState({})
  const onImageLoad = (img) => {
    setDimensions({
      width: img.width,
      height: img.height
    })
    onScanStart(img)
  }

  const imgRef = useRef()
  const inputRef = useRef()

  // if active is set to true, then immediately open the file picker / camera on mount
  useEffect(() => {
    const shouldScan = scanOnInit && !!inputRef.current
    shouldScan && inputRef.current.click()
  }, [ inputRef.current, scanOnInit ])

  // setup the qr reader with the image element
  const [ scan ] = useQRReader(imgRef.current)

  // scan start time for timeout tracking
  const [ scanStartTime, setStartTime ] = useState(null)

  // reset for new image capture
  const reset = () => {
    setImageURL(null)
    setStartTime(null)

    // notify the parent we stop scanning until the user selects another image
    onScanStop()

    inputRef.current.value = ''
  }

  // scan the image until a result is found or the timeout is exceeded, then notify the parent of the result
  useInterval(() => { 
    if (!imageURL) return

    !scanStartTime && setStartTime(new Date())

    // check if the scanning interval has exceeded the timeout
    if (timeSince(scanStartTime) >= timeout) {
      onScanFail(`Scan exceeded timeout of ${timeout} ms without finding a qr code`)
      return reset()
    }

    scan(result => { 
      result && onScan(result)

      // the scan has found a result, so reset the image url and input so that scanning stops until the user captures another image
      reset()
    })
  }, imageURL ? delay : null)

  return (
    <div style={style}>
      <FilePicker 
        accept="image/*" 
        capture={true}
        onFilePicked={captureURL}
        ref={inputRef}
        style={inputStyle}
        title={'Scan QR Code'}
      />
      <img 
        onLoad={onImageLoad}
        ref={imgRef} 
        src={imageURL}
        style={{ ...dimensions, display: 'none'}} />
    </div>
  )
}

QRImageCapture.propTypes = {
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  delay: PropTypes.number,
  onScanStart: PropTypes.func,
  onScan: PropTypes.func,
}

const timeSince = (date) => date
  ? ((new Date()) - date)
  : 0

