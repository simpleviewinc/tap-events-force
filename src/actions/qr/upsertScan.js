import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validate, isStr } from 'jsutils'

/**
 * Stores the QR Code scan result in the qr items store under the `scanResult` key
 * @param {String} result 
 * @returns {void}
 */
export const upsertScan = (result) => {
  const [ valid ] = validate({ result }, { result: isStr })
  if (!valid) return

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: Values.categories.qr,
      key: 'scanResult',
      item: result
    }
  })
}