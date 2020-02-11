import React, { useState, useRef, useEffect } from 'react'
import { useQRCode, useQRReader, useInterval } from 'SVUtils/hooks'

export const CameraCaptureInput = (props) => {
  const [ scanResults, setScanResults ] = useState(null)
  const [ imageURL, setImageURL ] = useState(null)

  const captureURL = (event) => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setImageURL(url) 
  }

  const [ dims, setDims ] = useState({})
  const onImageLoad = (img) => setDims({
    width: img.width,
    height: img.height
  })

  const imgRef = useRef()
  // const scanResults = useQRCode(imgRef)
  
  const [ makeScan, reader ] = useQRReader(imgRef.current)

  useInterval(1000, () => {
    makeScan(result => result && setScanResults(result) )
  })

  return (
    <div>
      <div>
        <div style={{flexDirection: 'row'}}>
          <p>Scan Results:</p>
          <p style={{fontWeight: 'bold'}}> { (scanResults  || null ) } </p>
        </div>
        <div style={{flexDirection: 'row'}}>
        </div>
        <input 
          onChange={captureURL}
          type="file" 
          accept="image/*" 
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

