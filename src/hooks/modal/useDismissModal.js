import { useRef, useCallback } from 'react'

/**
 * Creates the callback for dismissing the modal and the ref for getting the
 * underlying dismiss function from the BaseModal
 * @return {Array<Function, RefObject>}
 *  - [ dismissModalFn, dismissCBRef ]
 *  - dismissModalFn: function for dismissing the modal
 *  - setDismissCb: fn for setting the setDismissed function from the `BaseModal`
 */
export const useDismissModal = () => {
  const dismissedCBRef = useRef()
  const dismissModal = useCallback(() => dismissedCBRef?.current?.(true), [
    dismissedCBRef?.current,
  ])
  return [ dismissModal, dismissedCBRef ]
}
