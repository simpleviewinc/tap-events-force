import React, { useState, useRef } from 'react'
import { useInterval } from 'SVHooks/useInterval'
import { useQRReader } from 'SVHooks/useQRReader'
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
 */
export const QRImageCapture = ({
  style = {},
  inputStyle = {},
  delay = 1000,
  onScanStart = () => {},
  onScan = () => {},
}) => {
  const [ imageURL, setImageURL ] = useState(null)

  // capture the url to the image on the user's device; create and save the object url
  const captureURL = event => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setImageURL(url)
  }

  // use the natural dimensions of the image so that the QR code is not stretched in any odd way
  const [ dimensions, setDimensions ] = useState({})
  const onImageLoad = img => {
    setDimensions({
      width: img.width,
      height: img.height,
    })
    onScanStart(img)
  }

  const imgRef = useRef()
  const inputRef = useRef()

  // setup the qr reader with the image element
  const [scan] = useQRReader(imgRef.current)

  // scan the image until a result is found, then notify the parent of the result
  useInterval(
    () => {
      if (!imageURL) return

      scan(result => {
        result && onScan(result)

        // once the scan has found a result, reset the image url and input so
        // that scanning stops until the user captures another image
        setImageURL(null)
        inputRef.current.value = ''
      })
    },
    imageURL ? delay : null
  )

  return (
    <div style={style}>
      <input
        style={inputStyle}
        ref={inputRef}
        onChange={captureURL}
        type='file'
        accept='image/*'
        capture
      />
      <img
        onLoad={onImageLoad}
        ref={imgRef}
        src={imageURL}
        style={{ ...dimensions, display: 'none' }}
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
}
