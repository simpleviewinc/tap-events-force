import { Platform } from 'react-native'

/**
 * @returns true if the current platform is a native device (android or ios)
 */
export const isNative = () => (Platform.OS === 'ios') || (Platform.OS === 'android')