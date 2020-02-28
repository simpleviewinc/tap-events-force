import React, { useState, useRef, useEffect } from 'react'
import { useInterval } from 'SVUtils/hooks/useInterval'
import { useCamera } from 'SVUtils/hooks/media/useCamera'
import { useVideoStream } from 'SVUtils/hooks/media/useVideoStream'
import { useQRReader } from 'SVUtils/hooks/useQRReader'
import { Text, View } from 'SVComponents'
import { noop } from 'SVUtils/function'
import PropTypes from 'prop-types'

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
 * @param { Function } props.onScanFail - callback of form (err) => { ... }. Called if scanning failed for any reason, such as unable to access camera.
 * 
 */
export const QRVideoCapture = (props) => {

  const { 
    style={}, 
    videoStyle={}, 
    scanOnInit=true, 
    delay=1000, 
    frameRate=20, 
    facingMode='environment', 
    onScanStart=noop, 
    onScan=noop, 
    onScanFail=noop 
  } = props

  const [ streaming, setStreaming ] = useState(false)
  const showVideo = streaming && scanOnInit

  const videoRef = useRef()

  // acquire the camera stream, given the video constraints
  const [ err, stream ] = useCamera(navigator, { video: { frameRate, facingMode }})
  useEffect(() => { err && onScanFail(err) }, [ err ])

  // setup the video element to use the camera stream.
  useVideoStream(videoRef, stream, { onReady: () => setStreaming(true) })

  // sets width to screen width, and height to 0 if showVideo is false so that it does not show an empty video
  const width = window.screen.width
  const height = window.screen.height * 0.33
  const display = showVideo ? 'block' : 'none'
  const fullVideoStyle = { width, height, display, ...videoStyle }

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
    <View style={ style }>
      <video 
        ref={videoRef}
        style={fullVideoStyle}
        playsInline
      >
          Video not available.
      </video>
      { !streaming && !err && <Text>Waiting on camera...</Text>}
    </View>
  )
}

QRVideoCapture.propTypes = {
  style: PropTypes.object,
  videoStyle: PropTypes.object,
  active: PropTypes.bool,
  delay: PropTypes.number,
  frameRate: PropTypes.number,
  facingMode: PropTypes.string,
  onScan: PropTypes.func,
}
