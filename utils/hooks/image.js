import { useState, useEffect } from 'react'
import jsQR from 'jsqr'
import { BrowserQRCodeReader } from '@zxing/library'
import { get, validate } from 'jsutils'

const reader = new BrowserQRCodeReader()

/**
 * Gets ImageData from an image reference
 * @param {Object} imageRef - reference to the image object that displays the image to get the ImageData from
 * @returns {Object} the ImageData for the image (see https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
 */
export const useImageData = (imageRef) => {
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
  }, [ imageRef, image, width, height ])

  return imageData
}

/**
 * Scans the image in the imageReference for a QR code, and returns the scan results (initially null)
 * @param {Object} imageRef 
 * @returns {Object|Null} scan results (see https://github.com/cozmo/jsQR#return-value)
 */
export const useQRCode = (imageRef) => {
  const [ code, setCode ] = useState(null)
  const imageData = useImageData(imageRef)
  useEffect(() => {
    if (!imageData) return
    decodeQR(imageData).then(setCode)
  }, [ imageData ])
  return code
}

/**
 * Scans the image located at url for a QR code, and returns the scan results (initially null)
 * @param {string} url 
 * @returns {Array|Null} [ error, code ]
 *  - code: scan results (see https://github.com/zxing-js/library)
 */
export const useQRCodeFromURL = (url) => {
  const [ code, setCode ] = useState(null)
  useEffect(() => {
    if (!url) return
    decodeQRFromURL(url).then(setCode)
  }, [ url ])
  return code
}

const decodeQR = async (imageData) => {
  const code = jsQR(
    imageData.data,
    imageData.width,
    imageData.height
  )
  return Promise.resolve(code)
}

const decodeQRFromURL = async (url) => {
  try {
    const code = await reader.decodeFromImage(undefined, url)
    code.data = code.data || code.text
    return [ null, code ]
  }
  catch (err) {
    console.error('Decode failed', err)
    return [ err, null ]
  }
}
