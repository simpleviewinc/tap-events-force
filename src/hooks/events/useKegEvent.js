import {useEffect} from 'react'
import { getEventEmitter } from 'SVUtils/events/event_emitter'

const kegEventEmitter = getEventEmitter() 

/**
 * Set up to listen to some event
 * @param {string} event - event to be listening to
 * @param {Function} cb - callback for this event
 */
export const useKegEvent = (event, cb) => {
  useEffect(() => {
    kegEventEmitter.on(event, cb)
    return () => {
      kegEventEmitter.off(event, cb)
    }
  }, [ event, cb ])
}