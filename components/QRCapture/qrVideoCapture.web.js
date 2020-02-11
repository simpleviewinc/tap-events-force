import React, { useState, useRef } from 'react'
import { useInterval, useCamera, useVideoStream, useQRReader } from 'SVUtils/hooks'

const dimensions = {
  width: 640,
  height: 480,
}

export const QRVideoCapture = ({ frameRate=20, facingMode='environment'}) => {
  const [ streaming, setStreaming ] = useState(false)

  const videoRef = useRef()

  const [ err, stream ] = useCamera(navigator, { video: { frameRate, facingMode }})
  const [ playStream, pauseStream ] = useVideoStream(videoRef, stream, { onReady: () => setStreaming(true) } )

  const play = () => { 
    playStream()
    setStreaming(true)
  }

  const pause = () => {
    pauseStream()
  }

  const stop = () => {
    pauseStream()
    setStreaming(false)
  }

  const videoStyle = {
    height: streaming
      ? videoRef.current.videoHeight / (videoRef.current.videoWidth / dimensions.width)
      : 0,
    width: dimensions.width
  }
  const [ scanResult, setScanResult ] = useState('')

  const [ makeScan, reader ] = useQRReader(videoRef.current)

  useInterval(() => {
    streaming && makeScan(result => result && setScanResult(result))
  }, 1000)

  const [ supportErr, supportMessage ] = checkSupport()

  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>

      <div>
        <p>{supportErr && supportMessage}</p>
        <p>{err && err.message}</p>
        <p>Scan Result: { scanResult }</p>
        <video 
          ref={videoRef}
          style={videoStyle}
          playsInline
        >
            Video not available.
        </video>
      </div>
    </div>
  )
}

const checkSupport = () => {
  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints()
  if (!supportedConstraints['facingMode'])
    return [ false, 'Facing Mode not supported' ]
  return [ true, '' ]
}
