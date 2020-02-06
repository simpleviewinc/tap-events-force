import React, { useState, useEffect, useRef } from 'react'
import { get } from 'jsutils'
import jsQR from 'jsqr'

export const CameraCapture = (props) => {
  const [ imageFile, setImageFile ] = useState(null)
  const [ scanResults, setScanResult ] = useState('')

  const imageRef = useRef()
  const getCapture = (event) => {
    const url = URL.createObjectURL(event.target.files[0])
    setImageFile(url) 
  }

  const [ imageDimensions, setDimensions ] = useState({})

  const updateDimensions = (img) => setDimensions({
    width: img.width,
    height: img.height
  })

  const imageData = useImageData(imageRef)

  const [ _, setCode ] = useState({})

  const scanImage = () => {
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    setScanResult(get(code, 'data'))
    setCode(code)
    console.log({code})
  }

  return (
    <div>
      { imageFile && <button onClick={scanImage}>Scan Photo</button> }

      <div>
        { scanResults && 
          <div style={{flexDirection: 'row'}}>
            <p>Scan Results:</p>
            <p style={{fontWeight: 'bold'}}> { scanResults } </p>
          </div>
        }
        <input 
          onChange={getCapture}
          type="file" 
          accept="image/*" 
          capture />
        <img 
          onLoad={updateDimensions}
          style={imageDimensions}
          ref={imageRef}
          src={imageFile} />
      </div>
    </div>
  )
}

/**
 * Gets ImageData from an image reference
 * @param {Object} imageRef - reference to the image object that displays the image to get the ImageData from
 * @returns 
 */
const useImageData = (imageRef) => {
  const [ imageData, setImageData ] = useState(null)

  const image = get(imageRef, 'current')
  const width = get(image, 'width')
  const height = get(image, 'height')

  useEffect(() => {
    if (!image) return
    if (image.width === 0) return

    // create the canvas in memory for the purpose of acquiring the image data
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = image.width
    canvas.height = image.height
    context.drawImage(image, 0, 0)
     
    const result = context.getImageData(0, 0, image.width, image.height)

    setImageData(result)


    canvas && canvas.parentNode && canvas.parentNode.removeChild(canvas)
  }, [ imageRef, image, width, height ])

  return imageData
}
