import { firestore, firebase } from './setup'
import { Database } from '../database'
import { Values } from 'SVConstants'
import { limbo, checkCall } from 'jsutils'
import { dbInit } from 'SVActions'

const errCodeMap = {
  'failed-precondition':
    'Firestore can not load local cache when more then one tab is open',
  unimplemented: 'Browser does not allow cached data from Firestore',
}

/**
 * Firebase DB service
 * @class
 * @implements {DB}
 */
class Firebase extends Database {

  initialize = () => {

    if (this.initialized) return

    this.initialized = true

    this.firestore = firestore

    // Enable offline mode
    this.enableOffline && this.offLine()

    // Let listeners know DB is setup
    checkCall(dbInit, Values.DB.INIT, true)
  }

  offLine = async () => {
    if (this.initialized) return

    const [ error, data ] = await limbo(
      this.firestore.enablePersistence({ synchronizeTabs: true })
    )

    error
      ? this.log(errCodeMap[error.code] || 'Failed to enablePersistance', 'warn')
      : this.log('Firestore localCache is enabled')
  }

  getTimestamp = () => {
    return firebase.firestore.Timestamp.now().toMillis()
  }

  isNewerTimestamp = (timeA, timeB) => {
    if (timeA > timeB) return true
    return false
  }

  getUser = () => {
    const user = firebase.auth().currentUser
    return user && user.toJSON()
  }

  watchCollection = collection => {
    if (this.watcherUnSubs[collection]) return
    const unSubscriber = this.firestore.collection(collection).onSnapshot(
      { includeMetadataChanges: true },
      snapShot => {
        snapShot.docChanges().forEach(change => {
          this.events.emit(evtMap[change.type], change.doc.data())
        })
      },
      error => this.log(error, 'warn')
    )

    this.watcherUnSubs[collection] = unSubscriber
  }

  unwatchKey = key => {
    const unSubscriber = this.watcherUnSubs[key]
    if (unSubscriber) {
      unSubscriber()
      this.watcherUnSubs[key] = undefined
    }
  }

  unwatchCollection = collection => {
    this.unwatchKey(collection)
  }

}

const FBService = new Firebase()

export {
  FBService
}