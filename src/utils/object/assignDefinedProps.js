import { pickKeys } from '@svkeg/jsutils'

/**
 * @param {*} model - the model object to assign props to
 * @param {Object} params - properties to add to the model
 */
export const assignDefinedProps = (model, params) => {
  Object.assign(model, pickKeys(params, Object.keys(model)))
}
