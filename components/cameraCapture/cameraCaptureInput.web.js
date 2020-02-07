import React, { useState, useRef } from 'react'
import { useQRCodeFromURL } from 'SVUtils/hooks'
import QRWorker from './decoder.worker.js'

const worker = initWorker()

export const CameraCaptureInput = (props) => {
  const [ imageURL, setImageURL ] = useState(null)

  const captureURL = (event) => {
    const url = URL.createObjectURL(event.target.files[0])
    setImageURL(url) 
  }

  const [ err, scanResults ] = useQRCodeFromURL(imageURL) || ''

  return (
    <div>
      <div>
        <div style={{flexDirection: 'row'}}>
          <p>Scan Results:</p>
          <p style={{fontWeight: 'bold'}}> { (scanResults && scanResults.data) || null } </p>
        </div>
        <div style={{flexDirection: 'row'}}>
          <p>Error Results:</p>
          <p style={{fontWeight: 'bold'}}> { (err || '').toString() } </p>
        </div>
        <input 
          onChange={captureURL}
          type="file" 
          accept="image/*" 
          capture />
        <img src={imageURL} style={{display: 'none'}} />
      </div>
    </div>
  )
}

const scan = (imageData) => {
  if (!imageData) return Promise.reject('Image data was undefined. Skipping scan.')

  return new Promise((resolve) => {
    worker.onmessage = (event) => resolve(event.data)

    // send the image data to the worker for decoding
    worker.postMessage(imageData)
  })
}

const initWorker = () => {
  if (!window.worker) {
    console.error('This browser does not support web workers.')
    return null
  }

  /* zbar qr/barcode decoding worker */
  return new QRWorker()
}