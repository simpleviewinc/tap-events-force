import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * modals state
 * Takes in an array of modal components
 */
export const modalsState = {
  [CATEGORIES.MODALS]: {
    activeModal: null,
    visible: true,
  },
}
