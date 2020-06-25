// import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'
import { mapObj } from 'jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * defines which sessionAgendaProps need to be mapped differently
 */
const subCatMap = {
  settings: SUB_CATEGORIES.AGENDA_SETTINGS,
}

/**
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').sessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  // loop through each key and dispatch accordingly
  props &&
    mapObj(props, (key, value) => {
      // ensure key exists in the local storage first
      if (key === CATEGORIES[key.toUpperCase()]) {
        let type = ActionTypes.UPSERT_ITEMS
        let payload = {
          category: key,
          items: value,
        }

        // certain props need to be mapped to a specific key
        if (subCatMap[key]) {
          type = ActionTypes.UPSERT_ITEM
          payload = {
            category: key,
            item: value,
            key: subCatMap[key],
          }
        }
        dispatch({
          type,
          payload,
        })
      }
    })
}
