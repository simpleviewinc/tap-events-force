import { DB, firebase } from 'SVNative/firebase'
import { Values } from 'SVConstants'


const errCodeMap = {
  'failed-precondition':
    'Firestore can not load local cache when more then one tab is open',
  unimplemented: 'Browser does not allow cached data from Firestore',
}
const evtMap = {
  added: Values.DB.DOC_ADDED,
  removed: Values.DB.DOC_REMOVED,
  modified: Values.DB.DOC_CHANGED,
}
/**
 * Firebase DB service
 * @class
 * @implements {DB}
 */
export default class Firebase extends DB {

  initialize = async () => {
    if (this.initialized) return
    this.initialized = true

    firebase.initializeApp(this.config)
    firebase.auth().onAuthStateChanged(() => {
      this.events.emit(Values.DB.AUTH_CHANGE, this.getUser())
    })

    // setup firestore
    this.firestore = firebase.firestore()

    await this.firestore
      .enablePersistence({ experimentalTabSynchronization: true })
      .then(() => {
        this.log('Firestore localCache is enabled')
      })
      .catch(e => {
        this.log(errCodeMap[e.code] || 'Failed to enablePersistance', 'warn')
      })

    this.events.emit(Values.DB.INIT, true)
  }

  getTimestamp = () => {
    return firebase.firestore.Timestamp.now().toMillis()
  }

  isNewerTimestamp = (timeA, timeB) => {
    if (timeA > timeB) return true
    return false
  }

  login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.getUser())
  }

  logout = () => {
    Object.keys(this.watcherUnSubs).map(key => {
      this.watcherUnSubs[key]()
    })
    this.watcherUnSubs = {}
    return firebase.auth().signOut()
  }

  register = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.getUser())
  }

  getUser = () => {
    const user = firebase.auth().currentUser
    return user && user.toJSON()
  }

  // might be good to standardize these in case back-end is ever changed
  getDocs = async (collection, queries = [], watch = true) => {
    /* Example queries
      where: { method: 'where', args: [ 'createdBy', '==', 'SOME_UUID' ] }
      sort: { method: 'orderBy', args: [ 'population', 'asc ] }
      limit: { method: 'limit', args: [ 25 ] }
      skip: { method: 'startAfter', args: [ 10 ] }
      OR and IN not supported yet see:
      https://github.com/firebase/firebase-js-sdk/issues/321
    */
    const watcherKey = `${collection}-${JSON.stringify(queries)}`
    if (this.watcherUnSubs[watcherKey]) return

    let query = this.firestore.collection(collection)

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
    if (watch) {
      this.watcherUnSubs[watcherKey] = query.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          this.events.emit(evtMap[change.type], change.doc.data())
        })
      })
    }
    return query.get().then(snapShot => {
      return snapShot.docs.map(doc => doc.data())
    })
  }

  getDoc = async (docId, collection, watch = true) => {
    const docSnap = await this.firestore
      .collection(collection)
      .doc(docId)
      .get()

    watch && this.watchDoc(docId, collection)
    return docSnap.exists && docSnap.data()
  }

  setDoc = async (doc, docId, collection, direct = true) => {
    docId = docId || doc.uuid
    collection = collection || doc.collection
    if (direct) doc.updated_at = this.getTimestamp()

    await this.firestore
      .collection(collection)
      .doc(docId)
      .set(doc)

    return doc
  }

  updateDoc = async (data, docId, collection, direct = true) => {
    const colRef = this.firestore.collection(collection)
    if (direct) data.updated_at = this.getTimestamp()

    await colRef.doc(docId).set(data, { merge: true })
    return colRef
      .doc(docId)
      .get()
      .then(snapShot => snapShot.data())
  }

  removeDoc = async (docId, collection) => {
    await this.firestore
      .collection(collection)
      .doc(docId)
      .delete()

    return this.unwatchDoc(docId, collection)
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

  watchDoc = (docId, collection) => {
    if (this.watcherUnSubs[`${collection}-${docId}`]) return
    const unSubscriber = this.firestore
      .collection(collection)
      .doc(docId)
      .onSnapshot(
        { includeMetadataChanges: true },
        docSnapshot => {
          if (!docSnapshot.metadata.hasPendingWrites) {
            if (!docSnapshot.exists) {
              return this.events.emit(Values.DB.DOC_REMOVED, {
                docId,
                collection,
                single: true,
              })
            }
            const docData = docSnapshot.data()
            if (!docData) return
            this.events.emit(Values.DB.DOC_CHANGED, docData)
          }
        },
        error => this.log(error, 'warn')
      )
    this.watcherUnSubs[`${collection}-${docId}`] = unSubscriber
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

  unwatchDoc = (docId, collection) => {
    this.unwatchKey(`${collection}-${docId}`)
  }

  unwatchDocs = (collection, queries = []) => {
    this.unwatchKey(`${collection}-${JSON.stringify(queries)}`)
  }

}
