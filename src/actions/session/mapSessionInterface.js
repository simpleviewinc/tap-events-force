// import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * push the sessionAgendaProps items to our local state
 * @param {import('SVModels/sessionAgendaProps').sessionAgendaProps} props
 */
export const mapSessionInterface = props => {
  if (!props) return

  props.attendees &&
    dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: CATEGORIES.ATTENDEES,
        items: props.attendees,
      },
    })

  props.presenters &&
    dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: CATEGORIES.PRESENTERS,
        items: props.presenters,
      },
    })

  props.sessions &&
    dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: CATEGORIES.SESSIONS,
        items: props.sessions,
      },
    })

  props.settings &&
    dispatch({
      type: ActionTypes.UPSERT_ITEM,
      payload: {
        category: CATEGORIES.SETTINGS,
        key: SUB_CATEGORIES.AGENDA_SETTINGS,
        item: props.settings,
      },
    })

  props.locations &&
    dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: CATEGORIES.LOCATIONS,
        items: props.locations,
      },
    })

  props.labels &&
    dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: CATEGORIES.LABELS,
        items: props.labels,
      },
    })
}
