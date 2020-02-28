import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInterval } from 'SVUtils/hooks/useInterval'
import { useQRReader } from 'SVUtils/hooks/useQRReader'
import { noOp } from 'SVUtils/noOp'
import { timeSince } from 'SVUtils/time'
import { FilePicker } from 'keg-components'
import { checkCall, set } from 'jsutils'
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
export const QRImageCapture = (props) => {
  const { 
    style={}, 
    inputStyle={}, 
    delay=1000, 
    timeout=3000, 
    onScanStart=noOp, 
    onScan=noOp, 
    onScanFail=noOp, 
    onScanStop=noOp, 
    scanOnInit=false 
  } = props

  const [ imageURL, setImageURL ] = useState(null)

  // capture the url to the image on the user's device; create and save the object url
  const captureURL = useCallback((file) => {
    const url = URL.createObjectURL(file)
    setImageURL(url) 
  }, [ setImageURL ])

  const imgRef = useRef()
  const inputRef = useRef()

  // scan the image until a qr code result is found or the timeout has elapsed
  useScanner({
    active: !!imageURL,
    timing: { delay, timeout },
    image: imgRef.current,
    scanFuncs: { onScanFail, onScan },
    reset: () => reset(setImageURL, onScanStop, inputRef)
  })

  return (
    <div style={style}>
      <FilePicker 
        accept="image/*" 
        capture={true}
        onFilePicked={captureURL}
        ref={inputRef}
        style={inputStyle}
        title={'Scan QR Code'}
        openOnMount={scanOnInit}
      />
      <QRImage 
        imgRef={imgRef}
        imageURL={imageURL}
        onImageLoad={onScanStart}
      />
    </div>
  )
}

QRImageCapture.propTypes = {
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  delay: PropTypes.number,
  onScanStart: PropTypes.func,
  onScan: PropTypes.func,
  scanOnInit: PropTypes.bool
}

/**
 * Helper component for QRImageCapture. Renders a hidden image necessary for
 * acquiring image data to scan. Handles setting the correct dimensions.
 * @param {*} param0 
 */
const QRImage = ({ imgRef, imageURL, onImageLoad }) => {
  // use the natural dimensions of the image so that the QR code is not stretched in any odd way
  const [ dimensions, setDimensions ] = useState({})

  const onLoad = useCallback((img) => {
    setDimensions({ width: img.width, height: img.height })
    onImageLoad(img)
  }, [ onImageLoad ])

  return (
    <img 
      onLoad={onLoad}
      ref={imgRef} 
      src={imageURL}
      style={{ ...dimensions, display: 'none'}} 
    />
  )
}

/**
 * Helper hook for QRImageCapture. Attempts to scan the image at imgRef.current until the timeout
 * @param {Object} props 
 * @param {Boolean} active - if the scan should run or not
 * @param {Object} timing - timing props
 * @param {Object} image - the image to scan
 * @param {Object} resetProps - properties passed to reset
 * @param {Object} scanFuncs - callbacks for scanning
 * @returns { Void }
 */
const useScanner = ({active, timing, image, scanFuncs, reset }) => {
  const { timeout, delay } = timing
  const { onScan, onScanFail } = scanFuncs

  // scan start time for timeout tracking
  const [ scanStartTime, setStartTime ] = useState(null)

  // setup the qr reader with the image element
  const [ scan ] = useQRReader(image)

  useInterval(() => { 
    if (!active) return

    // set the start time of the current scan attempt for timeout checking
    !scanStartTime && setStartTime(new Date())

    // check if the scanning interval has exceeded the timeout
    if (timeSince(scanStartTime) >= timing.timeout) {
      onScanFail(`Scan exceeded timeout of ${timeout} ms without finding a qr code`)
      setStartTime(null)
      return reset()
    }

    // scan, and if a result is found, notify parent and reset
    scan(result => { 
      result && onScan(result)
      
      // reset image url and input so scanning stops until user tries again
      reset()

      // reset timeout
      setStartTime(null)
    })
  }, active ? delay : null)
}

/**
 * Resets the scanning by calling the passed-in functions to clear/reset the scan state
 * @param {Function} setImageURL 
 * @param {Function} setStartTime 
 * @param {Function} onScanStop 
 * @param {Function} inputRef 
 * 
 * @returns { Void }
 */
const reset = (setImageURL, onScanStop, inputRef) => {
  checkCall(setImageURL, null)

  // notify the parent we stop scanning until the user selects another image
  checkCall(onScanStop)

  set(inputRef, 'current.value', '')
}



