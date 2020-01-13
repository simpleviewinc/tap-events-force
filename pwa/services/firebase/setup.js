
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import Config from 'SVConfig'
import { get } from 'jsutils'

const fbConfig = get(Config, [ 'firebase', 'web' ])
const firestore = !firebase.apps.length
  ? firebase.initializeApp(fbConfig).firestore()
  : firebase.app().firestore()

export {
  firebase,
  firestore
}
