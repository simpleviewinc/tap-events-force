
import * as firebase from 'firebase'
import { firebase as firebaseConfig } from 'SVAppConfig'

let DB

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig.web)
  DB = firebase.database().ref()
}

firebaseConfig && initFirebase()

export {
  firebase,
  DB
}
