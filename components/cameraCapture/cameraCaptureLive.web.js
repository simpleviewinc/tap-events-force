import React, { useState, useRef } from 'react'
import { get, isFunc } from 'jsutils'
import { useInterval, useCamera, useVideoStream, useVideoImageData, useQRReader } from 'SVUtils/hooks'
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

  const [ makeScan, reader ] = useQRReader(videoRef.current)
  console.log({reader, makeScan})

  useInterval(1000, () => {
    if (!streaming || !isFunc(captureImage)) return
    // captureImage()
    // const scan = scanImage(imageCapture, videoStyle.width, videoStyle.height)
    // scan && setScanResult(scan)
    makeScan(result => {
      console.log({result})
      result && setScanResult(result) 
    })
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
          playsInline
        >
            Video not available.
        </video>
      </div>
    </div>
  )
}
