import React, { useState, useRef, useEffect } from 'react'
import { useInterval } from 'SVUtils/hooks/useInterval'
import { useCamera } from 'SVUtils/hooks/media/useCamera'
import { useVideoStream } from 'SVUtils/hooks/media/useVideoStream'
import { useQRReader } from 'SVUtils/hooks/useQRReader'
import PropTypes from 'prop-types'

const QRPropTypes = {
  style: PropTypes.object,
  videoStyle: PropTypes.object,
  active: PropTypes.bool,
  delay: PropTypes.number,
  frameRate: PropTypes.number,
  facingMode: PropTypes.string,
  onScan: PropTypes.func,
}

/**
 * A video component that uses the camera to scan for qr codes. Use the onScan callback to do something with the result.
 * @param { Object } props 
 * @param { Object } props.style - style object for the whole component
 * @param { Object } props.videoStyle - style object for the video element
 * @param { Boolean } props.scanOnInit - if true, will start the qr capture and scanning as soon as possible
 * @param { Boolean } props.active - if true, shows the video element and starts scanning. If false, disables it
 * @param { Number } props.delay - delay interval between scans of the stream
 * @param { Number } props.frameRate - frameRate of the video stream
 * @param { String } props.facingMode - frameRate of the video stream
 * @param { Function } props.onScanStart - callback of form (videoElement) => { ... } . Gets called when the qr reader begins scanning the video
 * @param { Function } props.onScan - callback of form (qrScanText) => { ... } . Gets called when the qr reader scans the video and finds a qr code result
 * 
 */
export const QRVideoCapture = ({ style={}, videoStyle={}, scanOnInit=true, delay=1000, frameRate=20, facingMode='environment', onScanStart=()=>{}, onScan=()=>{} }) => {
  const [ streaming, setStreaming ] = useState(false)
  const showVideo = streaming && scanOnInit

  const videoRef = useRef()

  // acquire the camera stream, given the video constraints
  const [ err, stream ] = useCamera(navigator, { video: { frameRate, facingMode }})

  // setup the video element to use the camera stream.
  useVideoStream(
    videoRef,
    stream,
    { onReady: () => setStreaming(true) }
  )

  const dimensions = {
    width: window.screen.width * 0.9
  }

  const vidStyle = {
    height: showVideo
      ? videoRef.current.videoHeight / (videoRef.current.videoWidth / dimensions.width)
      : 0,
    width: dimensions.width,
    display: showVideo ? 'block' : 'none',
    ...videoStyle,
  }

  // setup the qr reader to scan the video
  const [ makeScan ] = useQRReader(videoRef.current)

  // once streaming, start scanning
  useInterval(() => {
    showVideo && makeScan(result => result && onScan(result))
  }, showVideo ? delay : null)

  // if showVideo is true, notify parent of scan starting on first render and not again unless showVideo toggles back to true
  useEffect(() => {
    showVideo && onScanStart(videoRef.current)
  }, [ showVideo ])

  return (
    <div style={{ ...style, height: vidStyle.height } }>
      <video 
        ref={videoRef}
        style={vidStyle}
        playsInline
      >
          Video not available.
      </video>
    </div>
  )
}

QRVideoCapture.propTypes = QRPropTypes
