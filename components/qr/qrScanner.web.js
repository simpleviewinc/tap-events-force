import { QRImageCapture, QRVideoCapture } from './index'
import { isIOS, isStandalonePWA } from 'SVUtils'

/**
 * Use Image capture for iOS, since it currently does not yet support getUserMedia (needed for video camera) on PWAs.
 * If the device is on mobile web, or the device is a different platform entirely, it can use the video capture which is much better.
 */
export const QRScanner = (isIOS() && isStandalonePWA())
    ? QRImageCapture
    : QRVideoCapture
