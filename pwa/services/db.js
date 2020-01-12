import EventEmitter from '../../util/misc/event_emitter'
import { Values } from '../../constants'
/**
 * Interface for a DB service
 * @interface
 */
export default class DB {

  initialized = false
  events = new EventEmitter()
  eventTypes = [
    Values.DB_INIT,
    Values.DB_AUTH_CHANGE,
    Values.DB_DOC_ADDED,
    Values.DB_DOC_CHANGED,
    Values.DB_DOC_REMOVED,
  ]
  /**
   * construct db class
   * @param { boolean } debug - if in debug mode or not
   * @param { Object } config - config object for db
   * @param { function } fallback - is called when method isn't overridden
   */
  constructor(debug = false, config = {}, fallback = () => {}) {
    this.debug = debug
    this.config = config
    this.watcherUnSubs = {}
    this.fallback = fallback
    this.enableOffline = typeof window !== 'undefined'
  }

  /**
   * simple logging
   * @param { any } msg - what to log
   * @param { 'log'|'warn'|'error' } type - type of log
   */
  log = (msg, type = 'log') => {
    this.debug && console[type](msg)
  }

  /**
   * initialize db service
   * @returns { Promise }
   */
  initialize = () => this.fallback('initialize', [])

  /**
   * Gets a database accurate timestamp, ensures
   * time is the same format as what's in the DB
   * @returns { Timestamp }
   */
  getTimestamp = () => {
    return this.fallback('getTimestamp', [])
  }

  /**
   * check if a timestamp is newer than another
   * @param { Timestamp } timeA
   * @param { Timestamp } timeB
   * @returns { Boolean } - whether timeA is newer than timeB
   */
  isNewerTimestamp = (timeA, timeB) => {
    return this.fallback('isNewerTimestamp', [ timeA, timeB ])
  }

  /**
   * login
   * @param { String } email
   * @param { String } password
   * @returns { Promise }
   */
  login = (email, password) => {
    return this.fallback('login', [ email, password ])
  }

  /**
   * logout
   */
  logout = () => {
    return this.fallback('logout', [])
  }

  /**
   * register
   * @param { String } email
   * @param { String } password
   * @returns { Promise }
   */
  register = (email, password) => {
    return this.fallback('register', [ email, password ])
  }

  /**
   * get current user
   * @returns { Object } the user object
   */
  getUser = () => {
    return this.fallback('getUser', [])
  }

  /**
   * @param { String } collection - the collection to query docs from
   * @param { Array } queries - Array of queries to execute
   * @param { Boolean } watch - whether to watch the docs returned
   * @returns { Promise } resolves with result of queries
   */
  getDocs = (collection, queries, watch = true) => {
    return this.fallback('getDocs', [ collection, queries, watch ])
  }

  /**
   * get doc data
   * @param { String } docId - the id of the doc
   * @param { String } collection - the collection the doc is in
   * @param { Boolean } watch - whether to watch the doc for changes
   * @returns { Promise } promise that resolve to doc or false if not found
   */
  getDoc = (docId, collection, watch = true) => {
    return this.fallback('getDoc', [ docId, collection, watch ])
  }

  /**
   * set data to doc
   * @param { Object } doc - the data to set to the doc
   * @param { String } docId - the id of the doc
   * @param { String } collection - the collection the doc is in
   * @param { Boolean } direct - whether the doc is being set directly or through throttle
   * @returns { Promise } promise that resolve to doc or false if not set
   */
  setDoc = (doc, docId, collection, direct = true) => {
    return this.fallback('setDoc', [ doc, docId, collection, direct ])
  }

  /**
   * @param { Object } data - data to update doc with
   * @param { String } docId - the doc's id
   * @param { String } collection - the collection the doc is in
   * @param { Boolean } direct - whether the doc is being set directly or through throttle
   * @return { Promise }
   */
  updateDoc = (data, docId, collection, direct = true) => {
    return this.fallback('updateDoc', [ data, docId, collection, direct ])
  }

  /**
   * remove doc permanently
   * @param { String } docId - the id of the doc
   * @param { String } collection - the collection the doc is in
   * @returns { Promise } promise that resolves after remove
   */
  removeDoc = (docId, collection) => {
    return this.fallback('removeDoc', [ docId, collection ])
  }

  /**
   * watch a collection for changes
   * @param { String } collection - the collection to watch
   */
  watchCollection = collection => {
    return this.fallback('watchCollection', [ collection ])
  }

  /**
   * watch a doc for changes
   * @param { String } docId - the id of the doc
   * @param { String } collection - the collection the doc is in
   */
  watchDoc = (docId, collection) => {
    return this.fallback('watchDoc', [ docId, collection ])
  }

  /**
   * stop watching a collection
   * @param { String } collection - the collection to unwatch
   */
  unwatchCollection = collection => {
    return this.fallback('unwatchCollection', [ collection ])
  }

  /**
   * stop watching a doc
   * @param { String } docId - the id of the doc
   * @param { String } collection - the collection the doc is in
   */
  unwatchDoc = (docId, collection) => {
    return this.fallback('unwatchDoc', [ docId, collection ])
  }

  /**
   * stop watching a query
   * @param { String } collection - the collection the docs are in
   * @param { Array } queries - Array of query objects (must be exact same)
   */
  unwatchDocs = (collection, queries = []) => {
    return this.fallback('unwatchDocs', [ collection, queries ])
  }

}
