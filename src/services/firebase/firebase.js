import { firestore, firebase } from './setup'
import { hasDomAccess } from 'SVUtils/helpers/hasDomAccess'
import { limbo, checkCall, isFunc, isArr, isObj, uuid } from 'jsutils'
import { onDBInit } from 'SVActions/db/onDBInit'
import { onDocChange } from 'SVActions/db/onDocChange'
import { ActionTypes } from 'SVConstants'

// Error code mapping helper, for better errors coming from Firebase
const errCodeMap = {
  'failed-precondition':
    'Firestore can not load local cache when more then one tab is open',
  unimplemented: 'Browser does not allow cached data from Firestore',
}

// Maps the firebase actions to the redux actions
const actionsMap = {
  added: ActionTypes.UPSERT_ITEM,
  removed: ActionTypes.REMOVE_ITEM,
  modified: ActionTypes.UPSERT_ITEM,
  collection: ActionTypes.UPSERT_ITEMS,
}

/**
 * Converts an array of docs to an object, using the doc.id as the key
 * @param {Array} docs - items to be converted
 *
 * @returns {Object} - docs as an object, keyed by ID
 */
const docsToObject = docs => {
  return docs.reduce((converted, doc) => {
    const data = doc.data()
    converted[data.id] = data

    return converted
  }, {})
}

/**
 * Firebase DB service
 * @class
 */
class Firebase {
  initialized = false

  /**
   * @memberof Firebase
   * Construct the Firebase DB class and sets up offline storage
   * @param { boolean } debug - if in debug mode or not
   * @param { Object } config - config object for db
   * @param { function } fallback - is called when method isn't overridden
   *
   * @returns {void}
   */
  constructor(debug = false, config = {}, fallback = () => {}) {
    this.debug = debug
    this.config = config
    this.watcherUnSubs = {}
    this.fallback = fallback
    this.firestore = firestore

    this.enableOffline = global.__PLATFORM__ !== 'web' ? true : hasDomAccess()
  }

  /**
   * @memberof Firebase
   * Initialize Firestore DB and sets up offline storage
   *
   * @returns {void}
   */
  initialize = () => {
    if (this.initialized) return

    this.initialized = true

    // Enable offline mode
    this.enableOffline && this.offLine()

    // Let listeners know DB is setup
    checkCall(onDBInit, true)
  }

  /**
   * @memberof Firebase
   * Simple logging helper
   * @param { any } msg - what to log
   * @param { 'log'|'warn'|'info'|'debug'|'error' } type - type of log
   *
   * @returns {void}
   */
  log = (msg, type = 'log') => this.debug && logData(msg, type)

  /**
   * @memberof Firebase
   * Sets up offline persistence for firestore DB
   *
   * @returns {void}
   */
  offLine = async () => {
    if (this.initialized) return

    const [error] = await limbo(
      this.firestore.enablePersistence({ synchronizeTabs: true })
    )

    error
      ? this.log(
          errCodeMap[error.code] || 'Failed to enablePersistance',
          'warn'
        )
      : this.log('Firestore localCache is enabled')
  }

  /**
   * @memberof Firebase
   * Gets a database accurate timestamp, ensures time is the same format as what's in the DB
   *
   * @returns { Timestamp }
   */
  getTimestamp = () => firebase.firestore.Timestamp.now().toMillis()

  /**
   * @memberof Firebase
   * Check if a timestamp is newer than another
   * @param { Timestamp } timeA
   * @param { Timestamp } timeB
   *
   * @returns { Boolean } - whether timeA is newer than timeB
   */
  isNewerTimestamp = (timeA, timeB) => {
    if (timeA > timeB) return true
    return false
  }

  /**
   * @memberof Firebase
   * Get current user
   *
   * @returns { Object } the user object
   */
  getUser = () => {
    const user = firebase.auth().currentUser
    return user && user.toJSON()
  }

  /**
   * @memberof Firebase
   * Watch a collection for changes
   * @param { String } collection - the collection to watch
   *
   * @returns {void}
   */
  watchCollection = collection => {
    !this.watcherUnSubs[collection] &&
      this.watchQuery(this.firestore.collection(collection), collection)
  }

  /**
   * @memberof Firebase
   * Update a doc in firestore db
   * @param { String } collection - the collection of the doc to update
   * @param { Object } doc - The doc to be updated
   *
   * @returns {void}
   */
  updateDoc = async (doc, collection, docId) => {
    collection = collection || doc.collection

    if (!collection)
      return (
        logData(
          `A collection name is required to upsert a doc!`,
          collection,
          doc,
          'warn'
        ) || {}
      )

    if (!isObj(doc))
      return (
        logData(
          `A doc object is required to upate a doc!`,
          collection,
          doc,
          'warn'
        ) || {}
      )

    doc.id = doc.id || docId || uuid()
    const colRef = this.firestore.collection(collection)
    doc.updated_at = this.getTimestamp()

    const [err] = await limbo(colRef.doc(doc.id).set(doc, { merge: true }))

    return err
      ? logData(err, 'warn')
      : colRef
        .doc(doc.id)
        .get()
        .then(snapShot => snapShot.data())
  }

  /**
   * @memberof Firebase
   * Removes a doc from firestore DB, based on the passed in id and collection
   * @param { String } docId - The doc id to be removed
   * @param { String } collection - the collection the doc belongs to
   *
   * @returns {void}
   */
  removeDoc = async (docId, collection) => {
    const [err] = await limbo(
      this.firestore.collection(collection).doc(docId)
        .delete()
    )

    return err ? logData(err, 'warn') : this.unwatchDoc(docId, collection)
  }

  /**
   * @memberof Firebase
   * Watches a firestore query for changes
   * Query can be just a collection, or search query
   * @param {Object} query - Firebase query object to be watched
   * @param {string} key - Key to store the watched query to allow unsubscribing
   *
   * @returns {void}
   */
  watchQuery = (query, key) => {
    this.watcherUnSubs[key] = query.onSnapshot(snapShot => {
      snapShot.docChanges().forEach(
        change => {
          const data = change.doc.data()
          data.collection = data.collection || key
          onDocChange(data, actionsMap[change.type])
        },
        error => this.log(error, 'warn')
      )
    })
  }

  /**
   * @memberof Firebase
   * Gets all the docs in the firestore DB based on a collection
   * @param {string} collection - Name of the collection to get the docs from
   *
   * @returns {Object} - Group of docs from the firestore DB
   */
  getCollection = async collection => {
    const [ err, snapShot ] = await limbo(
      this.firestore.collection(collection).get()
    )

    return err ? this.log(error, 'warn') || {} : docsToObject(snapShot.docs)
  }

  /**
   * @memberof Firebase
   * Get a collection of docs from firestore
   * @param { String } collection - the collection to get the docs from
   * @param { object } queries - Extra query params to filter the returned docs
   * @param { boolean } watch - Should watch the docs for changes
   *
   * @returns {Object} - Group of docs from the firestore DB
   */
  getDocs = async (collection, queries, watch = true) => {
    /* Example queries
      where: { method: 'where', args: [ 'createdBy', '==', 'SOME_UUID' ] }
      sort: { method: 'orderBy', args: [ 'population', 'asc ] }
      limit: { method: 'limit', args: [ 25 ] }
      skip: { method: 'startAfter', args: [ 10 ] }
      OR and IN not supported yet see:
      https://github.com/firebase/firebase-js-sdk/issues/321
    */
    const watcherKey =
      (queries && `${collection}-${JSON.stringify(queries)}`) || collection
    if (this.watcherUnSubs[watcherKey]) return

    let query = this.firestore.collection(collection)

    isArr(queries) &&
      queries.map(({ method, args }, i) => {
        if (!method || !args) {
          return console.warn(
            `invalid query provided:`,
            queries[i],
            `at index ${i}`
          )
        }
        query = query[method](...args)
      })

    watch && this.watchQuery(query, collection)

    return query.get().then(snapShot => docsToObject(snapShot.docs))
  }

  /**
   * @memberof Firebase
   * Removes a key watcher from watcherUnSubs array, and calls unSubscribe function
   * @param { String } key - the item to unwatch
   *
   * @returns {void}
   */
  unwatchKey = key => {
    const unSubscriber = this.watcherUnSubs[key]
    isFunc(unSubscriber) && unSubscriber()
    this.watcherUnSubs[key] = undefined
  }

  /**
   * @memberof Firebase
   * Stop watching a collection for changes
   * @param { String } collection - the collection to unwatch
   *
   * @returns {void}
   */
  unwatchCollection = collection => {
    this.unwatchKey(collection)
  }

  /**
   * @memberof Firebase
   * Stop watching a doc for changes
   * @param { String } collection - the collection to unwatch
   *
   * @returns {void}
   */
  unwatchDoc = (docId, collection) => {
    this.unwatchKey(`${collection}-${docId}`)
  }

  /**
   * @memberof Firebase
   * Stop watching a group of docs for changes
   * @param {string} collection - the collection to unwatch
   * @param {Object} queries - Extra query params to filter the returned docs
   *
   * @returns {void}
   */
  unwatchDocs = (collection, queries = []) => {
    const key = isArr(queries)
      ? `${collection}-${JSON.stringify(queries)}`
      : collection

    this.unwatchKey(key)
  }
}

// Export the built service, so it acts as a singleton
export const FBService = new Firebase()
