import { uuid } from 'jsutils'
import { Values } from 'SVConstants'
// import { Platform } from 'react-native'
console.log(`---------- Need to FIX ----------`)
const Platform = {
  OS: 'ios',
  
}

/**
 * Builds a user 
 * @param {boolean} recipient - Should build the recipient user
 *
 * @returns {Object} - Built user object
 */
const buildUser = (recipient) => {
  const bat = { id: uuid(), name: 'Batman' }
  const sup = { id: uuid(), name: 'Superman' }

  return Platform.OS === 'web'
    ? recipient ? sup : bat
    : recipient ? bat : sup

}

export const itemsState = {
  [Values.categories.messages]: {},
  [Values.categories.user]: buildUser(),
  [Values.categories.recipient]: buildUser(true)
}
