import { QRImageCapture} from './qrImageCapture.web'
import { QRVideoCapture } from './qrVideoCapture.web'
import { isIOS, isStandalonePWA } from 'SVUtils'

/**
 * A QRScanner that uses the right APIs for the current platform.
 * 
 * Uses image input capture for a standalone iOS PWA, since it currently does not yet support getUserMedia (needed for video camera) on PWAs.
 * If the device is on mobile web, or the device is not ios, it can use the live video capture.
 * 
 * @see QRImageCapture
 * @see QRVideoCapture
 */
export const QRScanner = (isIOS() && isStandalonePWA())
    ? QRImageCapture
    : QRVideoCapture
