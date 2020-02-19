import { QRImageCapture} from './qrImageCapture.web'
import { QRVideoCapture } from './qrVideoCapture.web'
import { QRVideoCapture as QRVideoCaptureNative } from './qrVideoCapture.native'
import { isIOSWeb, isStandalonePWA, isNative } from 'SVUtils/helpers/platform'

/**
 * A QRScanner that uses the right APIs for the current platform.
 * 
 * Uses image input capture for a standalone iOS PWA, since it currently does not yet support getUserMedia (needed for video camera) on PWAs.
 * If the device is on mobile web, or the device is not iOS, it can use the live video capture.
 * 
 * @see QRImageCapture
 * @see QRVideoCapture.web
 * @see QRVideoCapture.native
 */
export const QRScanner = isNative()
    ? QRVideoCaptureNative
    : (isIOSWeb() && isStandalonePWA())
        ? QRImageCapture
        : QRVideoCapture




