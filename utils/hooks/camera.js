import { useState, useEffect } from 'react'
import { get, limbo } from 'jsutils'
import { QRReader } from 'qr-reader'

/**
 * Provides access to a video stream
 * @param {*} ref - reference to a video element
 * @param {*} stream - 
 * @param {*} param2 
 */
export const useVideoStream = (ref, stream, { playOnInit=false, onReady=()=>{} }={}) => {
  const play = () => ref && ref.current && ref.current.play()
  const pause = () => ref && ref.current && ref.current.pause()

  // the effect assigns the stream
  useEffect(() => {
    if (!ref.current) return
    if (!stream) return

    ref.current.srcObject = stream
    playOnInit && play()

  }, [ stream, ref.current ])

  useVideoInitEvent(ref, onReady)

  return [ play, pause ]
}

/**
 * Sets a `canplay` event listener, which is the event the fires when the video stream first becomes available.
 * Will remove the listener when the component unmounts.
 * @param {Object} videoRef - a reference to a <video /> element
 * @param {Function} onReady - the function to execute when the video stream is ready
 * @return {void}
 */
export const useVideoInitEvent = (videoRef, onReady=()=>{}) => {
  const video = get(videoRef, 'current')
  useEffect(() => {
    if (!video) return
    video.addEventListener('canplay', onReady)
    return () => video.removeEventListener('canplay', onReady)
  }) 
}

/**
 * Requests access to the camera, given the media constraints, and returns the camera stream
 * @param {Object} navigator - navigator global
 * @param {Object} constraints - media constraints (see https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints)
 * @return {Array} [ mediaError, stream ]
 *  - mediaError: an error that occurred either in requesting the camera or with the stream
 *  - stream: the camera's stream
 */
export const useCamera = (navigator, constraints) => {
  const [ mediaErr, setErr ] = useState(null)
  const [ stream, setStream ] = useState(null)

  const getCamera = async () => {
    const [ err, camStream ] = await requestCamera(navigator, constraints)
    err && setErr(err)
    camStream && setStream(camStream)
  }

  // attempt to get the camera once
  useEffect(() => void getCamera(), [])

  return [ mediaErr, stream ]
}

/**
 * Requests WebRTC camera
 * @param {Object} navigator - navigator global
 * @param {Object} props - camera access properties 
 */
export const requestCamera = async (navigator, { videoConstraints=true, useAudio=false }={}) => {
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


/**
 * Gets ImageData from a video reference
 * @param {Object} videoRef - reference to the video dom object that displays the image to get the ImageData from
 * @returns {Array} [ imageData, captureImage ] 
 *  - imageData: the ImageData for the image (see https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
 *  - captureImage: a function that, when called, captures the latest image and updates imageData
 */
export const useVideoImageData = (videoRef) => {
  const [ imageData, setImageData ] = useState(null)

  const video = get(videoRef, 'current')

  const captureImage = () => {
    if (!video) return

    const width = video.clientWidth
    const height = video.clientHeight
    
    if (!width || !height) return

    // draw the current frame of the video to the canvas, then capture that image blob, then remove the canvas photo
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height

    context.drawImage(video, 0, 0)

    const result = context.getImageData(0, 0, width, height)
    setImageData(result)

    // remove the canvas now that we do not need it anymore
    canvas && canvas.parentNode && canvas.parentNode.removeChild(canvas)
  }

  return [ 
    imageData,
    captureImage
  ]
}

/**
 * Initializes the reader, then returns a function for scanning an image. (resultText) => { }
 */
export const useQRReader = (videoElement) => {
  const [ reader, setReader ] = useState(null)
  useEffect(() => {
    if (!videoElement) return
    QRReader.init(videoElement) 
    setReader(QRReader)
  }, [ videoElement ])

  return [
    (cb) => reader && reader.scan(cb),
    reader
  ]
}
