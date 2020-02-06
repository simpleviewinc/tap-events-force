import React, { useState, useEffect, useRef } from 'react'
import { get, limbo } from 'jsutils'

import jsQR from 'jsqr'

const videoConstraints = { width: 640, height: 480, frameRate: 15 }

export const CameraCapture = (props) => {
  const [ streaming, setStreaming ] = useState(false)

  const videoRef = useRef()
  const canvasRef = useRef()

  const [ err, stream ] = useCamera(navigator, {})
  const [ playStream, pause ] = useVideoStream(videoRef, stream, {  onReady: () => setStreaming(true) } )
  const [ imageCapture, captureImage ] = useVideoImageCapture(videoRef, canvasRef)

  const play = () => setStreaming(true) || playStream()
  const stopStreaming = () => pause() || setStreaming(false)

  const videoStyle = {
    height: streaming
      ? videoRef.current.videoHeight / (videoRef.current.videoWidth / videoConstraints.width )
      : 0,
    width: videoConstraints.width
  }
  const canvasStyle = videoStyle

  const [ scanResult, setScanResult ] = useState('')
  const scanImage = () => {
    if (!imageCapture || !imageCapture.data) return

    const code = jsQR(imageCapture.data, canvasStyle.width, canvasStyle.height)
    console.log({code})
    setScanResult(get(code, 'data'))
  }

  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stopStreaming}>Stop</button>
      <button onClick={captureImage}>Capture</button>
      <button onClick={scanImage}>Scan</button>

      <div>
        <p>{err && err.message}</p>
        <p>Scan Result: { scanResult }</p>
        <video 
          ref={videoRef}
          style={videoStyle}>
            Video stream not available.
        </video>
      </div>

      <canvas 
        ref={canvasRef}
        style={canvasStyle} />

      <div>
        <img 
          id="photo" 
          alt="The screen capture will appear in this box."
        />
      </div>
    </div>
  )
}

const useVideoStream = (ref, stream, { playOnInit=false, onReady=()=>{}, videoProps={} }={}) => {
  const play = () => ref && ref.current && ref.current.play()
  const pause = () => ref && ref.current && ref.current.pause()

  // the effect assigns the stream
  useEffect(() => {
    if (!ref.current) return
    if (!stream) return

    ref.current.srcObject = stream
    playOnInit && play()

  }, [ stream, ref.current ])

  useConfiguredVideo(ref, { ...videoProps, onReady })

  return [ play, pause ]
}

const useConfiguredVideo = (videoRef, { onReady=()=>{} }) => {
  const video = get(videoRef, 'current')
  const onVideoReady = (ev) => onReady()
  useEffect(() => {
    if (!video) return
    video.addEventListener('canplay', onVideoReady)
    return () => video.removeEventListener('canplay', onVideoReady)
  }) 
}

const useCamera = (navigator, constraints) => {

  const [ mediaErr, setErr ] = useState(null)
  const [ stream, setStream ] = useState(null)

  const getCamera = async () => {
    const [ err, camStream ] = await requestCamera(navigator, constraints)
    err && setErr(err)
    camStream && setStream(camStream)
  }

  useEffect(() => void getCamera(), [])

  return [ mediaErr, stream ]
}

/**
 * Requests WebRTC camera
 * @param {*} navigator 
 * @param {Object} props - camera access properties 
 */
const requestCamera = async (navigator, { videoConstraints=true, useAudio=false }={}) => {
  if (!navigator || !navigator.mediaDevices)
    return [ 
      new Error('Platform does not support WebRTC. Could not access navigator.mediaDevices. Also make sure you are running either in https or localhost.'),
      null
    ]
  
  const constraints = { 
    video: videoConstraints, 
    audio: useAudio,
  }

  return limbo(navigator.mediaDevices.getUserMedia(constraints))
}

// draw the current frame of the video to the canvas, then capture that image blob, then remove the canvas photo
const useVideoImageCapture = (videoRef, canvasRef) => {
  const [ image, setImage ] = useState(null)
  const [ captureTrigger, setCaptureTrigger ] = useState(0)

  const canvas = get(canvasRef, 'current')
  const video = get(videoRef, 'current')

  const clearPhoto = () => {
    const context = canvas.getContext('2d')
    context.fillStyle = "#AAA"
    const width = canvas.width
    const height = canvas.height
    context.fillRect(0, 0, width, height)
  }

  useEffect(() => {
    if (!canvas || !video) return

    const width = video.clientWidth
    const height = video.clientHeight
    
    const context = canvas.getContext('2d')

    if (width && height) {
      canvas.width = width
      canvas.height = height

      // draw the video frame, starting at x-y coordinates (0, 0), with width and height dimensions
      context.drawImage(video, 0, 0, width, height)

      // extract that image as an image data array of the same dimensions
      const imageData = context.getImageData(0, 0, width, height)

      setImage(imageData)

      // clearPhoto()
    }
  }, [ canvas, video, captureTrigger ])

  const captureImage = () => setCaptureTrigger(captureTrigger + 1)

  return [ 
    image,
    captureImage
  ]
}


//// qr conversion

// const 