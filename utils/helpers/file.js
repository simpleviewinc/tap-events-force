export const compressFile = (imgRef, filename) => {
  const reader = new FileReader()
  reader.readAsDataURL(imgRef)
  const img = new Image()

  const type = 'image/jpeg'

  reader.onload = event => {
    img.src = event.target.result
    img.onload = () => {
      const element = document.createElement('canvas')
      element.width = img.width
      element.height = img.height

      const context = element.getContext('2d')

      context.drawImage(img, 0, 0, width, filename)

      context.canvas.toBlob(blob => {
        const file = new File([ blob ], filename, {
          type,
          lastModified: Date.now()
        })
      }, type, 1)
    }
  }

  reader.onerror = console.error
}