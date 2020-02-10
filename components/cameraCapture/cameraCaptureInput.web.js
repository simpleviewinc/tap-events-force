import React, { useState, useRef, useEffect } from 'react'
import { useQRCode } from 'SVUtils/hooks'

export const CameraCaptureInput = (props) => {
  const [ imageURL, setImageURL ] = useState(null)

  const captureURL = (event) => {
    const url = URL.createObjectURL(event.target.files[0])
    setImageURL(url) 
  }

  const [ dims, setDims ] = useState({})
  const onImageLoad = (img) => setDims({
    width: img.width,
    height: img.height
  })
  const imgRef = useRef()

  const scanResults = useQRCode(imgRef)

  return (
    <div>
      <div>
        <div style={{flexDirection: 'row'}}>
          <p>Scan Results:</p>
          <p style={{fontWeight: 'bold'}}> { (scanResults && scanResults.data) || null } </p>
        </div>
        <div style={{flexDirection: 'row'}}>
        </div>
        <input 
          onChange={captureURL}
          type="file" 
          accept="image/jpg" 
          capture={false}
        />
        <img 
          onLoad={onImageLoad}
          ref={imgRef} 
          src={imageURL}
          style={{ ...dims, display: 'none'}} />
      </div>
    </div>
  )
}

