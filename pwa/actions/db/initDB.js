import { FBService } from 'SVServices/firebase'

/**
 * Action to call the Firebase DB initialize method
 */
export const initDB = () => {
  !FBService.initialized && FBService.initialize()
}
