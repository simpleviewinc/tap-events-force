import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

/**
 * Stores the QR Code scan result in the qr items store under the `scanResult` key
 * @param {String} result 
 * @returns {void}
 */
export const upsertScanError = (error) => {
  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: Values.categories.qr,
      key: 'error',
      item: error
    }
  })
}