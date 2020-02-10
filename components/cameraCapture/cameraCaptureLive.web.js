import React, { useState, useRef } from 'react'
import { get, isFunc } from 'jsutils'
import { useInterval, useCamera, useVideoStream, useVideoImageData } from 'SVUtils/hooks'
import jsQR from 'jsqr'

const videoConstraints = { 
  width: 640,
  height: 480,
  frameRate: 10,
  facingMode: 'environment'
}


export const CameraCaptureLive = (props) => {
  const [ streaming, setStreaming ] = useState(false)

  const videoRef = useRef()

  const [ err, stream ] = useCamera(navigator, {})
  const [ playStream, pauseStream ] = useVideoStream(videoRef, stream, { onReady: () => setStreaming(true) } )
  const [ imageCapture, captureImage ] = useVideoImageData(videoRef)

  const play = () => { 
    playStream()
    setStreaming(true)
  }

  const stopStreaming = () => {
    pauseStream()
    setStreaming(false)
  }

  const videoStyle = {
    height: streaming
      ? videoRef.current.videoHeight / (videoRef.current.videoWidth / videoConstraints.width)
      : 0,
    width: videoConstraints.width
  }
  const [ scanResult, setScanResult ] = useState('')

  useInterval(650, () => {
    if (!streaming || !isFunc(captureImage)) return
    captureImage()
    const scan = scanImage(imageCapture, videoStyle.width, videoStyle.height)
    scan && setScanResult(scan)
  })

  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pauseStream}>Pause</button>
      <button onClick={stopStreaming}>Stop</button>
      <button onClick={captureImage}>Capture</button>

      <div>
        <p>{err && err.message}</p>
        <p>Scan Result: { scanResult }</p>
        <video 
          ref={videoRef}
          style={videoStyle}
          playsInLine
        >
            Video not available.
        </video>
      </div>
    </div>
  )
}

const useRealtimeQRScan = (streaming, captureImage, delay=650) => {
  const [ scanResult, setScanResult ] = useState('')

  useInterval(650, () => {
    if (!streaming || !isFunc(captureImage)) return
    captureImage()
    const scan = scanImage(imageCapture, videoStyle.width, videoStyle.height)
    scan && setScanResult(scan)
  })

  return scanResult
}

const scanImage = (imageCapture, width, height) => {
  if (!imageCapture || !imageCapture.data) return

  const code = jsQR(imageCapture.data, width, height)
  const data = get(code, 'data')
  return data
}
