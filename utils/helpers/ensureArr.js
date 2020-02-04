import { isArr } from 'jsutils'

/**
 * If value is already an array, return it. Otherwise, return it wrapped in an array.
 * @param {*} value 
 * @returns { Array }
 */
export const ensureArr = (value) => isArr(value) 
  ? value 
  : [ value ]
