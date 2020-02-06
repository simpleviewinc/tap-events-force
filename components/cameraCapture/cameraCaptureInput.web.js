import React, { useState, useRef } from 'react'
import { useQRCode } from 'SVUtils/hooks'

export const CameraCaptureInput = (props) => {
  const [ imageURL, setImageURL ] = useState(null)

  const getCapture = (event) => {
    const url = URL.createObjectURL(event.target.files[0])
    setImageURL(url) 
  }

  const [ imageDimensions, setDimensions ] = useState({})
  const updateDimensions = (img) => setDimensions({ width: img.width, height: img.height })

  const imageRef = useRef()
  const scanResults = useQRCode(imageRef) || ''

  return (
    <div>
      <div>
        { scanResults && 
          <div style={{flexDirection: 'row'}}>
            <p>Scan Results:</p>
            <p style={{fontWeight: 'bold'}}> { scanResults.data } </p>
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
          src={imageURL} />
      </div>
    </div>
  )
}