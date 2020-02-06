import { useState, useEffect } from 'react'
import jsQR from 'jsqr'
import { get } from 'jsutils'

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

    // remove the canvas now that we do not need it anymore
    canvas && canvas.parentNode && canvas.parentNode.removeChild(canvas)
  }, [ imageRef, image, width, height ])

  return imageData
}

/**
 * Scans the image in the imageReference for a QR code, and returns the scan results
 * @param {Object} imageRef 
 * @returns {Object|Null} scan results (see https://github.com/cozmo/jsQR#return-value)
 */
export const useQRCode = (imageRef) => {
  const [ code, setCode ] = useState(null)
  const imageData = useImageData(imageRef)
  useEffect(() => {
    if (!imageData) return
    const code = jsQR(
      imageData.data,
      imageData.width,
      imageData.height
    )
    setCode(code)
  }, [ imageData ])

  return code
}
