import { useImageData } from 'SVUtils/hooks'

export const useWorkerScan = (imgRef, worker) => {
  const [ scan, setScan ] = useState(null)

  const imageData = useImageData(imgRef)

  const captureCode = async () => {
    console.log(imageData)
    if (!imageData) return

    const result = await WorkerUtility.scanImage(worker, imageData)

    setScan(result)
  }

  useEffect(() => void captureCode(), [ imageData ])

  return scan
}

export const WorkerUtility = {
  scanImage: async (worker, imageData) => {
    if (!imageData || !imageData.data) return Promise.reject('Image data was undefined. Skipping scan.')

    return new Promise((resolve) => {
      worker.onmessage = (event) => {
        console.log('Received message from worker', event)
        resolve(event.data)
      }

      // send the image data to the worker for decoding
      worker.postMessage(imageData)
    })
  },
  useWorker: (WorkerConstructor) => {
    const [ worker, setWorker ] = useState()

    useEffect(() => {
      if (!window.Worker) {
        console.error('This browser does not support web workers.')
        return
      }

      !worker && setWorker(new WorkerConstructor())
    })

    useEffect(() => {
      return () => worker && worker.terminate()
    })

    return worker
  }
}
