/**
 * Sorts labels alphabetically by name
 * @param {Array<Label>} labels
 * @returns {Array} - new array of sorted labels
 */
export const sortLabels = (labels = []) => labels.sort(compareLabels)

/**
 * Compares two labels
 * @param {Label} labelA
 * @param {Label} labelB
 * @returns {Number} 0 if equal, -1 if labelA alphabetically precedes B, 1 if it comes afterwards
 */
export const compareLabels = (labelA, labelB) =>
  labelA.name.localeCompare(labelB.name)
