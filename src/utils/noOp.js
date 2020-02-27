/**
 * A no-op function. Primarily an optimization to minimize the number of empty arrow functions
 * created in react components for prop default values. Point to this instead
 * 
 * @returns { void }
 */
export const noOp = () => {}